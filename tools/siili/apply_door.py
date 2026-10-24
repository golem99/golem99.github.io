import sys
p=sys.argv[1]; s=open(p).read(); d=open(sys.argv[2]).read()
def rep(a,b,c=1):
    global s
    assert s.count(a)==c,(a[:70],s.count(a)); s=s.replace(a,b)
a=s.index("/* the hole by the steps */"); b=s.index("/* ---------- loading ---------- */")
s=s[:a]+d+"\n"+s[b:]
rep("faceStep(dt,t);homeCamStep(dt);","faceStep(dt,t);doorStep(dt);homeCamStep(dt);")
rep("ask('Det prasslar under trappan … klicka på hålet!');","ask('Det prasslar bakom dörren under trappan … klicka på dörren!');",1)
rep("await waitPick(h=>h.some(x=>x.object===holeMesh)?true:undefined); ask('');\n  putSiiliOut();","await waitPick(h=>h.some(x=>x.object===holeMesh)?true:undefined); ask('');sfx('door',.4);doorTarget=1;await sleep(500);\n  putSiiliOut();")
rep("camTo(new THREE.Vector3(64.92,.11,40.95),new THREE.Vector3(64.62,.09,41.35),1800);","camTo(new THREE.Vector3(64.95,.15,40.88),new THREE.Vector3(64.62,.12,41.35),1800);")
rep("function putSiiliOut(){SIILI_CLIP.length=0;","function putSiiliOut(){doorTarget=1;SIILI_CLIP.length=0;")
rep("async function toHome(){sfx('door',.4);setMusic('home');await fadeTo(homeS);","async function toHome(){sfx('door',.4);setMusic('home');await fadeTo(homeS);doorTarget=0;doorOpen=0;")
rep("async function walkLeg(p,speed){play('walk',.15);if(actions.walk)actions.walk.timeScale=THREE.MathUtils.clamp(speed/.045,1.2,2.8);","async function walkLeg(p,speed){/* 2026-10-24: bigger rooms and a taller Siili: faster at home, and a run for long stretches */speed*=scene===homeS?1.5:1.2;const A=speed>.21&&actions.run?'run':'walk';play(A,.15);if(actions[A])actions[A].timeScale=THREE.MathUtils.clamp(speed/(A==='run'?.3:.11),.8,1.7);")
rep("function showWord(fi,sv,ms=2600){sfx('newword',.35);","function showWord(fi,sv,ms=2600){sfx('newword',.35);if(scene===homeS)boardWrite(fi,sv||'');")
rep("setInterval(()=>{if(!siili||!siili.parent||!audio.paused||performance.now()-lastAct<16000)return;","setInterval(()=>{if(!siili||!siili.parent||!audio.paused||faceMood==='sleepy'||performance.now()-lastAct<16000)return;")
rep("['g-yawn','sad']","['g-yawn','idle']")
rep("async function runPart(i){if(running)return;running=true;","async function runPart(i){if(running)return;running=true;faceMood=null;if(actions.sitstand)actions.sitstand.timeScale=1;")
open(p,'w').write(s); print('ok')
