import sys
p=sys.argv[1];s=open(p).read();js=open(sys.argv[2]).read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
# code goes right after the camera-move helpers (needs R, composer, passes, things, siili, ROOM declared before it runs)
R("/* ---------- picking ---------- */",js+"\n/* ---------- picking ---------- */")
# render loop: raw frame time to the watcher; a manual mode for rendering the film
R("R.setAnimationLoop(()=>{const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;",
  "R.setAnimationLoop(()=>{if(window.__manual)return;window.__frame()});window.__frame=(()=>{const rdt=window.__manual?window.__dt:clock.getDelta();if(window.__manual)clock.elapsedTime+=rdt;perfStep(rdt);const dt=Math.min(rdt,.05),t=clock.elapsedTime;")
# scene changes: give the watcher a pause
R("function useScene(s){scene=s;rp.scene=s;gtao.scene=s;bokeh.scene=s}","function useScene(s){scene=s;rp.scene=s;gtao.scene=s;bokeh.scene=s;if(typeof perfHold==='function')perfHold()}")
# the home key light, so its shadow follows the quality step
R("key.castShadow=true;key.shadow.mapSize.set(2048,2048);","key.castShadow=true;homeKey=key;key.shadow.mapSize.set(2048,2048);")
# walking: the grid path at home, the old circles as a fallback
R("const path=planPath(siili.position.clone(),goal,skip);","const path=(scene===homeS&&navPath(siili.position.clone(),goal,skip))||planPath(siili.position.clone(),goal,skip);")
# after loading: quality step, then compile shaders and upload textures for both scenes while the start screen shows
R("const ready=init().catch(","const ready=init().then(()=>{setQuality(qStep);try{for(const S_ of[homeS,outS]){R.compile(S_,cam);S_.traverse(o=>{if(o.material)for(const m of[].concat(o.material))for(const k in m){const v=m[k];if(v&&v.isTexture)R.initTexture(v)}})}}catch(e){console.warn(e)}perfHold(4000)}).catch(")
R("function setMusic(name,loop=true){music.loop=loop;","function setMusic(name,loop=false){music.loop=false;")
# the worm: built in code instead of props_mato.glb
R("await Promise.all(Object.keys(HOME_SPOTS).map(async w=>{try{const g=await load('props_'+w+'.glb');",
  "await Promise.all(Object.keys(HOME_SPOTS).map(async w=>{try{if(w==='mato'){const th=things[w];th.clear();const wm=makeWorm();wm.rotation.y=-1.45;th.add(wm);return}const g=await load('props_'+w+'.glb');")
open(p,'w').write(s)
