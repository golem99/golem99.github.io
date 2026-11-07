#!/usr/bin/env python3
"""Resfeber: daglig sökning.

Läser resperioder och smakval från Firestore, söker exakta flyg- och
boendepriser via SerpApi (Google Flights och Google Hotels) och skriver
dagens tre förslag till teams/<kod>/days/<datum>.

Körs en gång per dag av en schemalagd uppgift:
    SERPAPI_KEY=... python3 daily.py            # riktig körning
    SERPAPI_KEY=... python3 daily.py --dry      # skriv inget till Firestore
Nyckeln ligger aldrig i den här filen.
"""
import datetime as dt
import json
import math
import os
import random
import re
import sys
import time
import urllib.parse
import urllib.request

PROJECT = "resfeber-74ae0"
FB_KEY = "AIzaSyCdULUvllec2EV22gMkVMGuedoGAIotr9M"
TEAM = "PJJgBwtFgxB9IP5v96ZucKcU"
BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents/teams/{TEAM}"
APP_URL = "https://raw.githubusercontent.com/golem99/golem99.github.io/main/appar/resfeber/index.html"
REFERER = "https://golem99.github.io/"
TZ = dt.timezone(dt.timedelta(hours=2))  # Finland vintertid; räcker för datumet

# Familjen: Noa (15) räknas som vuxen på flyget, Saga (9) som barn.
ADULTS, CHILDREN, CHILD_AGES = 3, 1, "9"

SERP = os.environ.get("SERPAPI_KEY", "")
MAX_SEARCHES_TOTAL = 9  # hårt tak per körning, även när boendet behöver en extra sökning
MAX_SEARCHES = 7  # högst 7 om dagen + Tokyosökningen en gång i veckan ryms i de 250 gratis
DRY = "--dry" in sys.argv
FORCE = "--force" in sys.argv
searches = 0
log = []


def say(*a):
    msg = " ".join(str(x) for x in a)
    log.append(msg)
    print(msg, flush=True)


# ---------- HTTP ----------
def http(url, method="GET", body=None, timeout=90):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Referer", REFERER)
    if data:
        req.add_header("Content-Type", "application/json")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                raw = r.read().decode()
                return json.loads(raw) if raw.strip().startswith(("{", "[")) else raw
        except urllib.error.HTTPError as e:
            txt = e.read().decode(errors="replace")
            if e.code >= 500 and attempt < 2:
                time.sleep(3)
                continue
            raise RuntimeError(f"HTTP {e.code} {url[:80]}: {txt[:300]}")
        except Exception:
            if attempt < 2:
                time.sleep(3)
                continue
            raise


# ---------- Firestore REST ----------
def enc(v):
    if v is None:
        return {"nullValue": None}
    if isinstance(v, bool):
        return {"booleanValue": v}
    if isinstance(v, int):
        return {"integerValue": str(v)}
    if isinstance(v, float):
        return {"doubleValue": v}
    if isinstance(v, str):
        return {"stringValue": v}
    if isinstance(v, (list, tuple)):
        return {"arrayValue": {"values": [enc(x) for x in v]}}
    if isinstance(v, dict):
        return {"mapValue": {"fields": {k: enc(x) for k, x in v.items()}}}
    return {"stringValue": str(v)}


def dec(v):
    if "nullValue" in v:
        return None
    for k in ("booleanValue", "stringValue", "timestampValue"):
        if k in v:
            return v[k]
    if "integerValue" in v:
        return int(v["integerValue"])
    if "doubleValue" in v:
        return v["doubleValue"]
    if "arrayValue" in v:
        return [dec(x) for x in v["arrayValue"].get("values", [])]
    if "mapValue" in v:
        return {k: dec(x) for k, x in v["mapValue"].get("fields", {}).items()}
    return None


def fs_list(coll):
    out, token = [], None
    while True:
        url = f"{BASE}/{coll}?key={FB_KEY}&pageSize=300"
        if token:
            url += "&pageToken=" + urllib.parse.quote(token)
        r = http(url)
        for d in r.get("documents", []):
            doc = {k: dec(x) for k, x in d.get("fields", {}).items()}
            doc["_id"] = d["name"].rsplit("/", 1)[-1]
            out.append(doc)
        token = r.get("nextPageToken")
        if not token:
            return out


