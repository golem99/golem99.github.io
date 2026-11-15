# lägg på kapitel 12 och 13 i en index.html som redan har kapitel 11 (före loop-markören)
python3 - "$1" <<'P'
import sys,os;p=sys.argv[1];d=os.path.dirname(os.path.abspath(__file__)) if '__file__' in dir() else 'tools/siili'
s=open(p).read();js=open('tools/siili/ch12.js').read()+'\n'+open('tools/siili/ch13.js').read()
a=s.find('/* ================= Osa 3 · Kapitel 12');b=s.find('/* ---------- loop ---------- */')
if a>0:s=s[:a]+s[b:]
s=s.replace('/* ---------- loop ---------- */',js+'\n/* ---------- loop ---------- */');open(p,'w').write(s)
P
