/* ================= Osa 3 · Kapitel 12 · Eikä ole! – orienteringen i skogen (2026-11-15) =================
   Nine parts, same pattern as chapter 11: repetition at the start of part 3–8, a word counts as learnt after two
   first-try answers, the test keeps asking until everything has been right twice.
   Lines: p12a-/p12b-/p12c- (Siili), q12- (Orava), p12f-NN + p12f-NNs (Siili tells, then says it his way in Swedish),
   w12-<ord> (single opposites, cut from the pair lines). Lines with f:null are shown as text until recorded.
   Pictures in img11/ (o- opposites, f- feelings, m- things). */
const P12A=i=>'p12a-'+nn(i),P12B=i=>'p12b-'+nn(i),P12C=i=>'p12c-'+nn(i),Q12=i=>'q12-'+nn(i),F12=i=>'p12f-'+nn(i);
st.m12??={};st.r12??=[];
function hit12(k,tries){st.m12[k]=(st.m12[k]||0)+(tries?0:1);if(!st.r12.includes(k))st.r12.push(k);save()}
const POOL12={};
async function review12(n=3){const keys=st.r12.filter(k=>POOL12[k]);if(keys.length<3)return;showWord('Kertaus!','repetition',1600);await sleep(900);
  for(const k of shuffle(keys).slice(0,n))await POOL12[k]()}
const sayW12=w=>say('w12-'+w,{sub:false});
async function tell12(i){await say(F12(i));if(has6(F12(i)+'s'))await say(F12(i)+'s',{sub:false});await sleep(200)}

/* ---------- the words of the chapter ---------- */
const OPP12=[ // the seven pairs on page 57; l = the pair line in 12A
  {a:'kaunis',b:'ruma',sa:'vacker',sb:'ful',ia:'o-kaunis',ib:'o-ruma',l:22},
  {a:'lyhyt',b:'pitkä',sa:'kort',sb:'lång',ia:'o-lyhyt',ib:'o-pitka',l:23},
  {a:'hyvä',b:'huono',sa:'bra',sb:'dålig',ia:'o-hyva',ib:'o-huono',l:24},
  {a:'oikein',b:'väärin',sa:'rätt',sb:'fel',ia:'o-oikein',ib:'o-vaarin',l:25},
  {a:'helppo',b:'vaikea',sa:'lätt',sb:'svår',ia:'o-helppo',ib:'o-vaikea',l:26},
  {a:'iso',b:'pieni',sa:'stor',sb:'liten',ia:'o-iso',ib:'o-pieni',l:27},
  {a:'kuuma',b:'kylmä',sa:'varm',sb:'kall',ia:'o-kuuma',ib:'o-kylma',l:28}];
const OPP12B=[ // Lisää: the map (page 61); l = the pair line in 12C
  {a:'likainen',b:'puhdas',sa:'smutsig',sb:'ren',ia:'o-likainen',ib:'o-puhdas',l:1},
  {a:'matala',b:'korkea',sa:'låg',sb:'hög',ia:'o-matala',ib:'o-korkea',l:2},
  {a:'kevyt',b:'painava',sa:'lätt',sb:'tung',ia:'o-kevyt',ib:'o-painava',l:3},
  {a:'valkoinen',b:'musta',sa:'vit',sb:'svart',ia:null,ib:null,l:4},
  {a:'auki',b:'kiinni',sa:'öppen',sb:'stängd',ia:'o-auki',ib:'o-kiinni',l:5},
  {a:'täynnä',b:'tyhjä',sa:'full',sb:'tom',ia:'o-taynna',ib:'o-tyhja',l:6},
  {a:'leveä',b:'kapea',sa:'bred',sb:'smal',ia:'o-levea',ib:'o-kapea',l:7},
  {a:'hidas',b:'nopea',sa:'långsam',sb:'snabb',ia:'o-hidas',ib:'o-nopea',l:8},
  {a:'vanha',b:'uusi',sa:'gammal',sb:'ny',ia:'o-vanha',ib:'o-uusi',l:9},
  {a:'ylös',b:'alas',sa:'upp',sb:'ner',ia:null,ib:null,l:10}];
const ALLOPP12=OPP12.concat(OPP12B);
const oppOf12=w=>{for(const p of ALLOPP12){if(p.a===w)return p.b;if(p.b===w)return p.a}};
const svOf12=w=>{for(const p of ALLOPP12){if(p.a===w)return p.sa;if(p.b===w)return p.sb}};
const WORD12=[{k:'metsä',sv:'skog',l:12},{k:'ilma',sv:'väder',l:13},{k:'matka',sv:'sträcka',l:14},{k:'tehtävä',sv:'uppgift',l:15},{k:'kivi',sv:'sten',l:16,img:'m-kivi'},
  {k:'käärme',sv:'orm',l:17},{k:'mato',sv:'mask',l:18,img:'o-pitka'},{k:'tänään',sv:'i dag',l:19},{k:'missä',sv:'var',l:20},{k:'maali',sv:'mål',l:21}];
const SEN12=[ // page 58; l = line in 12B
  {l:11,fi:'Tänään on kaunis ilma.',sv:'I dag är det vackert väder.',img:'o-aurinko'},{l:12,fi:'Huomenna on ruma ilma.',sv:'I morgon är det fult väder.',img:'o-sade'},
  {l:13,fi:'Metsä on vihreä.',sv:'Skogen är grön.'},{l:14,fi:'Tuolla on iso kivi.',sv:'Där borta är en stor sten.',img:'m-kivi'},
  {l:15,fi:'Missä käärme on?',sv:'Var är ormen?'},{l:16,fi:'Onko matka pitkä?',sv:'Är det långt?'},
  {l:17,fi:'Tämä on lyhyt mato.',sv:'Det här är en kort mask.',img:'o-lyhyt'},{l:18,fi:'Tämä on vaikea tehtävä.',sv:'Det här är en svår uppgift.',img:'o-vaikea'},
  {l:19,fi:'Mato on pitkä.',sv:'Masken är lång.',img:'o-pitka'},{l:20,fi:'Kivi on pieni.',sv:'Stenen är liten.'},
  {l:21,fi:'Aurinko on iso ja kuuma.',sv:'Solen är stor och varm.',img:'m-aurinko'},{l:22,fi:'Jäätelö on kylmä.',sv:'Glassen är kall.'},
  {l:23,fi:'Tehtävä on helppo.',sv:'Uppgiften är lätt.',img:'o-helppo'}];
