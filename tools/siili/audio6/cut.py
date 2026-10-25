import json, glob, os, subprocess, re, sys
sys.path.insert(0, '/home/claude/audio')
from align import BLOCKS, words_of, identify, align, cuts, silences, dur_of, norm
from pairs import CH

OUT = '/home/claude/audio/out'; os.makedirs(OUT, exist_ok=True)
fi_blocks = [n for n in BLOCKS if n.startswith('Block')]
sv_blocks = [n for n in BLOCKS if n.startswith('Svenska')]

# which recording is which block (latest take wins)
rec = {}
report = []
for p in sorted(glob.glob('/home/claude/audio/*.json')):
    if p.endswith('script.json'): continue
    j = json.load(open(p))
    if p.endswith('_owl.json'): n = 'Block 10C'; sc = 100
    elif p.endswith('_sq.json'): n = 'Block 10D'; sc = 100
    else:
        sc, n = identify(j, sv_blocks if j['lang'] == 'sv' else [b for b in fi_blocks if b not in ('Block 10C', 'Block 10D')])
    report.append((os.path.basename(p), j['lang'], n, round(sc)))
    rec[n] = (p, j)
for r in report: print(*r)
missing = [b for b in BLOCKS if b not in rec and b not in ('Block T67', 'Svenska T67')]
print('MISSING', missing)

def cutfile(src, a, b, dst, word=False):
    fade = .012
    subprocess.run(['ffmpeg', '-v', 'quiet', '-y', '-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', src,
                    '-af', f'afade=t=in:d={fade},areverse,afade=t=in:d=0.04,areverse',
                    '-ac', '1', '-ar', '44100', '-b:a', '96k', dst], check=True)

seg = {}   # block -> list of (start,end) per line
wordspans = {}
for n, (p, j) in rec.items():
    src = j['f']; W = words_of(j); lines = BLOCKS[n]
    spans = align(W, lines)
    cs = cuts(W, spans, silences(src), dur_of(src))
    seg[n] = (src, cs, spans, W)
    bad = [k for k, c in enumerate(cs) if c is None]
    if bad: print('UNALIGNED', n, bad)

LINES = {}
def put(id_, src, c, fi, sv):
    if c is None: return
    cutfile(src, c[0], c[1], f'{OUT}/{id_}.mp3')
    LINES[id_] = {'f': f'audio/{id_}.mp3', 'fi': fi, 'sv': sv}

for ch, cfg in CH.items():
    Fl = []; Sl = []
    for b in cfg['F']:
        if b not in seg: continue
        src, cs, spans, W = seg[b]
        for k, l in enumerate(BLOCKS[b]): Fl.append((src, cs[k], l, spans[k], W))
    for b in cfg['S']:
        if b not in seg: Sl += [(None, None, l, None, None) for l in BLOCKS[b]]; continue
        src, cs, spans, W = seg[b]
        for k, l in enumerate(BLOCKS[b]): Sl.append((src, cs[k], l, spans[k], W))
    for i, (src, c, l, sp, W) in enumerate(Fl):
        sv = Sl[cfg['P'][i]][2] if i in cfg['P'] and cfg['P'][i] < len(Sl) else ''
        put(f'k{ch}-{i:02d}', src, c, l, sv)
        if i in cfg['P'] and cfg['P'][i] < len(Sl):
            s = Sl[cfg['P'][i]]
            if s[0]: put(f'k{ch}-{i:02d}s', s[0], s[1], s[2], '')
    for i in cfg['SO']:
        if i < len(Sl) and Sl[i][0]: put(f'x{ch}-{i:02d}', Sl[i][0], Sl[i][1], Sl[i][2], '')

# owl and squirrel
for b, pre in (('Block 10C', 'o'), ('Block 10D', 'q')):
    if b in seg:
        src, cs, spans, W = seg[b]
        for k, l in enumerate(BLOCKS[b]): put(f'{pre}-{k:02d}', src, cs[k], l, '')

# single words cut from "Tämä on X." (ch6) -> kw-x
src, cs, spans, W = seg['Block 6A']
for k in range(12, 29):
    l = BLOCKS['Block 6A'][k]; w = norm(l)[-1]; sp = spans[k]
    if sp is None: continue
    a = W[sp[1]][0] - .06; b = cs[k][1]
    cutfile(src, max(cs[k][0], a), b, f'{OUT}/kw-{w}.mp3')
    LINES[f'kw-{w}'] = {'f': f'audio/kw-{w}.mp3', 'fi': l.split(' on ')[-1].rstrip('.').capitalize(), 'sv': ''}

json.dump(LINES, open('/home/claude/audio/lines6.json', 'w'), ensure_ascii=False, indent=0)
print(len(LINES), 'clips')