def fs_exists(path):
    try:
        http(f"{BASE}/{path}?key={FB_KEY}")
        return True
    except RuntimeError as e:
        if "HTTP 404" in str(e):
            return False
        raise


def fs_set(path, data):
    if DRY:
        say("[dry] skulle skriva", path)
        return
    http(f"{BASE}/{path}?key={FB_KEY}", "PATCH", {"fields": {k: enc(v) for k, v in data.items()}})


# ---------- Katalogen (läses ur appen så att den bara finns på ett ställe) ----------
def load_catalog():
    local = os.environ.get("APP_FILE")
    html = open(local, encoding="utf-8").read() if local else http(APP_URL + f"?t={int(time.time())}")
    m = re.search(r"/\*DEST\*/(.*?)/\*END\*/", html, re.S)
    return json.loads(m.group(1))


# ---------- Smak ----------
HOTEL_FEATS = ("hotel", "apartment", "hostel", "breakfast", "kitchen", "pool", "central", "cheap", "rating")


def taste(duels, who):
    """Poäng per tagg för resmål och per egenskap för boende."""
    dest, hotel = {}, {}
    for d in duels:
        if who and d.get("who") != who:
            continue
        opts, ch = d.get("options") or [], d.get("chosen")
        if not opts or ch is None:
            continue
        target = dest if d.get("kind") == "dest" else hotel
        for o in opts:
            feats = o.get("tags") or o.get("feats") or []
            w = 1.0 if o.get("id") == ch else -0.35
            for t in feats:
                target[t] = target.get(t, 0) + w
    return dest, hotel


def hotel_feats(p, center):
    f = []
    typ = (p.get("type") or "").lower()
    name = (p.get("name") or "").lower()
    am = " ".join(p.get("amenities") or []).lower()
    if "vacation" in typ or "apartment" in name or "apartament" in name or "kitchen" in am:
        f.append("apartment")
    elif "hostel" in name:
        f.append("hostel")
    else:
        f.append("hotel")
    if "breakfast" in am:
        f.append("breakfast")
    if "kitchen" in am:
        f.append("kitchen")
    if "pool" in am:
        f.append("pool")
    gps = p.get("gps_coordinates") or {}
    if gps and center:
        km = dist_km(center, (gps.get("latitude"), gps.get("longitude")))
        if km is not None and km < 1.5:
            f.append("central")
    if (p.get("overall_rating") or 0) >= 4.5:
        f.append("rating")
    return f


def dist_km(a, b):
    try:
        la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    except Exception:
        return None
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return round(6371 * 2 * math.asin(math.sqrt(h)), 1)


# ---------- Perioder ----------
def pick_period(periods, today):
    live = []
    for p in periods:
        if not p.get("active", True):
            continue
        try:
            start = dt.date.fromisoformat(p["from"])
            dt.date.fromisoformat(p["to"])
        except Exception:
            continue
        if start >= today + dt.timedelta(days=2):
            live.append(p)
    if live:
        live.sort(key=lambda p: p["from"])
        return live[today.toordinal() % len(live)], False
    # Inga perioder: exempeldatum, torsdag–måndag om ungefär sex veckor.
    d = today + dt.timedelta(days=42)
    # Undvik jul och nyår, då är allt dyrt och fullt.
    if (d.month == 12 and d.day >= 18) or (d.month == 1 and d.day <= 6):
        d = dt.date(d.year + (1 if d.month == 12 else 0), 1, 7)
    while d.weekday() != 3:
        d += dt.timedelta(days=1)
    return {
        "_id": "exempel",
        "label": "Exempeldatum",
        "from": d.isoformat(),
        "to": (d + dt.timedelta(days=4)).isoformat(),
        "budget": 0,
        "origins": ["HEL", "TKU", "TMP", "VAA"],
        "transport": ["direct", "onestop"],
        "lodging": ["hotel", "apartment"],
        "wishes": [],
    }, True


