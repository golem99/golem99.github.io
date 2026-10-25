import sys
p=sys.argv[1];s=open(p).read();js=open(sys.argv[2]).read()
import os
env=os.path.join(os.path.dirname(os.path.abspath(sys.argv[2])),'ch3env.js')
if os.path.exists(env): js=js+'\n'+open(env).read()
assert s.count("/* ---------- loop ---------- */")==1 and 'Kapitel 6–10' not in s
s=s.replace("/* ---------- loop ---------- */",js+"\n/* ---------- loop ---------- */")
open(p,'w').write(s)
