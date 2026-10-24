import sys
p=sys.argv[1]; s=open(p).read()
def rep(a,b,c=1):
    global s
    assert s.count(a)==c,(a[:70],s.count(a)); s=s.replace(a,b)
rep("['siili.glb','love/town-houses.glb'","['siili-biped.glb','love/town-houses.glb'")
rep("const inner=sg.scene; inner.scale.setScalar(.15);","const inner=sg.scene; /* 2026-10-24: Siili on two legs (Meshy, Mixamo skeleton), fitted to SIILI_H */ {const b=new THREE.Box3().setFromObject(inner);inner.scale.setScalar(SIILI_H/(b.max.y-b.min.y));inner.updateMatrixWorld(true);const b2=new THREE.Box3().setFromObject(inner);inner.position.y-=b2.min.y}")
rep(" inner.position.y=.62*.15; siili=new THREE.Group();"," siili=new THREE.Group();")
rep("if(o.isBone&&o.name==='head') headBone=o;","if(o.isBone&&(o.name==='head'||o.name==='mixamorigHead')) headBone=o;")
rep("for(const c of sg.animations){if(c.name==='idle')","for(const c of sg.animations){if(/^(walk|run)$/.test(c.name))c.tracks=c.tracks.filter(tr=>!/Hips\\.position$/.test(tr.name));if(c.name==='idle')")
rep("if(!['idle','walk'].includes(c.name))","if(!['idle','walk','run','talk','talk2','listen'].includes(c.name))")
rep("function play(name,fade=.25){","/* the four-legged Siili had curl, sneeze and sad; the two-legged one gets the nearest match, plus a face */\nconst ANIM_ALIAS={curl:'sitstand',sneeze:'scared',sad:'listen'};let moodT=0;\nfunction play(name,fade=.25){if(name==='sad'||name==='curl'){faceMood=name==='sad'?'sad':'sleepy';clearTimeout(moodT);if(name==='sad')moodT=setTimeout(()=>{if(faceMood==='sad')faceMood=null},3500)}else if(name!=='idle'&&faceMood==='sleepy')faceMood=null;\n  if(name==='happy'&&scene===homeS)name=rnd(['happy','happy','clap','thumbs','jump']);\n  if(name==='curl'&&actions.sitstand){const a=actions.sitstand;clearTimeout(play.t);a.reset();a.timeScale=-1;a.time=a.getClip().duration;a.setEffectiveWeight(1).fadeIn(fade).play();if(current&&current!==a)current.fadeOut(fade);current=a;return}\n  if(name==='sitstand'&&actions.sitstand)actions.sitstand.timeScale=1;\n  if(!actions[name]&&ANIM_ALIAS[name])name=ANIM_ALIAS[name];")
rep("let siili,mixer,actions={},jaw,current,holeMesh,things={},homeRoot;","let siili,mixer,actions={},jaw,current,holeMesh,things={},homeRoot;const SIILI_H=.2;")
# while Siili speaks and stands still, his hands talk too
rep("function say(id,{word,sub=true}={}){\n  const L=LINES[id]; if(!L) return Promise.resolve();","function say(id,o={}){const idle=siili&&current===actions.idle&&scene===homeS&&Math.random()<.6;if(idle)play(rnd(['talk','talk2','present']),.3);return say0(id,o).then(v=>{if(idle&&(current===actions.talk||current===actions.talk2||current===actions.present))play('idle',.4);return v})}\nfunction say0(id,{word,sub=true}={}){\n  const L=LINES[id]; if(!L) return Promise.resolve();")
open(p,'w').write(s); print('ok')