# ---------- Val av resmål ----------
def choose_destinations(cat, period, duels, recent):
    """Ordnad kandidatlista: Steves topp, Ulrikas topp, något nytt, sedan resten."""
    ferry_ok = "ferry" in (period.get("transport") or [])
    month = dt.date.fromisoformat(period["from"]).month
    pool = [d for d in cat if (d.get("air") or (ferry_ok and d.get("ferry")))
            and not d.get("longhaul")
            and (not d.get("months") or month in d["months"])]
    s_dest, _ = taste(duels, "steve")
    u_dest, _ = taste(duels, "ulrika")

    def score(d, prof):
        return sum(prof.get(t, 0) for t in d["tags"])

    rnd = random.Random(dt.date.today().toordinal())
    fresh = [d for d in pool if d["id"] not in recent] or pool
    s_rank = sorted(fresh, key=lambda d: score(d, s_dest) + rnd.random() * 2.5, reverse=True)
    u_rank = sorted(fresh, key=lambda d: score(d, u_dest) + rnd.random() * 2.5, reverse=True)
    x_rank = fresh[:]
    rnd.shuffle(x_rank)
    out, seen = [], set()
    for i in range(len(fresh)):
        for rank, why in ((s_rank, "steve"), (u_rank, "ulrika"), (x_rank, "upptack")):
            d = rank[i]
            if d["id"] not in seen:
                seen.add(d["id"])
                out.append((d, why))
    return out, s_dest, u_dest


# ---------- SerpApi ----------
def serp(params):
    global searches
    params = dict(params, api_key=SERP)
    url = "https://serpapi.com/search.json?" + urllib.parse.urlencode(params)
    searches += 1
    r = http(url, timeout=120)
    if isinstance(r, dict) and r.get("error"):
        raise RuntimeError("SerpApi: " + r["error"])
    return r


def search_flight(dest, period):
    origins = ",".join(period.get("origins") or ["HEL"])
    tr = period.get("transport") or ["direct"]
    stops = 2 if "onestop" in tr else 1  # 1 = bara direkt, 2 = högst en mellanlandning
    r = serp({
        "engine": "google_flights", "departure_id": origins, "arrival_id": dest["air"],
        "outbound_date": period["from"], "return_date": period["to"],
        "adults": ADULTS, "children": CHILDREN, "currency": "EUR", "hl": "sv", "gl": "fi",
        "stops": stops,
    })
    flights = (r.get("best_flights") or []) + (r.get("other_flights") or [])
    if not flights:
        return None
    def nstops(f):
        return len(f["flights"]) - 1
    direct = [f for f in flights if nstops(f) == 0]
    best = min(flights, key=lambda f: f.get("price") or 1e9)
    if direct:
        bd = min(direct, key=lambda f: f.get("price") or 1e9)
        # Mellanlandning bara om den är minst 20 % billigare.
        if not best.get("price") or bd.get("price", 1e9) <= best["price"] * 1.2:
            best = bd
    if not best.get("price"):
        return None
    segs = best["flights"]
    return {
        "price": best["price"],
        "airline": segs[0].get("airline"),
        "logo": best.get("airline_logo") or segs[0].get("airline_logo"),
        "from": segs[0]["departure_airport"]["id"],
        "fromName": segs[0]["departure_airport"].get("name"),
        "dep": segs[0]["departure_airport"].get("time"),
        "arr": segs[-1]["arrival_airport"].get("time"),
        "stops": len(segs) - 1,
        "via": [s["arrival_airport"]["id"] for s in segs[:-1]],
        "minutes": best.get("total_duration"),
        "url": r.get("search_metadata", {}).get("google_flights_url"),
        "lowest": (r.get("price_insights") or {}).get("lowest_price"),
        "level": (r.get("price_insights") or {}).get("price_level"),
    }


def zone_of(lat, lon, zones):
    """Första zonen (namn) som punkten ligger i, annars None."""
    for z in zones or []:
        km = dist_km((z[1], z[2]), (lat, lon))
        if km is not None and km <= z[3] + 0.25:
            return z[0]
    return None


