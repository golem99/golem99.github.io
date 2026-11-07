# lägg på kapitel 11 i en index.html som redan har kapitel 6–10
python3 - "$1" <<'P'
import sys;p=sys.argv[1];s=open(p).read();js=open('/home/claude/build/tools/siili/ch11.js').read()
a=s.find('/* ================= Osa 3 · Kapitel 11');b=s.find('/* ---------- loop ---------- */')
if a>0:s=s[:a]+s[b:]
s=s.replace("/* ---------- loop ---------- */",js+"\n/* ---------- loop ---------- */");open(p,'w').write(s)
P