const FEEL12=[{k:'iloinen',sv:'glad',img:'f-iloinen',l:13},{k:'vihainen',sv:'arg',img:'f-vihainen',l:14},{k:'surullinen',sv:'ledsen',img:'f-surullinen',l:15},
  {k:'hämmästynyt',sv:'förvånad',img:'f-hammastynyt',l:16},{k:'uninen',sv:'sömnig',img:'f-uninen',l:17},{k:'pelästynyt',sv:'rädd',img:'f-pelastynyt',l:18}];
const cardImg12=n=>({t:'',e:pic11(n,92)});

/* ---------- the forest: orienteering controls, a big stone, a lake behind the trees ---------- */
const forS=new THREE.Scene();let forBuilt=false;const flags12=[];let mato12=null,sq12=null,stone12=null,finish12=null;
const RASTI12=[[.62,-.62],[1.45,-1.55],[.5,-2.7],[-.85,-2.35],[-1.75,-1.25],[-1.45,.05],[-.55,-1.15],[.95,.25]];
function mossTex12(){return tex(canvas(512,512,(g,W,H)=>{g.fillStyle='#5d7a3a';g.fillRect(0,0,W,H);
  for(let i=0;i<9000;i++){g.fillStyle=`rgba(${rnd(['40,70,25','120,150,60','160,130,70','80,110,40','190,170,90'])},${R01(.08,.3)})`;g.fillRect(Math.random()*W,Math.random()*H,R01(1,3),R01(2,6))}
  for(let i=0;i<700;i++){g.strokeStyle=`rgba(150,100,50,${R01(.2,.45)})`;g.lineWidth=1;g.beginPath();const x=Math.random()*W,y=Math.random()*H,a=R01(0,6);g.moveTo(x,y);g.lineTo(x+Math.cos(a)*7,y+Math.sin(a)*7);g.stroke()}}),[22,22])}
function spruce12(S,x,z,h){const G=new THREE.Group();const tr=new THREE.Mesh(new THREE.CylinderGeometry(h*.022,h*.035,h*.35,8),M6('#5a4232'));tr.position.y=h*.17;G.add(tr);
  const cols=['#2f5a34','#365f37','#28502e','#3a6a3a'];for(let i=0;i<5;i++){const r=h*(.3-i*.05),hh=h*.3;const c=new THREE.Mesh(new THREE.ConeGeometry(r,hh,10),M6(rnd(cols),{roughness:.95}));c.position.y=h*.2+i*h*.14+hh/2;c.rotation.y=R01(0,3);G.add(c)}
  G.position.set(x,0,z);G.rotation.y=R01(0,6);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G);return G}
function pine12(S,x,z,h){const G=new THREE.Group();const tr=new THREE.Mesh(new THREE.CylinderGeometry(h*.018,h*.028,h*.8,8),M6('#a0603a',{roughness:.9}));tr.position.y=h*.4;G.add(tr);
  for(let k=0;k<5;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(h*R01(.1,.15),1),M6(rnd(['#3f6a32','#4a7438','#36602c']),{roughness:.95}));c.scale.y=.6;c.position.set(R01(-.12,.12)*h,h*R01(.78,.95),R01(-.12,.12)*h);G.add(c)}
  G.position.set(x,0,z);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G);return G}
function birch12(S,x,z,h){const G=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(h*.015,h*.024,h,10),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(64,256,(g,W,H)=>{g.fillStyle='#ece6da';g.fillRect(0,0,W,H);g.fillStyle='#2a2522';for(let k=0;k<26;k++)g.fillRect(R01(0,W),R01(0,H),R01(8,26),R01(2,5))}))}));t.position.y=h/2;G.add(t);
  for(let k=0;k<5;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(h*R01(.13,.2),1),M6(rnd(['#7fae4a','#6a9a3a','#9cc25a']),{roughness:.9}));c.position.set(R01(-.15,.15)*h,h*R01(.75,1),R01(-.15,.15)*h);G.add(c)}
  G.position.set(x,0,z);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G);return G}
let _rockT12=null;function rockTex12(){return _rockT12??=tex(canvas(256,256,(g,W,H)=>{g.fillStyle='#fff';g.fillRect(0,0,W,H);for(let i=0;i<2500;i++){g.fillStyle=`rgba(${rnd(['60,60,55','120,120,110','90,100,70'])},${R01(.05,.25)})`;g.fillRect(Math.random()*W,Math.random()*H,R01(1,4),R01(1,4))}for(let i=0;i<14;i++){g.fillStyle='rgba(110,130,70,.35)';g.beginPath();g.arc(Math.random()*W,Math.random()*H,R01(6,20),0,7);g.fill()}}),[2,2])}
function rock12(S,x,z,r,col='#8a8a84'){const geo=new THREE.IcosahedronGeometry(r,3);const p=geo.attributes.position;const s0=R01(0,9);const nz=(a,b,c)=>Math.sin(a*14/r+b*9/r+s0)*Math.cos(c*12/r+a*5/r+s0)+.5*Math.sin(b*23/r+c*17/r);
  const c=new Float32Array(p.count*3);for(let i=0;i<p.count;i++){const X=p.getX(i),Y=p.getY(i),Z=p.getZ(i);const n=nz(X,Y,Z);const k=1+.07*n;p.setXYZ(i,X*k,Y*k,Z*k);const v=.9+.1*n,m=Y>r*.4&&n>.3;c[i*3]=m?v*.8:v;c[i*3+1]=v;c[i*3+2]=m?v*.75:v*.97}
  geo.setAttribute('color',new THREE.BufferAttribute(c,3));geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:col,roughness:.9,vertexColors:true}));m.scale.set(1,.7,.9);m.position.set(x,r*.45,z);m.rotation.y=R01(0,6);m.castShadow=m.receiveShadow=true;S.add(m);return m}