def search_lodging(dest, period, hprof, area_index=0):
    """Boende bara i trygga familjeområden (dest["areas"]), aldrig i dest["avoid"].

    Sökningen utgår från ett av de trygga områdena; varje träff kontrolleras
    sedan mot områdenas koordinater. Saknas träffar provas ett område till.
    """
    areas = dest.get("areas") or []
    tries = 2 if len(areas) > 1 else 1
    for t in range(tries):
        if searches >= MAX_SEARCHES_TOTAL:
            break
        area = areas[(area_index + t) % len(areas)] if areas else None
        best, alts = _search_lodging_once(dest, period, hprof, area)
        if best:
            return best, alts
        say(f"  inget tryggt boende kring {area[0] if area else dest['name']}, provar nästa område")
    return None, []


def _search_lodging_once(dest, period, hprof, area):
    lod = period.get("lodging") or ["hotel", "apartment"]
    wishes = period.get("wishes") or []
    apt_only = "apartment" in lod and not any(x in lod for x in ("hotel", "bnb", "hostel"))
    if dest.get("hotelq") and (not area or len(dest.get("areas") or []) == 1):
        q = dest["hotelq"]
    elif area:
        q = f"{area[0]}, {dest['name_en']}"
    else:
        q = dest["name_en"]
    params = {
        "engine": "google_hotels", "q": q,
        "check_in_date": period["from"], "check_out_date": period["to"],
        "adults": ADULTS, "children": CHILDREN, "children_ages": CHILD_AGES,
        "currency": "EUR", "hl": "en", "gl": "fi", "sort_by": 3, "rating": 8,
    }
    if apt_only:
        params["vacation_rentals"] = "true"
    r = serp(params)
    props = [p for p in (r.get("properties") or []) if (p.get("total_rate") or {}).get("extracted_lowest")]
    if not props:
        return None, []
    center = dest.get("c")
    rows = []
    for p in props[:20]:
        gps = p.get("gps_coordinates") or {}
        lat, lon = gps.get("latitude"), gps.get("longitude")
        if lat is None or lon is None:
            continue  # utan position kan vi inte veta om området är tryggt
        if zone_of(lat, lon, dest.get("avoid")):
            continue
        area_name = zone_of(lat, lon, dest.get("areas"))
        if dest.get("areas") and not area_name:
            continue
        feats = hotel_feats(p, center)
        if "hostel" in feats and "hostel" not in lod:
            continue
        if "apartment" in feats and "apartment" not in lod and "hotel" in feats:
            continue
        total = p["total_rate"]["extracted_lowest"]
        km = dist_km(center, (lat, lon)) if center else None
        fit = 0.0
        for w in wishes:
            fit += 1.5 if w in feats else -1.0
        fit += sum(hprof.get(f, 0) for f in feats) * 0.6
        fit += (p.get("overall_rating") or 4) * 0.8
        imgs = [i.get("thumbnail") for i in (p.get("images") or [])[:4] if i.get("thumbnail")]
        rows.append({
            "id": (p.get("property_token") or p.get("name", ""))[:60],
            "name": p.get("name"),
            "kind": feats[0],
            "feats": feats,
            "area": area_name,
            "rating": p.get("overall_rating"),
            "reviews": p.get("reviews"),
            "stars": p.get("extracted_hotel_class"),
            "total": total,
            "night": (p.get("rate_per_night") or {}).get("extracted_lowest"),
            "km": km,
            "img": imgs[0] if imgs else None,
            "imgs": imgs,
            "link": p.get("link") or r.get("search_metadata", {}).get("google_hotels_url"),
            "amen": (p.get("amenities") or [])[:8],
            "_fit": fit,
        })
    if not rows:
        return None, []
    cheapest = min(x["total"] for x in rows)
    for x in rows:
        x["_score"] = x["_fit"] - (x["total"] - cheapest) / max(cheapest, 1) * 6
    rows.sort(key=lambda x: x["_score"], reverse=True)
    for x in rows:
        x.pop("_fit", None)
        x.pop("_score", None)
    return rows[0], rows[1:5]


