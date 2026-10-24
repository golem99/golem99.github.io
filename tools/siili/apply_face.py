import sys
p=sys.argv[1]; s=open(p).read(); face=open(sys.argv[2]).read()
def rep(a,b,c=1):
    global s
    assert s.count(a)==c,(a[:70],s.count(a)); s=s.replace(a,b)
rep("/* the four-legged Siili had curl", face+"\n/* the four-legged Siili had curl")
rep("  mixer=new THREE.AnimationMixer(inner);","  setupFace(inner);\n  mixer=new THREE.AnimationMixer(inner);")
rep("  homeCamStep(dt);cam.lookAt(","  faceStep(dt,t);homeCamStep(dt);cam.lookAt(")
open(p,'w').write(s); print('ok')