function flag12(n){const G=new THREE.Group();const stake=new THREE.Mesh(new THREE.CylinderGeometry(.006,.008,.44,8),M6('#8a6a48'));stake.position.y=.22;G.add(stake);
  const fm=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,roughness:.8,map:tex(canvas(128,128,(g,W,H)=>{g.fillStyle='#fbfaf4';g.fillRect(0,0,W,H);g.fillStyle='#f07a1a';g.beginPath();g.moveTo(W,0);g.lineTo(W,H);g.lineTo(0,H);g.fill()}))});
  for(let i=0;i<3;i++){const a=i/3*Math.PI*2;const p=new THREE.Mesh(new THREE.PlaneGeometry(.1,.1),fm);p.position.set(Math.sin(a)*.029,.38,Math.cos(a)*.029);p.rotation.y=a;p.castShadow=true;G.add(p)}
  const plate=new THREE.Mesh(new THREE.PlaneGeometry(.06,.04),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:tex(canvas(120,80,(g,W,H)=>{g.fillStyle='#fff';g.fillRect(0,0,W,H);g.strokeStyle='#333';g.lineWidth=4;g.strokeRect(2,2,W-4,H-4);g.fillStyle='#222';g.font='800 56px "Baloo 2", sans-serif';g.textAlign='center';g.fillText(String(n),W/2,62)}))}));
  plate.position.set(0,.29,.012);G.add(plate);G.userData.plate=plate;return G}
function buildForest12(){if(forBuilt)return;forBuilt=true;const S=forS;S.background=outS.background;S.fog=new THREE.FogExp2('#cfdcc0',.05);
  lightRoom6(S,{sky:'#d8e6f6',ground:'#5a6a30',hemi:1.2,key:'#fff0c8',keyI:3.2,keyPos:[-3,6,2.5],shadow:3.2});
  const gr=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({map:mossTex12(),roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;S.add(gr);
  // the path from the start through the forest
  {const pm=new THREE.MeshStandardMaterial({color:'#a88a5c',roughness:1,transparent:true,opacity:.85});for(let i=0;i<26;i++){const t=i/25;const x=Math.sin(t*5)*.7-.1,z=.6-t*6;const d=new THREE.Mesh(new THREE.CircleGeometry(R01(.16,.22),16),pm);d.rotation.x=-Math.PI/2;d.scale.y=1.6;d.rotation.z=Math.cos(t*5)*.5;d.position.set(x,.002+i*.0001,z);d.receiveShadow=true;S.add(d)}}
  // the lake behind the trees
  {const lake=new THREE.Mesh(new THREE.CircleGeometry(4,40),new THREE.MeshStandardMaterial({color:'#5b8db8',roughness:.15,metalness:.2}));lake.rotation.x=-Math.PI/2;lake.scale.y=.45;lake.position.set(-1.5,.004,-7.5);S.add(lake)}
  // trees: spruces, pines, birches – kept away from the controls and the camera
  const near=(x,z)=>RASTI12.some(([a,b])=>Math.hypot(a-x,b-z)<.45)||Math.hypot(x,z-.3)<.75||(z>-1&&Math.abs(x)<.9)||(z>-2.6&&Math.abs(x)<.75);
  for(let i=0;i<90;i++){const x=R01(-7,7),z=R01(-9,1.4);if(near(x,z))continue;const r=Math.random();const h=R01(1.6,3.4);
    if(r<.5)spruce12(S,x,z,h);else if(r<.75)pine12(S,x,z,h*1.1);else birch12(S,x,z,h*.85)}
  // blueberry shrubs and small stones
  for(let i=0;i<70;i++){const x=R01(-3,3),z=R01(-4,1);if(Math.hypot(x,z)<.35)continue;const b=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(.03,.06),1),M6(rnd(['#3f6a2c','#4c7a34','#2f5a26']),{roughness:.95}));b.scale.y=.6;b.position.set(x,.02,z);b.castShadow=true;S.add(b);
    if(Math.random()<.4){const be=new THREE.Mesh(new THREE.SphereGeometry(.006,6,4),M6('#2a3a8a',{roughness:.3}));be.position.set(x+R01(-.02,.02),.04,z+R01(-.02,.02));S.add(be)}}
  for(let i=0;i<24;i++){const x=R01(-3,3),z=R01(-4,1);if(Math.hypot(x,z)<.4)continue;rock12(S,x,z,R01(.02,.07))}
  // the big stone (iso kivi), left of the start
  stone12=rock12(S,-.62,-.5,.26,'#8d8c86');
  // eight controls and the finish
  RASTI12.forEach(([x,z],i)=>{const f=flag12(i+1);f.position.set(x,0,z);f.rotation.y=Math.atan2(-x,1.2-z)*.6;S.add(f);flags12.push(f)});
  {const G=new THREE.Group();const pm=M6('#f4efe6');for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.62,8),pm);p.position.set(s*.32,.31,0);G.add(p)}
    const ban=new THREE.Mesh(new THREE.PlaneGeometry(.66,.13),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:tex(canvas(660,130,(g,W,H)=>{g.fillStyle='#f07a1a';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.font='800 96px "Baloo 2", sans-serif';g.textAlign='center';g.fillText('MAALI',W/2,100)}))}));ban.position.y=.58;G.add(ban);
    G.position.set(.15,0,-.55);G.visible=false;S.add(G);finish12=G}
  motes6(S,0,.8,-1,2.5,.7,2,120,'#fff4c8');
  // Orava and Mato
  (async()=>{sq12=await guest6('squirrel.glb','squirrel',.21);sq12.visible=false;S.add(sq12);
    const g=await optGLB6('mato.glb');if(g){const m=g.scene;m.traverse(o=>{if(o.isMesh)o.castShadow=o.receiveShadow=true});const bx=new THREE.Box3().setFromObject(m),sz=bx.getSize(new THREE.Vector3());m.scale.multiplyScalar(.5/Math.max(sz.x,sz.y,sz.z));
      const b2=new THREE.Box3().setFromObject(m);m.position.y-=b2.min.y;mato12=new THREE.Group();const piv=new THREE.Group();piv.add(m);mato12.add(piv);mato12.userData.piv=piv;mato12.userData.m=m;mato12.visible=false;S.add(mato12)}})();
  (function tick(now){requestAnimationFrame(tick);if(scene!==forS)return;const t=now/1000;if(sq12?.userData.mixer)sq12.userData.mixer.update(1/60);
    if(sq12?.userData.billboard||sq12?.userData.sprite)sq12.rotation.y=Math.atan2(cam.position.x-sq12.position.x,cam.position.z-sq12.position.z);
    if(mato12?.visible){const p=mato12.userData.piv,m=mato12.userData.m;p.rotation.y=Math.sin(t*1.3)*.18;m.scale.y=m.scale.x*(1+Math.sin(t*2.6)*.04);m.rotation.z=Math.sin(t*1.7)*.05}})(0)}
