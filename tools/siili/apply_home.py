import sys,re
p=sys.argv[1]; s=open(p).read(); new=open(sys.argv[2]).read()
def rep(old,new_,count=1):
    global s
    assert s.count(old)==count,(old[:70],s.count(old)); s=s.replace(old,new_)
# 1. swap the burrow for the flat
a=s.index("/* ---------- Siili's burrow, built by hand ---------- */"); b=s.index("function rockGeo(")
s=s[:a]+s[b:]
a=s.index("async function buildHome(){"); b=s.index("function addPlaceholders(){")
s=s[:a]+new+s[b:]
# 2. obstacles
a=s.index("const OBST=()=>scene!==homeS?[]:["); b=s.index("];",a)+2
s=s[:a]+"const OBST=()=>scene!==homeS?[]:[...Object.entries(HOME_SPOTS).filter(([w,v])=>w!=='matto'&&v[1]<.01).map(([w,[x,,z]])=>({x,z,r:{pulla:.07,pallo:.08,mato:.11,kukka:.07,lamppu:.08,kuppi:.05,sukka:.14}[w]||.07,w})),...HOME_OBST];"+s[b:]
# 3. home light set in the scene setup: the flat brings its own
rep("homeS.add(new THREE.HemisphereLight('#ffd2a0','#8a5634',1.1));","")
rep("homeS.fog=new THREE.Fog('#3a2414',1.7,3.8);","homeS.fog=null;")
rep("const hk=new THREE.DirectionalLight('#ffd9a8',.6);","const hk=new THREE.DirectionalLight('#ffd9a8',.25);")
# 4. camera at home: follows Siili between the rooms, wide while Saga searches
rep("putSiiliHome();cam.position.set(0,0.2,1.05);camLook.set(0,0.06,-0.12)}","putSiiliHome();homeCam='follow';const [hp,hl]=homeCamTarget();cam.position.copy(hp);camLook.copy(hl)}")
rep("  cam.lookAt(_ip.copy(camLook).add(drift));","  homeCamStep(dt);cam.lookAt(_ip.copy(camLook).add(drift));")
rep("    for(;;){const t=await nextPick();","    homeCam='wide';\n    for(;;){const t=await nextPick();")
rep("    clearInterval(auto);pickHandler=null;hb.style.display='none';ask('');","    clearInterval(auto);pickHandler=null;hb.style.display='none';ask('');homeCam='follow';")
rep("    for(;;){const t=await waitPick(h=>thingOf(h)??undefined);if(t===w){hb.style.display='none';ask('');","    homeCam='wide';for(;;){const t=await waitPick(h=>thingOf(h)??undefined);if(t===w){hb.style.display='none';ask('');homeCam='follow';")
# 5. new globals
rep("let homeLamp,homeFlame,homeCandle,fairy=[];","let homeLamp,homeFlame,homeCandle,fairy=[],homeBoard,boardWrite=()=>{};")
open(p,'w').write(s); print('ok')