# ---------- Huvudflödet ----------
def main():
    if not SERP:
        sys.exit("SERPAPI_KEY saknas")
    today = dt.datetime.now(TZ).date()
    if not FORCE and fs_exists(f"days/{today.isoformat()}"):
        say("Dagens förslag finns redan, ingen ny sökning.")
        return
    cat = load_catalog()
    periods = fs_list("periods")
    duels = fs_list("duels")
    days = fs_list("days")
    recent = set()
    for d in sorted(days, key=lambda x: x["_id"])[-10:]:
        for t in d.get("trips") or []:
            recent.add(t.get("dest"))
    period, example = pick_period(periods, today)
    nights = (dt.date.fromisoformat(period["to"]) - dt.date.fromisoformat(period["from"])).days
    say(f"Period: {period.get('label') or period['_id']} {period['from']}–{period['to']} ({nights} nätter)")

    picks, s_dest, u_dest = choose_destinations(cat, period, duels, recent)
    _, s_hot = taste(duels, "steve")
    _, u_hot = taste(duels, "ulrika")
    hprof = {k: s_hot.get(k, 0) + u_hot.get(k, 0) for k in set(s_hot) | set(u_hot)}

    trips, used_why = [], []
    for dest, why in picks:
        if len(trips) >= 3 or searches >= MAX_SEARCHES - 1:
            break
        # Varje person och "något nytt" får en plats var, så länge det går.
        if why in used_why and len(set(used_why)) < 3 and len(picks) > 6:
            continue
        say("Söker", dest["name"])
        flight = None
        if dest.get("air"):
            try:
                flight = search_flight(dest, period)
            except Exception as e:
                say("  flyg misslyckades:", e)
            if not flight and not dest.get("ferry"):
                say("  inget flyg, provar nästa resmål")
                continue
        try:
            lodging, alts = search_lodging(dest, period, hprof, today.toordinal())
        except Exception as e:
            say("  boende misslyckades:", e)
            lodging, alts = None, []
        if not lodging:
            say("  inget boende i trygga områden, provar nästa resmål")
            continue
        total = (flight or {}).get("price", 0) + (lodging or {}).get("total", 0)
        budget = period.get("budget") or 0
        used_why.append(why)
        trips.append({
            "dest": dest["id"],
            "name": dest["name"],
            "country": dest["country"],
            "tags": dest["tags"],
            "why": why,
            "fitSteve": round(sum(s_dest.get(t, 0) for t in dest["tags"]), 1),
            "fitUlrika": round(sum(u_dest.get(t, 0) for t in dest["tags"]), 1),
            "flight": flight,
            "ferry": bool(dest.get("ferry")) and not flight,
            "ferryUrl": dest.get("ferryUrl"),
            "lodging": lodging,
            "alts": alts,
            "total": total,
            "complete": bool(flight and lodging),
            "overBudget": bool(budget and total > budget),
        })
        say(f"  flyg {(flight or {}).get('price')} € + boende {(lodging or {}).get('total')} € = {total} €")

    # Inom budget först, sedan billigast.
    trips.sort(key=lambda t: (t["overBudget"], not t["complete"], t["total"] or 1e9))
    doc = {
        "date": today.isoformat(),
        "runAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "period": {k: period.get(k) for k in ("label", "from", "to", "budget")} | {"id": period["_id"]},
        "nights": nights,
        "example": example,
        "trips": trips,
        "searches": searches,
        "people": {"adults": ADULTS, "children": CHILDREN},
    }
    fs_set(f"days/{today.isoformat()}", doc)
    say(f"Klart: {len(trips)} förslag, {searches} sökningar använda.")


# ---------- Långresan: Tokyo en gång i veckan ----------
LONG = {
    "dest": "tokyo",
    "window": ("2027-09-01", "2027-11-30"),  # hösten 2027
    "lengths": (10, 12, 14),                  # nätter borta
    "origins": ["HEL", "TKU", "TMP", "VAA"],
    "flights_per_week": 3,
}


def long_candidates(today):
    """Alla (avresa, nätter) i fönstret som går att boka nu (flyg släpps ca 330 dagar före)."""
    start, end = (dt.date.fromisoformat(x) for x in LONG["window"])
    last_bookable = today + dt.timedelta(days=330)
    out = []
    d = start
    while d <= end:
        if d.weekday() in (4, 5):  # fredag eller lördag, så att en helg ingår i början
            for n in LONG["lengths"]:
                back = d + dt.timedelta(days=n)
                if back <= end + dt.timedelta(days=14) and back <= last_bookable:
                    out.append((d, n))
        d += dt.timedelta(days=1)
    return out


