import sys
p=sys.argv[1]; s=open(p).read()
def rep(old,new,count=1):
    global s
    assert s.count(old)==count, (old[:60], s.count(old)); s=s.replace(old,new)
rep("homeS.add(new THREE.HemisphereLight('#ffd2a0','#8a5634',1.1));","homeS.add(new THREE.HemisphereLight('#ffd6a8','#4a2f45',.62)); /* 2026-10-24: less flat fill, plum shadows like a cartoon film */")
rep("homeS.fog=new THREE.Fog('#3a2414',1.7,3.8);","homeS.fog=new THREE.Fog('#2a1a24',1.5,3.4);")
rep("homeS.environment=envFrom('#e8b47c','#6a4228','#ffd2a0');homeS.environmentIntensity=.45;","homeS.environment=envFrom('#e8b47c','#3e2838','#ffd2a0');homeS.environmentIntensity=.38;")
rep("const day=new THREE.SpotLight('#b9d6ff',6,2.4,.7,.8,1.5);","const day=new THREE.SpotLight('#a9cdff',9,2.6,.65,.85,1.4);")
rep("const lampL=new THREE.PointLight('#ffb866',2.2,2.2,1.6);","const lampL=new THREE.PointLight('#ffb35c',3.2,2.4,1.5);")
rep("side:THREE.BackSide,color:'#c79a73'}));shell.rotation.y","side:THREE.BackSide,color:'#97704f'}));shell.rotation.y")
rep("bumpScale:3,roughness:1,color:'#b48a66'}));floor.rotation.x","bumpScale:3,roughness:1,color:'#9c7458'}));floor.rotation.x")
rep("let homeLamp,homeFlame,homeCandle,fairy=[];","let homeLamp,homeFlame,homeCandle,fairy=[],homeBoard,boardWrite=()=>{};")
rep("{x:-.62,z:-.06,r:.03},{x:-.68,z:.02,r:.05}];","{x:-.62,z:-.06,r:.03},{x:-.68,z:.02,r:.05},{x:.34,z:-.22,r:.1},{x:.64,z:-.45,r:.04},{x:-.33,z:.52,r:.06}];")
add=open(sys.argv[2]).read()
rep("  // furniture: CC0 models from Poly Haven at dollhouse scale", add+"  // furniture: CC0 models from Poly Haven at dollhouse scale")
open(p,'w').write(s); print('ok')
