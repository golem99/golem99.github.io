/* ================= Kapitel 2 · O ja U (2026-10-25) =================
   The harbour: a wooden pier on the sea at Kristinestad, red boathouses on the shore, a little white rowboat
   that brings a big yellow Å (which isn't allowed ashore, Finnish has no Å). Parts: the boat comes, Kuuntele!
   (which word of a pair), O- or U-bucket, movement words, Siili reads Swedish with Finnish eyes, evening rhyme. */
const harbS=new THREE.Scene();let harbBuilt=false,harbWater=null,harbBoat=null,harbA=null,bucketO=null,bucketU=null,boatT=0,boatState='away';
function woodTex2(base='#9a7a58',grain='#6f5338',w=512,h=128){return canvas(w,h,(g)=>{g.fillStyle=base;g.fillRect(0,0,w,h);
  for(let i=0;i<70;i++){g.strokeStyle=`rgba(${Math.random()<.5?'60,40,25':'255,240,220'},${(Math.random()*.18).toFixed(3)})`;g.lineWidth=R01(.5,2.5);g.beginPath();const y=Math.random()*h;g.moveTo(0,y);for(let x=0;x<=w;x+=32)g.lineTo(x,y+Math.sin(x*.02+i)*R01(1,4));g.stroke()}
  for(let i=0;i<6;i++){g.fillStyle='rgba(70,45,28,.35)';g.beginPath();g.ellipse(Math.random()*w,Math.random()*h,R01(4,9),R01(2,4),0,0,Math.PI*2);g.fill()}})}
