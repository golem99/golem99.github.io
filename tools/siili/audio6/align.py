import json, re, glob, os, subprocess, sys
from rapidfuzz import fuzz

D = json.load(open('/home/claude/audio/script.json'))
BLOCKS = {}
for n, L, t in D['F']:
    BLOCKS[n] = L
for n, L, t in D['S']:
    BLOCKS[n.split(' –')[0]] = L

def norm(s):
    s = s.lower().replace('-', ' ')
    s = re.sub(r"[^a-zåäöü ]", ' ', s)
    return [w for w in s.split() if w]

def silences(f):
    out = subprocess.run(['ffmpeg', '-i', f, '-af', 'silencedetect=n=-42dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', out)]
    en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', out)]
    return list(zip(st, en))

def words_of(j):
    W = []
    for s in j['segs']:
        for a, b, w in s['w']:
            for t in norm(w):
                W.append((a, b, t))
    return W

def identify(j, cands):
    txt = ' '.join(t for _, _, t in words_of(j))
    best = None
    for n in cands:
        bt = ' '.join(w for l in BLOCKS[n] for w in norm(l))
        sc = fuzz.token_set_ratio(txt, bt) * 0.5 + fuzz.ratio(txt[:600], bt[:600]) * 0.5
        if best is None or sc > best[0]:
            best = (sc, n)
    return best

def align(W, lines):
    """DP alignment of script words to transcript words. returns list of (first_idx,last_idx) per line"""
    S = []
    for li, l in enumerate(lines):
        for w in norm(l):
            S.append((li, w))
    n, m = len(S), len(W)
    INF = 1e9
    # cost matrix dp[i][j]: aligned first i script words with first j transcript words
    dp = [[INF] * (m + 1) for _ in range(n + 1)]
    bk = [[0] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for j in range(1, m + 1):
        dp[0][j] = j * 0.6; bk[0][j] = 2
    for i in range(1, n + 1):
        dp[i][0] = i * 1.0; bk[i][0] = 1
        sw = S[i - 1][1]
        for j in range(1, m + 1):
            tw = W[j - 1][2]
            sim = fuzz.ratio(sw, tw) / 100
            c = dp[i - 1][j - 1] + (1 - sim) * 1.2
            b = 3
            if dp[i - 1][j] + 1.0 < c:
                c = dp[i - 1][j] + 1.0; b = 1
            if dp[i][j - 1] + 0.6 < c:
                c = dp[i][j - 1] + 0.6; b = 2
            dp[i][j] = c; bk[i][j] = b
    i, j = n, m
    match = {}
    while i > 0 or j > 0:
        b = bk[i][j]
        if b == 3:
            match.setdefault(S[i - 1][0], []).append(j - 1); i -= 1; j -= 1
        elif b == 1:
            i -= 1
        else:
            j -= 1
    res = []
    for li in range(len(lines)):
        idx = match.get(li, [])
        res.append((min(idx), max(idx)) if idx else None)
    return res

def cuts(W, spans, sil, dur):
    out = []
    for k, sp in enumerate(spans):
        if sp is None:
            out.append(None); continue
        a = W[sp[0]][0]; b = W[sp[1]][1]
        # start: end of last silence that ends before a+0.1
        prev = [e for s, e in sil if e <= a + 0.12]
        st = max(prev[-1] - 0.05, a - 0.35) if prev else max(0, a - 0.2)
        nxt = [s for s, e in sil if s >= b - 0.12]
        en = min(nxt[0] + 0.12, b + 0.5) if nxt else min(dur, b + 0.3)
        out.append((max(0, st), en))
    # make sure no overlap
    for k in range(1, len(out)):
        if out[k] and out[k - 1] and out[k][0] < out[k - 1][1]:
            mid = (out[k][0] + out[k - 1][1]) / 2
            out[k - 1] = (out[k - 1][0], mid); out[k] = (mid, out[k][1])
    return out

def dur_of(f):
    return float(subprocess.run(['ffprobe', '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)

if __name__ == '__main__':
    files = sorted(glob.glob('/home/claude/audio/*_siili.json'))
    cands = [n for n in BLOCKS if n not in ('Block 10C', 'Block 10D')]
    for p in files:
        j = json.load(open(p))
        print(os.path.basename(p), j['lang'], identify(j, cands))
