import sys
p=sys.argv[1];s=open(p).read();js=open(sys.argv[2]).read()
assert s.count("/* ---------- loop ---------- */")==1 and 'Kapitel 6–10' not in s
s=s.replace("/* ---------- loop ---------- */",js+"\n/* ---------- loop ---------- */")
open(p,'w').write(s)
