/* ---------- Siili's face: mouth shapes and eyes on thin patches over the face (2026-10-24) ----------
   The two-legged model has no jaw. Three thin copies of the face surface (mouth, eye_r, eye_l, cut in Blender) follow
   the head. Each shows one picture from a strip cut from Meshy's expression sheets (face-mouth.png, face-eye_r.png,
   face-eye_l.png); when the patch is hidden the face is the modelled one (closed smile, open eyes). The mouth follows the
   loudness of the voice, the eyes blink every few seconds and change with the mood. */
const MOUTHS=['O','A','laugh','E','sad','hmm'],EYES6=['closed','happy','wow','curious','sad','sleepy'];
const faceParts={};let mouthShape='closed',eyeShape='open',mouthT=0,blinkAt=2,blinkEnd=0,faceMood=null;
let faceBase=null;
function facePatch(mesh,file,n){const t=new THREE.TextureLoader().load(file);t.flipY=false;t.colorSpace=THREE.SRGBColorSpace;t.repeat.set(1/n,1);t.anisotropy=8;
  // same surface as the face itself, so the patch takes the light the same way
  const m=faceBase?faceBase.clone():new THREE.MeshStandardMaterial({roughness:.9});m.map=t;m.normalMap=null;m.roughnessMap=null;m.metalnessMap=null;m.aoMap=null;m.transparent=true;m.depthWrite=false;
  m.polygonOffset=true;m.polygonOffsetFactor=-8;m.polygonOffsetUnits=-8;m.clippingPlanes=SIILI_CLIP;mesh.material=m;
  mesh.renderOrder=3;mesh.castShadow=false;mesh.visible=false;return {mesh,t,n}}
function showPatch(P,list,s){if(!P)return;const i=list.indexOf(s);if(i<0){P.mesh.visible=false;return}P.t.offset.x=i/P.n;P.mesh.visible=true}
function drawMouth(s){showPatch(faceParts.mouth,MOUTHS,s)}
function drawEyes(s){showPatch(faceParts.eye_r,EYES6,s);showPatch(faceParts.eye_l,EYES6,s)}
/* 2026-10-24: switched off for the first beta: the patches looked smudgy at game distance. Turn on when they're redone. */
const FACE_ON=false;
function setupFace(inner){inner.traverse(o=>{if(/^(mouth|eye_r|eye_l)$/.test(o.name))o.visible=false});if(!FACE_ON)return;inner.traverse(o=>{if(o.isMesh&&!faceBase&&!/^(mouth|eye_r|eye_l|quill_shell)$/.test(o.name))faceBase=o.material});inner.traverse(o=>{if(!o.isMesh)return;if(o.name==='mouth')faceParts.mouth=facePatch(o,'face-mouth.png',6);
  if(o.name==='eye_r'||o.name==='eye_l')faceParts[o.name]=facePatch(o,`face-${o.name}.png`,6)})}
/* a mood for a while: 'happy', 'wow', 'curious', 'sad', 'sleepy' (null = normal) */
function setMood(m){faceMood=m}
function faceStep(dt,t){if(!faceParts.mouth)return;
  const cheer=current===actions.happy||current===actions.clap||current===actions.jump||current===actions.thumbs;
  const mood=cheer?'happy':current===actions.scared?'wow':current===actions.think||current===actions.sniff?'curious':faceMood;
  mouthT-=dt;if(mouthT<=0){mouthT=.08+Math.random()*.05;
    let s='closed';if(level>.06){s=level>.4?(cheer?'laugh':(Math.random()<.55?'A':'E')):level>.18?(Math.random()<.5?'O':'E'):(Math.random()<.6?'closed':'O')}
    else if(mood==='sad')s='sad';else if(mood==='curious')s='hmm';else if(mood==='wow')s='O';
    if(s!==mouthShape){mouthShape=s;drawMouth(s)}}
  if(t>blinkAt){blinkEnd=t+.13;blinkAt=t+2.3+Math.random()*3.4;if(Math.random()<.18)blinkAt=t+.34}
  let e=mood||'open';if(t<blinkEnd&&e!=='happy')e='closed';if(e!==eyeShape){eyeShape=e;drawEyes(e)}}