function buildHarbor(){if(harbBuilt)return;harbBuilt=true;const H=harbS;
  H.background=outS.background;H.fog=new THREE.FogExp2('#dcc9b4',.024);
  H.add(new THREE.HemisphereLight('#c9d8f0','#8a6a50',1.25));
  const sunH=new THREE.DirectionalLight('#ffd2a0',3);sunH.position.set(-6,7,5);sunH.castShadow=true;sunH.shadow.mapSize.set(2048,2048);
  Object.assign(sunH.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:.5,far:30});sunH.shadow.bias=-.0005;sunH.shadow.normalBias=.02;sunH.shadow.radius=6;sunH.target.position.set(0,0,-1);H.add(sunH,sunH.target);
  const fillH=new THREE.DirectionalLight('#9fc0ff',.45);fillH.position.set(6,4,-4);H.add(fillH);
  // --- the sea: a big plane with soft rolling waves (vertex shader) and a darker colour further out
  const wg=new THREE.PlaneGeometry(80,80,160,160);wg.rotateX(-Math.PI/2);
  const wm=new THREE.MeshPhysicalMaterial({color:'#3f6f7e',roughness:.12,metalness:0,clearcoat:.6,clearcoatRoughness:.2,envMap:outS.background,envMapIntensity:.9,transparent:true,opacity:.97});
  wm.onBeforeCompile=sh=>{sh.uniforms.uT={value:0};wm.userData.sh=sh;
    sh.vertexShader='uniform float uT;\n'+sh.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      float w1=sin(position.x*.9+uT*1.1)*.035+sin(position.z*1.3-uT*1.4)*.03+sin((position.x+position.z)*2.7+uT*2.2)*.012;transformed.y+=w1;`)
      .replace('#include <beginnormal_vertex>',`#include <beginnormal_vertex>
      objectNormal=normalize(vec3(-(cos(position.x*.9+uT*1.1)*.0315+cos((position.x+position.z)*2.7+uT*2.2)*.0324),1.,-(cos(position.z*1.3-uT*1.4)*.039+cos((position.x+position.z)*2.7+uT*2.2)*.0324)));`);};
  harbWater=new THREE.Mesh(wg,wm);harbWater.position.y=-.55;harbWater.receiveShadow=true;H.add(harbWater);
  // --- the pier: planks across, two stringers, posts down into the water
  const pw=tex(woodTex2('#a2805c','#6f5338'),[1,1]);const plankM=new THREE.MeshStandardMaterial({map:pw,roughness:.9});
  const PZ0=-14,PZ1=.4,PW=1.7;
  for(let z=PZ1;z>PZ0;z-=.2){const p=new THREE.Mesh(new THREE.BoxGeometry(PW+R01(-.04,.04),.05,.18),plankM);p.position.set(R01(-.02,.02),-.025+R01(-.006,.004),z-.1);p.rotation.y=R01(-.012,.012);p.castShadow=p.receiveShadow=true;H.add(p)}
  const postM=new THREE.MeshStandardMaterial({color:'#5d4a3a',roughness:1});
  for(let z=PZ1-.1;z>PZ0;z-=1.6)for(const x of[-PW/2+.06,PW/2-.06]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.08,.09,1.4,14),postM);c.position.set(x,-.62,z);c.castShadow=true;H.add(c)}
  for(const x of[-PW/2+.06,PW/2-.06]){const s=new THREE.Mesh(new THREE.BoxGeometry(.1,.12,PZ1-PZ0),postM);s.position.set(x,-.11,(PZ0+PZ1)/2);H.add(s)}
  // bollards and a rope coil at the end of the pier
  for(const x of[-PW/2+.12,PW/2-.12]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,.22,18),new THREE.MeshStandardMaterial({color:'#3e3a37',roughness:.6,metalness:.3}));b.position.set(x,.11,PZ1-.18);b.castShadow=true;H.add(b)}
  {const rope=new THREE.Mesh(new THREE.TorusGeometry(.13,.028,8,40),new THREE.MeshStandardMaterial({color:'#c9b27e',roughness:1}));rope.rotation.x=Math.PI/2;rope.position.set(-.5,.03,-.7);rope.castShadow=true;H.add(rope);
   const rope2=rope.clone();rope2.scale.setScalar(.75);rope2.position.y=.08;H.add(rope2)}
  // a lantern post on the pier
  {const g=new THREE.Group();const pm=new THREE.MeshStandardMaterial({color:'#2f4a3f',roughness:.5,metalness:.4});const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,1.6,12),pm);pole.position.y=.8;
   const lamp=new THREE.Mesh(new THREE.BoxGeometry(.16,.2,.16),new THREE.MeshStandardMaterial({color:'#ffe2a8',emissive:new THREE.Color('#ffb860'),emissiveIntensity:1.2}));lamp.position.y=1.68;
   const cap=new THREE.Mesh(new THREE.ConeGeometry(.15,.1,4),pm);cap.position.y=1.83;cap.rotation.y=Math.PI/4;g.add(pole,lamp,cap);g.position.set(-.7,0,-2.2);g.traverse(o=>o.castShadow=true);H.add(g);
   const pl=new THREE.PointLight('#ffc27a',1.4,4,1.8);pl.position.set(-.7,1.6,-2.2);H.add(pl)}
  // --- the shore: rocks, grass, three red boathouses, birches
  const rockM=new THREE.MeshStandardMaterial({color:'#8d8a84',roughness:.95});
  for(let i=0;i<46;i++){const r=new THREE.Mesh(new THREE.DodecahedronGeometry(R01(.3,1.1),1),rockM);r.position.set(R01(-14,14),R01(-.7,-.2),PZ0+R01(-1.5,2.2));r.scale.set(1,R01(.4,.8),1);r.rotation.set(R01(0,3),R01(0,3),0);r.castShadow=r.receiveShadow=true;H.add(r)}
  const land=new THREE.Mesh(new THREE.BoxGeometry(60,1,14),new THREE.MeshStandardMaterial({color:'#7d8a52',roughness:1}));land.position.set(0,-.4,PZ0-7.5);land.receiveShadow=true;H.add(land);
  const red='#9b2f24';
  for(const [x,w,rot] of[[-6.5,4.2,.05],[-1.6,3.6,-.03],[3.6,4.6,.02],[8.6,3.8,-.05]]){const g=new THREE.Group();const d=3.2,hh=2.4;
    const wall=new THREE.Mesh(new THREE.BoxGeometry(w,hh,d),new THREE.MeshStandardMaterial({map:tex(canvas(256,128,(c,cw,ch)=>{c.fillStyle=red;c.fillRect(0,0,cw,ch);for(let x2=0;x2<cw;x2+=12){c.fillStyle='rgba(0,0,0,.18)';c.fillRect(x2,0,2,ch)}}),[2,1]),roughness:.95}));wall.position.y=hh/2;
    const rs=new THREE.Shape();rs.moveTo(-w/2-.25,0);rs.lineTo(0,1.3);rs.lineTo(w/2+.25,0);rs.lineTo(w/2+.1,0);rs.lineTo(0,1.12);rs.lineTo(-w/2-.1,0);rs.closePath();
    const roof=new THREE.Mesh(new THREE.ExtrudeGeometry(rs,{depth:d+.5,bevelEnabled:false}),new THREE.MeshStandardMaterial({color:'#3a3634',roughness:.9}));roof.position.set(0,hh,-d/2-.25);
    const gs=new THREE.Shape();gs.moveTo(-w/2,0);gs.lineTo(0,1.12);gs.lineTo(w/2,0);gs.closePath();
    const gable=new THREE.Mesh(new THREE.ExtrudeGeometry(gs,{depth:d,bevelEnabled:false}),wall.material);gable.position.set(0,hh,-d/2);
    const winM=new THREE.MeshStandardMaterial({color:'#2b3640',roughness:.2,metalness:.2}),frM=new THREE.MeshStandardMaterial({color:'#f4efe6',roughness:.8});
    for(const wx of[-w*.33,w*.33]){const fr=new THREE.Mesh(new THREE.BoxGeometry(.62,.62,.05),frM);fr.position.set(wx,hh*.62,d/2+.03);const gl=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.06),winM);gl.position.set(wx,hh*.62,d/2+.04);
      const cx=new THREE.Mesh(new THREE.BoxGeometry(.04,.5,.07),frM);cx.position.copy(gl.position);const cy=new THREE.Mesh(new THREE.BoxGeometry(.5,.04,.07),frM);cy.position.copy(gl.position);g.add(fr,gl,cx,cy)}
    g.add(gable);
    const door=new THREE.Mesh(new THREE.BoxGeometry(w*.4,hh*.75,.05),new THREE.MeshStandardMaterial({color:'#efe6d6',roughness:.8}));door.position.set(0,hh*.38,d/2+.02);door.scale.x=.55;
    const trim=new THREE.Mesh(new THREE.BoxGeometry(w*.36,hh*.68,.06),new THREE.MeshStandardMaterial({color:red,roughness:.95}));trim.position.set(0,hh*.36,d/2+.04);trim.scale.x=.55;
    g.add(wall,roof,door,trim);g.position.set(x,-.05,PZ0-3.4);g.rotation.y=rot;g.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true}});H.add(g)}
  const trunkM=new THREE.MeshStandardMaterial({color:'#e8e2d6',roughness:.9}),leafM=[new THREE.MeshStandardMaterial({color:'#d9a441',roughness:.9}),new THREE.MeshStandardMaterial({color:'#c46a2e',roughness:.9})];
  for(let i=0;i<12;i++){const x=R01(-16,16),z=PZ0-R01(6,10),h=R01(4,7);const t=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,h,8),trunkM);t.position.set(x,h/2-.3,z);H.add(t);
    const c=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(1.4,2.2),2),leafM[i%2]);c.position.set(x,h,z);c.scale.y=1.3;c.castShadow=true;H.add(c)}
  // --- the rowboat with Å
  harbBoat=new THREE.Group();
  {const hullM=new THREE.MeshStandardMaterial({color:'#f4efe6',roughness:.6}),inM=new THREE.MeshStandardMaterial({map:tex(woodTex2('#b08458','#7a5434'),[2,1]),roughness:.9,side:THREE.BackSide});
   const hull=new THREE.Mesh(new THREE.SphereGeometry(1,40,20,0,Math.PI*2,Math.PI/2,Math.PI/2),hullM);hull.scale.set(.75,.42,1.6);hull.castShadow=true;
   const inner=new THREE.Mesh(new THREE.SphereGeometry(.97,40,20,0,Math.PI*2,Math.PI/2,Math.PI/2),inM);inner.scale.set(.75,.42,1.6);
   const stripe=new THREE.Mesh(new THREE.TorusGeometry(1,.035,8,64),new THREE.MeshStandardMaterial({color:'#c23a2b',roughness:.6}));stripe.rotation.x=Math.PI/2;stripe.scale.set(.75,1.6,1);stripe.position.y=-.03;
   const rim_=new THREE.Mesh(new THREE.TorusGeometry(1,.03,8,64),new THREE.MeshStandardMaterial({color:'#7a5434',roughness:.8}));rim_.rotation.x=Math.PI/2;rim_.scale.set(.75,1.6,1);
   const seatM=new THREE.MeshStandardMaterial({map:tex(woodTex2('#a77b50'),[1,1]),roughness:.9});
   for(const z of[-.7,.75]){const s=new THREE.Mesh(new THREE.BoxGeometry(1.3,.05,.28),seatM);s.position.set(0,-.14,z);harbBoat.add(s)}
   for(const s of[-1,1]){const oar=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,2.2,8),seatM);oar.rotation.x=Math.PI/2;oar.rotation.z=s*.12;oar.position.set(s*.45,-.08,.1);const bl=new THREE.Mesh(new THREE.BoxGeometry(.03,.16,.5),seatM);bl.position.set(s*.45,-.08,1.15);harbBoat.add(oar,bl)}
   harbBoat.add(hull,inner,stripe,rim_)}
  // Å: a yellow wooden A with a ring on top, two eyes and a smile
  harbA=new THREE.Group();
  {const yM=new THREE.MeshStandardMaterial({color:'#f2c230',roughness:.55});const sh=new THREE.Shape();
   sh.moveTo(-.42,0);sh.lineTo(-.1,1.0);sh.lineTo(.1,1.0);sh.lineTo(.42,0);sh.lineTo(.24,0);sh.lineTo(.16,.26);sh.lineTo(-.16,.26);sh.lineTo(-.24,0);sh.closePath();
   const hole=new THREE.Path();hole.moveTo(-.1,.42);hole.lineTo(0,.76);hole.lineTo(.1,.42);hole.closePath();sh.holes.push(hole);
   const A=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.16,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:3}),yM);A.position.z=-.08;A.castShadow=true;
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.12,.04,12,32),yM);ring.position.y=1.22;ring.castShadow=true;
   const wM=new THREE.MeshStandardMaterial({color:'#fff',roughness:.3,emissive:new THREE.Color('#fff'),emissiveIntensity:.25}),bM=new THREE.MeshStandardMaterial({color:'#1d1412',roughness:.2});
   for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.07,16,12),wM);e.position.set(s*.07,.86,.11);e.scale.z=.5;const p=new THREE.Mesh(new THREE.SphereGeometry(.035,12,8),bM);p.position.set(s*.07,.85,.15);harbA.add(e,p)}
   const smile=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,6,16,Math.PI),bM);smile.rotation.z=Math.PI;smile.position.set(0,.18,.12);
   const sm=smile.clone();sm.position.set(0,.33,.11);sm.scale.setScalar(.9);
   harbA.add(A,ring,sm)}
  harbA.position.set(0,-.12,-.1);harbA.scale.setScalar(.9);harbBoat.add(harbA);
  harbBoat.position.set(14,-.48,-1.0);harbBoat.rotation.y=Math.PI*.5;H.add(harbBoat);
  // the Meshy boat (with its own Å) replaces the built one when it has loaded
  load('boat.glb').then(g=>{const m=g.scene;m.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true}});
    const bx=new THREE.Box3().setFromObject(m),sz=bx.getSize(new THREE.Vector3());m.scale.multiplyScalar(2.6/Math.max(sz.x,sz.z));
    const b2=new THREE.Box3().setFromObject(m);m.rotation.y=sz.x>sz.z?Math.PI/2:0;m.position.y=-b2.min.y-.28;
    harbBoat.clear();harbBoat.add(m);harbA=null}).catch(()=>{});
  // two buckets on the pier, O (red) and U (blue), with the letter painted on
  const mkBucket=(L,col,x)=>{const g=new THREE.Group();g.name='bucket_'+L;
    const lt=tex(canvas(256,128,(c,w,h)=>{c.fillStyle=col;c.fillRect(0,0,w,h);c.fillStyle='#fff8ec';c.font='900 96px Nunito, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(L,w*.25,h*.55);c.fillText(L,w*.75,h*.55)}),[1,1]);
    const b=new THREE.Mesh(new THREE.CylinderGeometry(.15,.11,.24,32,1,true),new THREE.MeshStandardMaterial({map:lt,roughness:.5,side:THREE.DoubleSide}));b.position.y=.12;
    const bottom=new THREE.Mesh(new THREE.CircleGeometry(.11,32),new THREE.MeshStandardMaterial({color:col}));bottom.rotation.x=-Math.PI/2;bottom.position.y=.005;
    const handle=new THREE.Mesh(new THREE.TorusGeometry(.15,.008,6,32,Math.PI),new THREE.MeshStandardMaterial({color:'#8c8c8c',metalness:.6,roughness:.4}));handle.position.y=.24;
    g.add(b,bottom,handle);g.traverse(o=>{if(o.isMesh)o.castShadow=true});g.position.set(x,0,-.55);g.rotation.y=-Math.PI/2;g.scale.setScalar(.72);g.visible=false;H.add(g);return g};
  bucketO=mkBucket('O','#c94b3a',-.42);bucketU=mkBucket('U','#3f74b8',.12);
  const hg=[];try{for(const gl of gulls.slice(0,3)){const c=gl.clone();H.add(c);hg.push(c)}}catch(e){}
  // waves move, the boat bobs
  (function tick(now){requestAnimationFrame(tick);if(scene!==harbS)return;const t=now/1000;if(wm.userData.sh)wm.userData.sh.uniforms.uT.value=t;
    if(harbBoat){harbBoat.position.y=-.48+Math.sin(t*1.3)*.035;harbBoat.rotation.z=Math.sin(t*1.1)*.035;harbBoat.rotation.x=Math.sin(t*.9)*.02;
      if(harbA)harbA.rotation.y=Math.sin(t*.7)*.15}
    hg.forEach((c,i)=>{const a=t*.22+i*2.1,r=5+i*1.5;c.position.set(Math.cos(a)*r+1,4+i*.7+Math.sin(a*2)*.4,-4+Math.sin(a)*r*.6);c.rotation.y=-a+Math.PI})})(0);
}
const HARB_CAM=[new THREE.Vector3(-.28,.36,.95),new THREE.Vector3(.3,.13,-.4)];
function putSiiliHarbor(){SIILI_CLIP.length=0;harbS.add(siili);siili.position.set(.15,0,-.25);siili.rotation.y=.3;yawTarget=null}
async function toHarbor(){buildHarbor();setMusic('home');await fadeTo(harbS);putSiiliHarbor();cam.position.copy(HARB_CAM[0]);camLook.copy(HARB_CAM[1])}
function boatTo(x,z,ms){const p0=harbBoat.position.clone();const t0=performance.now();return new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);harbBoat.position.x=p0.x+(x-p0.x)*e;harbBoat.position.z=p0.z+(z-p0.z)*e;if(k<1)requestAnimationFrame(s);else r()})()})}
async function boatIn(){harbBoat.position.set(12,-.48,-1.6);harbBoat.rotation.y=Math.PI*.5;sfx('rustle',.25);await boatTo(2.3,-1.5,5200);
  const r0=harbBoat.rotation.y,t0=performance.now();await new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/1200);harbBoat.rotation.y=r0+(0-r0)*(k*k*(3-2*k));if(k<1)requestAnimationFrame(s);else r()})()})}

/* words and pictures */
const PAIRS2=[['pum','pom'],['hups','hops'],['ruska','roska'],['pulkka','polkka'],['joo','juu'],['kuppi','koppi'],['sukka','sokko']];
const W2={pum:{e:'💥',s:'pang!'},pom:{e:'🥁',s:'bom!'},hups:{e:'🙊',s:'hoppsan'},hops:{e:'🦘',s:'hopp'},ruska:{e:'🍂',s:'höstlöv'},roska:{e:'🗑️',s:'skräp'},
  pulkka:{e:'🛷',s:'pulka'},polkka:{e:'💃',s:'polka'},joo:{e:'👍',s:'ja'},juu:{e:'👌',s:'ja'},kuppi:{e:'☕',s:'kopp'},koppi:{e:'🐶',s:'hundkoja'},sukka:{e:'🧦',s:'strumpa'},sokko:{e:'🙈',s:'blindbock'}};
const IMG2=new Set(['ruska','roska','pulkka','polkka','kuppi','koppi','sukka','sokko']);
const pic2=w=>IMG2.has(w)?`<img src="img2/${w}.webp" alt="" style="width:110px;height:110px;object-fit:cover;border-radius:14px;display:block;margin:0 auto">`:W2[w].e;
const MEAN2={ruska:'m-ruska',roska:'m-roska',pulkka:'m-pulkka',polkka:'m-polkka',kuppi:'m-kuppi',koppi:'m-koppi',sukka:'m-sukka',sokko:'m-sokko',joo:'m-joojuu',juu:'m-joojuu'};
const OU2={kolo:{b:'O',sv:'hål',e:'🕳️'},kori:{b:'O',sv:'korg',e:'🧺'},mopo:{b:'O',sv:'moped',e:'🛵'},kulta:{b:'U',sv:'guld',e:'🪙'},mummi:{b:'U',sv:'mormor',e:'👵'},puu:{b:'U',sv:'träd',e:'🌳'},hui:{b:'U',sv:'hu!',e:'👻'}};
const MOVES2={suit:{t:'Suit sait',a:'wave'},hissun:{t:'Hissun kissun',a:'clap'},hopo:{t:'Höpö löpö',a:'shake'},mukkelis:{t:'Mukkelis makkelis',a:'jump'},
  sikin:{t:'Sikin sokin',a:'scared'},kipin:{t:'Kipin kapin',a:'run'},kiikun:{t:'Kiikun kaakun',a:'bow'},nippa:{t:'Nippa nappa',a:'thumbs'}};

/* part 0: the boat comes */
async function c2Boat(){
  await toHarbor();bucketO.visible=bucketU.visible=false;harbBoat.position.set(14,-.48,-1.6);
  play('wave');await say('c2-01');face(new THREE.Vector3(6,0,-1.5));
  const bp=boatIn();await sleep(1200);play('point');await say('c2-02');await bp;
  camTo(new THREE.Vector3(-.4,.48,.9),new THREE.Vector3(1.0,.3,-.8),1500);
  face(harbBoat.position);play('scared');await say('c2-03');
  play('shake');await say('c2-04');showWord('O ja U','finskan har inget Å');
  ask('Klicka på båten och säg åt Å att stanna där!');
  await waitPick(h=>h.some(x=>{let o=x.object;while(o){if(o===harbBoat)return true;o=o.parent}return false})?true:undefined);ask('');
  play('nod');await say('c2-05');play('think');await say('c2-06');
  play('happy');await say('c2-07');showWord('O','låter som Å');play('happy');await say('c2-08');showWord('U','låter som O');
  camTo(HARB_CAM[0],HARB_CAM[1],1400);face(cam.position);
}
/* part 1: which word of the pair */
async function c2Listen(){
  if(scene!==harbS){await toHarbor()}
  setMusic('search');play('think');await say('c2-09a');await say('c2-09');
  const rounds=shuffle(PAIRS2).slice(0,6);
  for(const pr of rounds){const ans=rnd(pr);ask('Vilket ord säger Siili?');const replay=()=>say('w-'+ans,{sub:false});await replay();let tries=0;
    const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=()=>replay();
    for(;;){const {o,b}=await cardsChoice(shuffle(pr).map(w=>({t:w,e:pic2(w),s:W2[w].s,w})));
      if(o.w===ans){clearCards();hb.style.display='none';ask('');play('happy');showWord(ans,W2[ans].s);learn(ans);addPaws(tries?1:3);if(MEAN2[ans])await say(MEAN2[ans]);else await praise();break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await say(rnd(OOPS));await replay()}
  }
  $('#hint').textContent='?';
}
/* part 2: O-bucket or U-bucket */
async function c2Buckets(){
  if(scene!==harbS){await toHarbor()}
  bucketO.visible=bucketU.visible=true;siili.position.set(-.15,0,-.2);face(cam.position);
  camTo(new THREE.Vector3(-.18,.42,.62),new THREE.Vector3(-.15,.08,-.45),1200);
  play('present');await say('c2-b01');await say('c2-b02');await say('c2-b03');
  const words=shuffle(Object.keys(OU2)).slice(0,6);
  const isIn=(h,g)=>h.some(x=>{let o=x.object;while(o){if(o===g)return true;o=o.parent}return false});
  for(const w of words){ask('O eller U? Klicka på rätt hink!');const replay=()=>say('w-'+w,{sub:false});await replay();let tries=0;
    const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=()=>replay();
    for(;;){const pick=await waitPick(h=>isIn(h,bucketO)?'O':isIn(h,bucketU)?'U':undefined);
      const g=pick==='O'?bucketO:bucketU;g.position.y=.05;setTimeout(()=>g.position.y=0,180);
      if(pick===OU2[w].b){hb.style.display='none';ask('');play('happy');await say(pick==='O'?'c2-okO':'c2-okU');showWord(w,OU2[w].sv);learn(w);addPaws(tries?1:3);await say('m-'+w);break}
      sfx('wrong',.4);tries++;play('shake');await say('c2-again');await replay()}
  }
  $('#hint').textContent='?';
}
/* part 3: movement words */
async function c2Moves(){
  if(scene!==harbS){await toHarbor()}
  bucketO.visible=bucketU.visible=false;siili.position.set(.15,0,-.25);face(cam.position);camTo(HARB_CAM[0],HARB_CAM[1],1000);
  setMusic('home');await say('c2-move');
  const keys=shuffle(Object.keys(MOVES2));
  // show four
  for(const k of keys.slice(0,4)){play(MOVES2[k].a);showWord(MOVES2[k].t,'',2000);await say('r-'+k);await sleep(500);play('idle',.3)}
  // then guess: Siili moves without saying
  for(const k of shuffle(keys.slice(0,4))){play(MOVES2[k].a);await sleep(300);await say('c2-which');ask('Vilket ordpar gör Siili?');let tries=0;
    const opts=shuffle([k,...shuffle(keys.filter(x=>x!==k)).slice(0,2)]).map(x=>({t:MOVES2[x].t,e:'🦔',k:x}));
    for(;;){const {o,b}=await cardsChoice(opts);if(o.k===k){clearCards();ask('');play(MOVES2[k].a);await say('r-'+k);learn(MOVES2[k].t);addPaws(tries?1:3);await praise();break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play(MOVES2[k].a);await say(rnd(OOPS))}
    play('idle',.3)}
}
/* part 4: Siili reads Swedish with Finnish eyes */
async function c2Read(){
  if(scene!==harbS){await toHarbor()}
  play('present');await say('c2-c01');
  const R=[{say:'c2-c02',w:'bok',e:'📖',after:['c2-c03','c2-c04']},{say:'c2-c05',w:'ko',e:'🐄',after:['c2-c06']},{say:'c2-c07',w:'solen',e:'☀️',after:['c2-c08']}];
  const all=[{t:'bok',e:'📖'},{t:'ko',e:'🐄'},{t:'solen',e:'☀️'}];
  for(const r of R){play('present');await say(r.say);ask('Siili läste fel! Vad står det egentligen?');let tries=0;
    for(;;){const {o,b}=await cardsChoice(shuffle(all).map(x=>({...x,s:''})));if(o.t===r.w){clearCards();ask('');play('think');for(const a of r.after)await say(a);play('happy');showWord(r.w,'');addPaws(tries?1:3);break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await say(rnd(OOPS));await say(r.say)}}
  play('think');await say('c2-c09');
}
/* part 5: evening on the pier */
async function c2Evening(){
  if(scene!==harbS){await toHarbor()}
  setMusic('evening');bucketO.visible=bucketU.visible=false;
  play('clap');await say('c2-ramsa');play('idle');await say('c2-say');await say('c2-ramsa2');
  for(const pr of shuffle(PAIRS2).slice(0,3)){const ans=rnd(pr);ask('Vilket ord säger Siili?');await say('w-'+ans,{sub:false});
    for(;;){const {o,b}=await cardsChoice(shuffle(pr).map(w=>({t:w,e:pic2(w),s:W2[w].s,w})));if(o.w===ans){clearCards();ask('');play('happy');addPaws(2);await praise();break}b.classList.add('wrong');sfx('wrong',.4);await say('w-'+ans,{sub:false})}}
  face(harbBoat.position);play('wave');await say('c2-bye');boatTo(14,-1.6,7000);await sleep(1500);
  face(cam.position);play('happy');await say('c2-thanks');play('curl');await say('c2-night');ask('Siili sover på bryggan. Hyvää yötä!');await sleep(2500);
  st.stickers2=true;save();
}
const PARTS2=[{n:'Båten kommer',d:'Å vill i land',f:c2Boat},{n:'Kuuntele!',d:'Vilket ord hör du?',f:c2Listen},{n:'O vai U?',d:'Två hinkar',f:c2Buckets},
  {n:'Siili säger, Siili gör',d:'Rörelseorden',f:c2Moves},{n:'Siili läser svenska',d:'Med finska ögon',f:c2Read},{n:'Hissun kissun',d:'Kvällen på bryggan',f:c2Evening}];
const CHS=[{n:'Kapitel 1 · Jee!',h:'Jee!',sub:'Kapitel 1 · Siilis hem',P:PARTS,key:'done'},{n:'Kapitel 2 · O ja U',h:'O ja U',sub:'Kapitel 2 · Bryggan i hamnen',P:PARTS2,key:'done2'}];
let curCh=0;