const FOR_CAM=[new THREE.Vector3(0,.32,.95),new THREE.Vector3(0,.13,-.4)];
async function toForest(){await goScene(forS,buildForest12,FOR_CAM[0],FOR_CAM[1],'search');putSiiliIn(forS,0,0,0);if(finish12)finish12.visible=false}
const camStone12=()=>camTo(new THREE.Vector3(-.15,.3,.45),new THREE.Vector3(-.55,.16,-.45),1100);
const camStart12=()=>camTo(FOR_CAM[0],FOR_CAM[1],1000);
async function orava12(on=true,x=-.3,z=-.02){for(let i=0;i<40&&!sq12;i++)await sleep(100);if(!sq12)return;if(!on){sq12.visible=false;return}if(sq12.visible)return;sq12.position.set(x,0,z);sq12.rotation.y=.4;sq12.visible=true;await hop6(sq12);guestAnim(sq12,/idle/)}
async function oravaSay12(i){if(sq12?.visible){hop6(sq12,350);guestAnim(sq12,/talk|wave|jump/)}await say(Q12(i))}
/* Siili runs to control i (0–7); the camera follows */
async function goRasti12(i){const [x,z]=RASTI12[i];const tgt=new THREE.Vector3(x+.14,0,z+.22);const camP=new THREE.Vector3(x+.1,.34,z+.95),camL=new THREE.Vector3(x,.16,z-.1);
  if(sq12)sq12.visible=false;camTo(camP,camL,1700);await walkTo(tgt,.45,.02);face(cam.position);await sleep(200)}
async function backToStart12(){camStart12();await walkTo(new THREE.Vector3(0,0,0),.45,.02);face(cam.position)}

/* ---------- a small orienteering map that Saga follows (Lisää A) ---------- */
(function(){const css=document.createElement('style');css.textContent=`
#map12{position:absolute;left:2vw;top:12vh;display:none;pointer-events:none;background:#fbf6e8;border-radius:18px;box-shadow:var(--shadow);padding:10px}
#map12 svg{width:min(34vh,280px);height:min(42vh,340px);display:block}
#map12 .lbl{font:800 13px 'Baloo 2';fill:#5a4232}`;document.head.append(css);
 const d=document.createElement('div');d.id='map12';(document.getElementById('ui')||document.body).append(d)})();
const MAPPTS12=[[40,300],[110,280],[60,230],[140,200],[80,160],[170,130],[110,95],[190,70],[130,40],[220,30]];
function drawMap12(k,words){const m=$('#map12');let s=`<svg viewBox="0 0 260 330"><rect x="0" y="0" width="260" height="330" rx="14" fill="#e9f0d8"/>`;
  for(let i=0;i<14;i++)s+=`<ellipse cx="${(i*67)%250+5}" cy="${(i*97)%320+5}" rx="26" ry="18" fill="#cfe0b0" opacity=".8"/>`;
  s+=`<path d="M${MAPPTS12.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="#c0392b" stroke-width="3" stroke-dasharray="6 5"/>`;
  MAPPTS12.forEach(([x,y],i)=>{const done=i<k,cur=i===k;s+=`<circle cx="${x}" cy="${y}" r="${cur?13:10}" fill="${done?'#9fd39b':cur?'#ffd36b':'#fff'}" stroke="#c0392b" stroke-width="3"/>`;
    if(words&&words[i]&&done)s+=`<text class="lbl" x="${x+15}" y="${y+5}">${words[i]}</text>`});
  const [fx,fy]=MAPPTS12[MAPPTS12.length-1];s+=`<text x="${fx-40}" y="${fy-12}" font-family="Baloo 2" font-weight="800" font-size="16" fill="#c0392b">MAALI</text></svg>`;m.innerHTML=s;m.style.display='block'}
{const _qa=qActive;qActive=function(){return _qa()||(()=>{const e=$('#map12');return e&&e.style.display==='block'})()}}

/* ---------- review questions (they only use pictures, so they work in any place) ---------- */
for(const p of OPP12){
  addR12('o-'+p.a,async()=>{showPic11(p.ia);const t=await mc11(shuffle([{t:p.a,ok:true},{t:p.b},{t:rnd(OPP12.filter(x=>x!==p)).a}]),{q:'Vad är det på finska?'});hidePic();showWord(p.a,p.sa,1300);hit12('o-'+p.a,t);addPaws(t?1:2)});
  addR12('o-'+p.b,async()=>{ask(`${p.a} ↔ ?`);const t=await mc11(shuffle([{t:p.b,ok:true},{t:p.a},{t:rnd(OPP12.filter(x=>x!==p)).b}]),{q:`Vad är motsatsen till ${p.a}?`});showWord(p.b,p.sb,1300);hit12('o-'+p.b,t);addPaws(t?1:2)})}