def main_longhaul():
    if not SERP:
        sys.exit("SERPAPI_KEY saknas")
    today = dt.datetime.now(TZ).date()
    cat = load_catalog()
    dest = next(d for d in cat if d["id"] == LONG["dest"])
    prev = sorted(fs_list("longhaul"), key=lambda x: x["_id"])
    if prev and not FORCE and (today - dt.date.fromisoformat(prev[-1]["_id"])).days < 6:
        say(f"Tokyo söktes senast {prev[-1]['_id']}, nästa sökning om en vecka.")
        return
    cands = long_candidates(today)
    if not cands:
        say("Inga Tokyodatum går att boka än.")
        return
    # Ny uppsättning datum varje vecka, utspridda över hösten.
    week = today.toordinal() // 7
    n = len(cands)
    picks = []
    for k in range(LONG["flights_per_week"]):
        c = cands[(week * 7 + k * max(1, n // LONG["flights_per_week"])) % n]
        if c not in picks:
            picks.append(c)
    options = []
    for start, nights in picks:
        period = {"from": start.isoformat(), "to": (start + dt.timedelta(days=nights)).isoformat(),
                  "origins": LONG["origins"], "transport": ["direct", "onestop"]}
        say(f"Söker Tokyo {period['from']}–{period['to']}")
        try:
            f = search_flight(dest, period)
        except Exception as e:
            say("  flyg misslyckades:", e)
            f = None
        if f:
            options.append({"from": period["from"], "to": period["to"], "nights": nights, "flight": f})
            say(f"  {f['price']} € ({f['airline']}, {'direkt' if not f['stops'] else 'via ' + ','.join(f['via'])})")
    if not options:
        say("Inga Tokyoflyg hittades för veckans datum.")
        return
    # Billigast per natt vinner, så att längre resor inte straffas. En mellanlandning
    # räknas som 25 % dyrare: med barn på en så lång resa ska direktflyg vara förstahandsvalet.
    options.sort(key=lambda o: o["flight"]["price"] * (1 + 0.25 * o["flight"]["stops"]) / max(o["nights"], 1))
    best = options[0]
    period = {"from": best["from"], "to": best["to"], "lodging": ["hotel", "apartment"], "wishes": []}
    lodging, alts = search_lodging(dest, period, {}, today.toordinal())
    total = best["flight"]["price"] + (lodging or {}).get("total", 0)
    complete = [p for p in prev if p.get("complete") and p["_id"] != today.isoformat()]
    cheapest_before = min((p["total"] for p in complete), default=None)
    doc = {
        "date": today.isoformat(),
        "runAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "dest": "tokyo", "name": "Tokyo", "country": "Japan",
        "from": best["from"], "to": best["to"], "nights": best["nights"],
        "flight": best["flight"], "lodging": lodging, "alts": alts,
        "total": total, "complete": bool(lodging),
        "options": [{"from": o["from"], "to": o["to"], "nights": o["nights"], "price": o["flight"]["price"],
                     "airline": o["flight"]["airline"], "stops": o["flight"]["stops"], "url": o["flight"]["url"]}
                    for o in options],
        "isNew": True,
        "cheapest": bool(lodging) and (cheapest_before is None or total < cheapest_before),
        "cheapestBefore": cheapest_before,
        "searches": searches,
    }
    fs_set(f"longhaul/{today.isoformat()}", doc)
    nice = lambda iso: f"{int(iso[8:10])}/{int(iso[5:7])}"
    eur = lambda n: f"{round(n):,}".replace(",", " ") + " €"
    msg = (f"Ny Tokyoresa: {nice(best['from'])}–{nice(best['to'])} {best['from'][:4]}, {best['nights']} nätter, "
           f"{eur(total)} för fyra ({best['flight']['airline']}, {'direkt' if not best['flight']['stops'] else 'med mellanlandning'})")
    if doc["cheapest"] and cheapest_before:
        msg += f", billigast hittills (förra bästa {eur(cheapest_before)})"
    if not lodging:
        msg += " (bara flyget, inget tryggt boende hittades)"
    say(msg)


if __name__ == "__main__":
    if "--tokyo" in sys.argv:
        main_longhaul()
    else:
        main()