for(const w of WORD12.filter(w=>w.img))addR12('w-'+w.k,async()=>{showPic11(w.img);const t=await typeIt([w.k],'Skriv på finska: '+w.sv);hidePic();showWord(w.k,w.sv,1300);hit12('w-'+w.k,t);addPaws(t?1:2)});
for(const f of FEEL12)addR12('f-'+f.k,async()=>{showPic11(f.img);const t=await mc11(shuffle([{t:f.k,ok:true},...shuffle(FEEL12.filter(x=>x!==f)).slice(0,2).map(x=>({t:x.k}))]),{q:'Hur känner sig Siili?'});hidePic();showWord(f.k,f.sv,1300);hit12('f-'+f.k,t);addPaws(t?1:2)});
function addR12(k,f){POOL12[k]=f}

/* ================= Part 1 · Ut i skogen ================= */
async function c12Woods(){await toForest();setMusic('search');play('wave');await tr11(P12A(0));play('present');await tr11(P12A(1));play('jump');await tr11(P12A(2));
  showWord('metsä','skog',1600);await say(P12A(12),{sub:false});
  // the map and the first control
  play('present');showWord('kartta','karta',1800);await tr11(P12A(3));
  await camTo(new THREE.Vector3(.75,.3,.15),new THREE.Vector3(.62,.24,-.62),1200);showWord('rasti','kontroll',1800);await tr11(P12A(4));
  await camStart12();play('think');await tr11(P12A(5));play('point');face(new THREE.Vector3(...RASTI12[0].slice(0,1),0,RASTI12[0][1]));await tr11(P12A(6));face(cam.position);
  // the weather
  showPic11('o-aurinko','');await say(P12A(13),{sub:false});hidePic();showWord('ilma','väder',1600);
  let t=await mc11(shuffle([{t:'',e:pic11('o-aurinko',92),ok:true},{t:'',e:pic11('o-sade',92)}]),{q:'Tänään on kaunis ilma. Vilken bild?'});addPaws(t?1:3);
  // Orava jumps down from a tree
  sfx('rustle',.3);await orava12(true);play('happy');await oravaSay12(8);
  play('think');await tr11(P12A(7));await oravaSay12(2);play('shake');await tr11(P12A(30));
  // the new words, each with a picture or a short scene
  await camStone12();play('point');await tr11(P12A(8));showWord('kivi','sten',1500);await say(P12A(16),{sub:false});await camStart12();
  for(const w of [WORD12[0],WORD12[1],WORD12[2],WORD12[3],WORD12[4],WORD12[9]]){showWord(w.k,w.sv,1500);await say(P12A(w.l),{sub:false});await sleep(250)}
  // quick check, then writing
  for(const w of shuffle([WORD12[0],WORD12[1],WORD12[4],WORD12[9]])){ask('Lyssna! Vilket ord?');await rep11(()=>say(P12A(w.l),{sub:false}));
    const t=await mc11(shuffle([w,...shuffle(WORD12.filter(x=>x!==w)).slice(0,2)]).map(x=>({t:x.k,ok:x===w})),{onWrong:()=>say(P12A(w.l),{sub:false})});unrep11();hit12('w-'+w.k,t);addPaws(t?1:3)}
  for(const w of [WORD12[0],WORD12[4]]){if(w.img)showPic11(w.img);const t=await typeIt([w.k],'Skriv på finska: '+w.sv);hidePic();showWord(w.k,w.sv,1300);hit12('w-'+w.k,t);addPaws(t?1:3)}
  await orava12(false);await praise()}

/* ================= Part 2 · Motsatserna ================= */
async function c12Opp(){if(scene!==forS)await toForest();setMusic('home');
  // every pair: both pictures side by side while Siili says the pair
  for(const p of OPP12){showPic11(p.ia,p.a);await sleep(150);await say(P12A(p.l),{sub:false});showPic11(p.ib,p.b);showWord(p.a+' – '+p.b,p.sa+' – '+p.sb,2200);await sleep(1300);hidePic();await sleep(200)}
  // picture → word
  for(const p of shuffle(OPP12)){const which=rnd(['a','b']);const w=p[which],img=which==='a'?p.ia:p.ib,o=p[which==='a'?'b':'a'];showPic11(img);
    const t=await mc11(shuffle([{t:w,ok:true},{t:o},{t:rnd(OPP12.filter(x=>x!==p))[which]}]),{q:'Vilket ord passar bilden?'});hidePic();showWord(w,svOf12(w),1200);await sayW12(w);hit12('o-'+w,t);addPaws(t?1:3)}
  // Sano vastakohta! word → opposite
  play('point');await say(P12A(29),{sub:false});
  for(const p of shuffle(OPP12).slice(0,5)){const [w,o]=rnd([[p.a,p.b],[p.b,p.a]]);ask(w+'  ↔  ?');await sayW12(w);
    const t=await mc11(shuffle([{t:o,ok:true},{t:w},{t:rnd(OPP12.filter(x=>x!==p)).a}]),{q:`Motsatsen till ${w}?`});ask('');showWord(w+' – '+o,'',1500);hit12('o-'+o,t);addPaws(t?1:3)}
  // writing: Saga writes the opposite herself
  for(const p of shuffle(OPP12).slice(0,4)){showPic11(p.ib);const t=await typeIt([p.b],`Motsatsen till ${p.a}. Skriv på finska:`);hidePic();showWord(p.b,p.sb,1300);await sayW12(p.b);hit12('o-'+p.b,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 3 · Eikä ole! – who is right? ================= */
async function c12Contra(){if(scene!==forS)await toForest();await review12();setMusic('home');await orava12(true);
  play('think');await tr11(P12A(30));
  // Siili says something, Orava says the opposite, Saga looks and decides
  const R=[
    {s:()=>tr11(P12A(6)),o:0,show:async()=>{await camTo(new THREE.Vector3(.4,.3,.3),new THREE.Vector3(.62,.2,-.62),1000)},right:'Siili',why:'lyhyt matka'},
    {s:()=>tr11(P12A(7)),o:2,pic:()=>rnd(['o-helppo','o-vaikea']),rightPic:{'o-helppo':'Siili','o-vaikea':'Orava'}},
    {s:()=>tr11(P12A(8)),o:3,show:async()=>{await camStone12()},right:'Siili',why:'iso kivi'},
    {s:()=>tr11(P12A(9)),o:4,pic:()=>rnd(['o-kuuma','o-kylma']),rightPic:{'o-kuuma':'Siili','o-kylma':'Orava'}}];
  for(const r of R){await camStart12();play('present');await r.s();play('idle');await oravaSay12(r.o);let right=r.right;
    if(r.show)await r.show();if(r.pic){const img=r.pic();showPic11(img);right=r.rightPic[img]}
    await say(P12A(30),{sub:false});const t=await mc11([{t:'Siili',e:'🦔',ok:right==='Siili'},{t:'Orava',e:'🐿️',ok:right==='Orava'}],{q:'Kuka on oikeassa? Titta och välj!'});hidePic();addPaws(t?1:3);
    if(right==='Siili'){play('jump');await oravaSay12(7)}else{play('sad');ask('Orava hade rätt den här gången!');await sleep(1600);ask('')}}
  await camStart12();await oravaSay12(1);play('shake');await tr11(P12A(11));
  // Eikä ole! is something Saga can say too
  showWord('Eikä ole!','Visst inte!',2400);await oravaSay12(6);
  for(const [q,ok,no] of[['Tehtävä on helppo. Det är fel! Vad säger du?','Eikä ole!','Kiitos!'],['Siili on vihreä. Det stämmer inte! Vad säger du?','Eikä ole!','On!']]){const t=await mc11(shuffle([{t:ok,ok:true},{t:no}]),{q});addPaws(t?1:3)}
  const t=await typeIt(['eikä ole','eikä ole!'],'Skriv det Orava alltid säger: visst inte!');showWord('Eikä ole!','Visst inte!',1600);addPaws(t?1:3);hit12('eika',t);
  await orava12(false);await praise()}

/* ================= Part 4 · Rastit 1–8 (Siili tells things on the way) ================= */
const TELL12=[[0,1],[2],[3,4],[5],[6],[7],[8,9],[10]];
async function rastiTask12(i){const hard=i%2===1;await say(P12B(hard?10:9),{sub:false});
  if(!hard){const p=rnd(ALLOPP12.filter(x=>x.ia));const t=await mc11(shuffle([{t:'',e:pic11(p.ia,92),ok:true},{t:'',e:pic11(p.ib,92)}]),{q:`Vilken bild är ${p.a}?`});hit12('o-'+p.a,t);addPaws(t?1:2);return}
  const kind=rnd(['opp','word']);if(kind==='opp'){const p=rnd(OPP12);const t=await typeIt([p.b],`${p.a} ↔ ?  Skriv motsatsen:`);showWord(p.b,p.sb,1300);hit12('o-'+p.b,t);addPaws(t?2:4);return}
  const w=rnd(WORD12.filter(x=>!['missä','tänään'].includes(x.k)));if(w.img)showPic11(w.img);const t=await typeIt([w.k],'Skriv på finska: '+w.sv);hidePic();showWord(w.k,w.sv,1300);hit12('w-'+w.k,t);addPaws(t?2:4)}
async function c12Rasti(){if(scene!==forS)await toForest();await review12();setMusic('search');
  for(let i=0;i<8;i++){for(const k of TELL12[i]){play(rnd(['happy','think','present','point']));await tell12(k);
      if(k===1){const t=await mc11(shuffle([{t:'Kartta on väärin päin.',ok:true},{t:'Kartta on kiinni.'},{t:'Kartta on kuuma.'}]),{q:'Varför hittar Siili inte? Välj!'});addPaws(t?1:3)}
      if(k===4){const t=await mc11(shuffle([{t:'Eikä ole!',ok:true},{t:'Kiitos!'},{t:'Hyvää yötä!'}]),{q:'Vad säger Orava, även när man är snäll?'});addPaws(t?1:3)}}
    await goRasti12(i);play('jump');sfx('rustle',.3);await say(P12B(i===7?7:i),{sub:false});showWord('rasti '+(i+1),'',1200);
    await rastiTask12(i);play('happy');await say(P12B(8),{sub:false})}
  await backToStart12();if(finish12)finish12.visible=true;play('jump');await say(P12B(26));await tell12(11);
  const t=await typeIt(['maali'],'Vad heter mål på finska?');showWord('maali','mål',1400);hit12('w-maali',t);addPaws(t?1:3);if(finish12)finish12.visible=false;await praise()}

/* ================= Part 5 · Mato eller orm? ================= */
async function c12Mato(){if(scene!==forS)await toForest();await review12();setMusic('home');await orava12(true);
  for(let i=0;i<40&&!mato12;i++)await sleep(100);if(mato12){mato12.position.set(.38,0,-.25);mato12.rotation.y=-.6;mato12.visible=true}
  play('point');face(new THREE.Vector3(.38,0,-.25));await tr11(P12A(10));await oravaSay12(5);play('scared');sfx('rustle',.3);
  showWord('käärme','orm',1600);await say(P12A(17),{sub:false});
  let t=await mc11(shuffle([{t:'mato',e:'🪱',ok:true},{t:'käärme',e:'🐍'}]),{q:'Titta noga! Är det en orm eller en mask?'});addPaws(t?1:3);hit12('w-mato',t);
  face(new THREE.Vector3(.38,0,-.25));play('sad');await tr11(P12B(24));await oravaSay12(7);play('happy');await tr11(P12B(25));face(cam.position);
  // long and short worms
  for(const [img,ok,no,l] of shuffle([['o-pitka','pitkä','lyhyt',19],['o-lyhyt','lyhyt','pitkä',17]])){showPic11(img);await say(P12B(l),{sub:false});
    const t=await mc11(shuffle([{t:ok,ok:true},{t:no}]),{q:'Mato on …?'});hidePic();showWord(ok,svOf12(ok),1200);hit12('o-'+ok,t);addPaws(t?1:3)}
  // Missä käärme on? – there is no snake, only Mato
  await say(P12B(15));t=await mc11(shuffle([{t:'Täällä ei ole käärmettä.',s:'här finns ingen orm',ok:true},{t:'Käärme on kartta.'},{t:'Käärme on jäätelö.'}]),{q:'Vad svarar du?'});addPaws(t?1:3);
  for(const [k,sv] of[['käärme','orm'],['mato','mask']]){const t=await typeIt([k],'Skriv på finska: '+sv);showWord(k,sv,1200);hit12('w-'+k,t);addPaws(t?1:3)}
  if(mato12)mato12.visible=false;await orava12(false);await praise()}

/* ================= Part 6 · Meningarna (sidan 58) ================= */
async function c12Sent(){if(scene!==forS)await toForest();await review12();setMusic('home');
  // the eight sentences of the page, read once with pictures
  for(const s of SEN12.slice(0,10)){if(s.img)showPic11(s.img,'');await say(P12B(s.l));await sleep(250);hidePic()}
  // Finnish sentence → the Swedish meaning (the Swedish here is the answer, not a subtitle)
  for(const s of shuffle(SEN12).slice(0,4)){const others=shuffle(SEN12.filter(x=>x!==s)).slice(0,2);ask(s.fi);await say(P12B(s.l),{sub:false});
    const t=await mc11(shuffle([{t:s.sv,ok:true},...others.map(o=>({t:o.sv}))]),{q:s.fi+'  Vad betyder det?'});ask('');addPaws(t?1:3)}
  // build the sentence from Swedish
  for(const s of shuffle(SEN12.filter(x=>x.fi.split(' ').length>=3)).slice(0,4)){if(s.img)showPic11(s.img,'');const W=s.fi.replace(/[.?]$/,'').split(' ');const t=await order11(W,'Bygg meningen på finska: '+s.sv);hidePic();await say(P12B(s.l),{sub:false});addPaws(t?1:3)}
  // the missing word
  for(const [pre,ok,post,sv,alt] of shuffle([['Tänään on kaunis','ilma','.','I dag är det vackert väder.',['kivi','mato']],['Tuolla on iso','kivi','.','Där borta är en stor sten.',['ilma','metsä']],['Jäätelö on','kylmä','.','Glassen är kall.',['kuuma','pitkä']],['Tehtävä on','helppo','.','Uppgiften är lätt.',['pieni','ruma']]]).slice(0,3)){
    const t=await typeIt([ok],`${pre} ___${post}   (${sv})`);showWord(`${pre} ${ok}${post}`,'',1500);hit12(WORD12.some(w=>w.k===ok)?'w-'+ok:'o-'+ok,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 7 · Lyssna och välj bild (sidan 59) ================= */
async function c12Listen(){if(scene!==forS)await toForest();await review12();setMusic('home');
  const L=SEN12.filter(s=>s.img);
  for(const s of shuffle(L)){ask('Lyssna! Vilken bild?');await rep11(()=>say(P12B(s.l),{sub:false}));
    const t=await mc11(shuffle([s,...shuffle(L.filter(x=>x!==s)).slice(0,2)]).map(x=>({t:'',e:pic11(x.img,92),ok:x===s})),{onWrong:()=>say(P12B(s.l),{sub:false})});unrep11();ask('');showWord(s.fi,s.sv,1600);addPaws(t?1:3)}
  // listen and write the word that is missing
  for(const [l,full,gap,ok] of shuffle([[19,'Mato on pitkä.','Mato on ___.','pitkä'],[20,'Kivi on pieni.','Kivi on ___.','pieni'],[22,'Jäätelö on kylmä.','Jäätelö on ___.','kylmä'],[16,'Onko matka pitkä?','Onko ___ pitkä?','matka']]).slice(0,3)){
    await rep11(()=>say(P12B(l),{sub:false}));const t=await typeIt([ok],'Lyssna och skriv ordet som fattas: '+gap);unrep11();showWord(full,'',1500);hit12(WORD12.some(w=>w.k===ok)?'w-'+ok:'o-'+ok,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 8 · Kartan och känslorna (Lisää) ================= */
async function c12Map(){if(scene!==forS)await toForest();await review12();setMusic('search');play('present');await say(P12C(0));
  // follow the opposites: every step needs the opposite of the word on the map
  const steps=shuffle(OPP12B.filter(p=>p.ia)).slice(0,6).concat(shuffle(OPP12).slice(0,3));const shown=[];
  for(let i=0;i<steps.length;i++){const p=steps[i];drawMap12(i,shown);const [w,o]=rnd([[p.a,p.b],[p.b,p.a]]);showPic11(w===p.a?p.ia:p.ib,w);await sayW12(w);
    const t=await mc11(shuffle([{t:o,ok:true},{t:w},{t:rnd(ALLOPP12.filter(x=>x!==p)).b}]),{q:`Motsatsen till ${w}? Då går du vidare på kartan.`});hidePic();shown.push(o);hit12('o-'+o,t);addPaws(t?1:3);sfx('newword',.25)}
  drawMap12(MAPPTS12.length,shown);play('jump');await say(P12B(26));await sleep(600);$('#map12').style.display='none';
  for(const p of [OPP12B[3],OPP12B[9]]){showWord(p.a+' – '+p.b,p.sa+' – '+p.sb,2000);await say(P12C(p.l),{sub:false})}
  // weather
  showPic11('o-aurinko','');play('happy');await tr11(P12C(11));showPic11('o-sade','');play('sad');await tr11(P12C(12));hidePic();
  // feelings: Siili shows them one by one
  for(const f of FEEL12){showPic11(f.img,f.k);play({iloinen:'happy',vihainen:'shake',surullinen:'sad',hämmästynyt:'scared',uninen:'curl',pelästynyt:'scared'}[f.k]);await say(P12C(f.l),{sub:false});showWord(f.k,f.sv,1300);await sleep(300);hidePic()}
  play('idle');
  for(const f of shuffle(FEEL12)){ask('Lyssna! Hur känner sig Siili?');await rep11(()=>say(P12C(f.l),{sub:false}));
    const t=await mc11(shuffle([f,...shuffle(FEEL12.filter(x=>x!==f)).slice(0,2)]).map(x=>({t:'',e:pic11(x.img,92),ok:x===f})),{onWrong:()=>say(P12C(f.l),{sub:false})});unrep11();ask('');hit12('f-'+f.k,t);addPaws(t?1:3)}
  for(const f of shuffle(FEEL12).slice(0,3)){showPic11(f.img);const t=await typeIt([f.k],'Hur känner sig Siili? Skriv: Minä olen … (bara ordet)');hidePic();showWord(f.k,f.sv,1300);hit12('f-'+f.k,t);addPaws(t?1:3)}
  play('think');await say(P12C(20));await choose6(FEEL12.map(f=>({t:f.k,e:pic11(f.img,70),s:f.sv,free:true,ok:true})));clearCards();play('happy');await praise()}

/* ================= Part 9 · Siili lär sig svenska, provet och klistermärket ================= */
async function c12Test(){if(scene!==forS)await toForest();setMusic('search');await camStart12();
  // "lätt" is two words in Finnish – Siili writes, Saga corrects
  play('think');ask('Siili skriver på svenska …');await sleep(1200);showWord('Uppgiften är lätt.','Siili skrev: Tehtävä on helppo.',2600);await sleep(2200);play('happy');
  showWord('Stenen är lätt!','Siili skrev: Kivi on painava.',2800);await sleep(2400);
  let t=await mc11(shuffle([{t:'Stenen är tung!',ok:true},{t:'Stenen är lätt!'},{t:'Stenen är kall!'}]),{q:'Siili skrev fel! Kivi on painava betyder …'});addPaws(t?1:3);
  ask('På svenska är "lätt" både helppo och kevyt. Siili tycker att svenska är konstigt!');await sleep(2600);ask('');
  t=await mc11(shuffle([{t:'kevyt',ok:true},{t:'helppo'},{t:'painava'}]),{q:'Höyhen on … (en fjäder är lätt)'});addPaws(t?1:3);
  t=await mc11(shuffle([{t:'helppo',ok:true},{t:'kevyt'},{t:'nopea'}]),{q:'Tehtävä on … (uppgiften är lätt)'});addPaws(t?1:3);
  showWord('Koe!','prov',1800);await sleep(1200);
  const Q=[];for(const p of shuffle(OPP12).slice(0,5))Q.push({k:'o-'+p.b,f:()=>typeIt([p.b],`${p.a} ↔ ?  Skriv motsatsen:`),ok:()=>showWord(p.a+' – '+p.b,p.sa+' – '+p.sb,1200)});
  for(const w of shuffle(WORD12.filter(w=>!['missä','tänään','ilma'].includes(w.k))).slice(0,4))Q.push({k:'w-'+w.k,f:async()=>{if(w.img)showPic11(w.img);const t=await typeIt([w.k],'Skriv på finska: '+w.sv);hidePic();return t},ok:()=>showWord(w.k,w.sv,1200)});
  for(const f of shuffle(FEEL12).slice(0,3))Q.push({k:'f-'+f.k,f:async()=>{showPic11(f.img);const t=await typeIt([f.k],'Hur känner sig Siili? Skriv ordet');hidePic();return t},ok:()=>showWord(f.k,f.sv,1200)});
  const need={};Q.forEach(q=>need[q.k]=2);const queue=shuffle(Q.concat(shuffle(Q)));let right=0;
  while(queue.length){const q=queue.shift();if(need[q.k]<=0)continue;const tt=await q.f();q.ok();if(tt){sfx('wrong',.3);queue.splice(Math.min(3,queue.length),0,q);addPaws(1)}else{need[q.k]--;right++;addPaws(2)}hit12(q.k,tt)}
  showWord(`${right} rätt på första försöket!`,'',2600);await praise();
  setMusic('evening');play('happy');await tr11(P12C(21));play('curl');await tr11(P12C(22));ask('Hyvää yötä, metsä!');await sleep(1600);ask('');await sticker11(12)}

const PARTS12=[{n:'Metsässä',d:'Karta, kontroll och väder',f:c12Woods},{n:'Vastakohdat',d:'Sju motsatspar',f:c12Opp},{n:'Eikä ole!',d:'Vem har rätt?',f:c12Contra},
  {n:'Rastit',d:'Åtta kontroller',f:c12Rasti},{n:'Mato vai käärme?',d:'Mask eller orm',f:c12Mato},{n:'Lauseet',d:'Meningarna',f:c12Sent},
  {n:'Kuuntele',d:'Lyssna och välj bild',f:c12Listen},{n:'Kartta ja tunteet',d:'Kartan och känslorna',f:c12Map},{n:'Koe',d:'Provet och klistermärket',f:c12Test}];
CHS.push({n:'12 · Eikä ole!',h:'Eikä ole!',sub:'Kapitel 12 · Orientering i skogen',P:PARTS12,key:'done12'});st.done12??=[];
if(AUTO){const _v=window.__view;window.__view=async(n,q=0)=>{if(n==='forest'||n==='forestrasti'||n==='forestmato'){await ready;setQuality(q);$('#menu').classList.add('hidden');$('#start')?.classList.add('hidden');await toForest();play('idle');
  if(n==='forestrasti'){await goRasti12(1)}if(n==='forestmato'){await orava12(true);for(let i=0;i<40&&!mato12;i++)await sleep(100);if(mato12){mato12.position.set(.38,0,-.25);mato12.rotation.y=-.6;mato12.visible=true}}return 'ok'}return _v(n,q)}}
