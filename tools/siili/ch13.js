/* ================= Osa 3 · Kapitel 13 · Eetin skuutti – hittegodset i skolkorridoren (2026-11-15) =================
   Pages 62–67. Kenen? (whose, the name gets an N) and Millainen? (what is it like, four new opposite pairs).
   Lines: p13a-/p13b-/p13c-/p13e- (Siili), q13- (Orava), o13- (Pöllö-ope), pk13- (Peikko), p13f-NN + p13f-NNs (Siili tells).
   Review questions come from chapter 12 and 13 together. */
const P13A=i=>'p13a-'+nn(i),P13B=i=>'p13b-'+nn(i),P13C=i=>'p13c-'+nn(i),P13E=i=>'p13e-'+nn(i),F13=i=>'p13f-'+nn(i);
st.m13??={};st.r13??=[];
function hit13(k,tries){st.m13[k]=(st.m13[k]||0)+(tries?0:1);if(!st.r13.includes(k))st.r13.push(k);save()}
const POOL13={};const addR13=(k,f)=>{POOL13[k]=f};
async function review13(n=3){const keys=st.r13.filter(k=>POOL13[k]).map(k=>POOL13[k]).concat(shuffle(st.r12.filter(k=>POOL12[k])).slice(0,4).map(k=>POOL12[k]));if(keys.length<3)return;
  showWord('Kertaus!','repetition',1600);await sleep(900);for(const f of shuffle(keys).slice(0,n))await f()}
async function tell13(i){await say(F13(i));if(has6(F13(i)+'s'))await say(F13(i)+'s',{sub:false});await sleep(200)}
const imgP13=n=>n.includes('/')?n+'.webp':'img11/'+n+'.webp';
const pic13=(n,sz=92)=>`<img src="${imgP13(n)}" alt="" style="width:${sz}px;height:${sz}px;object-fit:cover;border-radius:16px;display:block;margin:0 auto">`;
const showPic13=(n,cap='')=>showPicSrc(imgP13(n),cap);

/* ---------- the words ---------- */
const OPP13=[ // l = the pair line in 13B, sa/sb = "Se on X." lines
  {a:'uusi',b:'vanha',sa:'ny',sb:'gammal',ia:'l-uusi',ib:'l-vanha',l:0,la:5,lb:6},
  {a:'puhdas',b:'likainen',sa:'ren',sb:'smutsig',ia:'l-puhdas',ib:'l-likainen',l:1,la:7,lb:8},
  {a:'ehjä',b:'rikki',sa:'hel',sb:'trasig',ia:'l-ehja',ib:'l-rikki',l:2,la:9,lb:10},
  {a:'paksu',b:'ohut',sa:'tjock',sb:'tunn',ia:'l-paksu',ib:'l-ohut',l:3,la:11,lb:12}];
const ADJ13={};for(const p of OPP13){ADJ13[p.a]={sv:p.sa,img:p.ia,l:p.la,opp:p.b};ADJ13[p.b]={sv:p.sb,img:p.ib,l:p.lb,opp:p.a}}
const NOUN13=[{k:'skuutti',sv:'sparkcykel',l:15,img:'l-uusi'},{k:'T-paita',sv:'t-tröja',l:16,img:'l-puhdas',acc:['t-paita','tpaita','t paita']},{k:'kitara',sv:'gitarr',l:17,img:'l-ehja'},
  {k:'huone',sv:'rum',l:18},{k:'takki',sv:'jacka',l:19,img:'l-paksu'},{k:'kirja',sv:'bok',l:20,img:'t-kirja'}];
const NAMES13=[{n:'Eeti',g:'Eetin',sv:'Eetis'},{n:'Hopsu',g:'Hopsun',sv:'Hopsus'},{n:'Lari',g:'Larin',sv:'Laris'},{n:'Elsa',g:'Elsan',sv:'Elsas'},{n:'Leo',g:'Leon',sv:'Leos'},{n:'Emma',g:'Emman',sv:'Emmas'}];
const FRIENDS13=[{n:'Orava',g:'Oravan',l:18,img:'img6/squirrel'},{n:'Pöllö-ope',g:'Pöllö-open',l:19,img:'img6/owl'},{n:'Peikko',g:'Peikon',l:20,img:'peikko'},{n:'Mato',g:'Maton',l:21},{n:'Siili',g:'Siilin',l:24},{n:'Saga',g:'Sagan',l:25},{n:'Noa',g:'Noan',l:26}];
const BOOK13=[ // the text on page 62: owner, thing, how it is
  {who:'Eetin',fi:'Eetin skuutti on uusi.',sv:'Eetis sparkcykel är ny.',img:'l-uusi',q:1,a:'Eetin'},
  {who:'Hopsun',fi:'Hopsun T-paita on likainen.',sv:'Hopsus t-tröja är smutsig.',img:'l-likainen',q:2,a:'Hopsun'},
  {who:'Hopsun',fi:'Hopsun pallo on rikki.',sv:'Hopsus boll är trasig.',img:'t-pallo',q:0,a:'Hopsun'},
  {who:'Leon',fi:'Leon takki on ohut.',sv:'Leos jacka är tunn.',img:'l-ohut',q:3,a:'Leon'},
  {who:'Emman',fi:'Emman takki on paksu.',sv:'Emmas jacka är tjock.',img:'l-paksu',q:4,a:'Emman'}];
const MILL13=[{k:'talvi',a:'kylmä',sv:'vinter',sa:'kall',img:'m-talvi',l:14},{k:'aurinko',a:'kuuma',sv:'sol',sa:'varm',img:'m-aurinko',l:15},{k:'etana',a:'hidas',sv:'snigel',sa:'långsam',img:'m-etana',l:16},
  {k:'pikajuna',a:'nopea',sv:'snabbtåg',sa:'snabb',img:'m-pikajuna',l:17},{k:'höyhen',a:'kevyt',sv:'fjäder',sa:'lätt',img:'m-hoyhen',l:18},{k:'bussi',a:'painava',sv:'buss',sa:'tung',img:'img6/bussi',l:19},
  {k:'tyyny',a:'pehmeä',sv:'kudde',sa:'mjuk',img:'m-tyyny',l:20},{k:'kivi',a:'kova',sv:'sten',sa:'hård',img:'m-kivi',l:21},{k:'sitruuna',a:'hapan',sv:'citron',sa:'sur',img:'img6/sitruuna',l:22},{k:'karkki',a:'makea',sv:'godis',sa:'söt',img:'m-karkki',l:23}];

/* ---------- the school corridor with the lost-property corner ---------- */
const lostS=new THREE.Scene();let lostBuilt=false;let sq13=null,owl13=null,pk13=null,mato13=null,scoot13=null,ball13=null,box13=null;
function lockerTex13(col,n){return tex(canvas(256,1024,(g,W,H)=>{g.fillStyle=col;g.fillRect(0,0,W,H);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(0,0,6,H);g.fillRect(W-6,0,6,H);
  for(const y0 of[90,860])for(let i=0;i<6;i++){g.fillStyle='rgba(0,0,0,.35)';g.fillRect(60,y0+i*16,136,7)}
  g.fillStyle='#d8d8d0';g.fillRect(190,470,22,90);g.fillStyle='#fff';g.fillRect(84,200,88,50);g.fillStyle='#333';g.font='800 40px "Baloo 2", sans-serif';g.textAlign='center';g.fillText(String(n),128,238);
  for(let i=0;i<400;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.05})`;g.fillRect(Math.random()*W,Math.random()*H,2,2)}}))}
function scooter13(){const G=new THREE.Group();const blue=M6('#2f7ad0',{roughness:.35,metalness:.3}),dark=M6('#2d2a2e',{roughness:.6}),steel=M6('#c8ccd2',{metalness:.7,roughness:.3});
  bx6(G,.62,.025,.12,blue,0,.075,0);bx6(G,.6,.006,.1,dark,0,.09,0);
  for(const x of[-.3,.3]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.035,24),dark);w.rotation.x=Math.PI/2;w.position.set(x,.06,0);G.add(w);const hub=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.04,12),steel);hub.rotation.x=Math.PI/2;hub.position.set(x,.06,0);G.add(hub)}
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,.72,10),steel);stem.position.set(.3,.44,0);stem.rotation.z=-.08;G.add(stem);
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.38,10),steel);bar.rotation.x=Math.PI/2;bar.position.set(.33,.8,0);G.add(bar);
  for(const z of[-.17,.17]){const gr=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.08,10),dark);gr.rotation.x=Math.PI/2;gr.position.set(.33,.8,z);G.add(gr)}
  G.traverse(o=>{if(o.isMesh)o.castShadow=true});return G}
function card13(img,w=.16){const t=new THREE.TextureLoader().load(imgP13(img));t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w),new THREE.MeshStandardMaterial({map:t,roughness:.8}));m.castShadow=true;return m}
function buildLost13(){if(lostBuilt)return;lostBuilt=true;const S=lostS;S.background=new THREE.Color('#3a3530');S.fog=new THREE.Fog('#3a3530',2.6,6);
  lightRoom6(S,{sky:'#fff4e0',ground:'#5a5048',hemi:.9,key:'#ffe8c8',keyI:2.2,keyPos:[-1.2,2.6,1.6],shadow:2});
  // floor: speckled linoleum
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(9,4),new THREE.MeshStandardMaterial({roughness:.35,map:tex(canvas(512,512,(g,W,H)=>{g.fillStyle='#b9c4b0';g.fillRect(0,0,W,H);for(let i=0;i<6000;i++){g.fillStyle=`rgba(${rnd(['60,70,60','255,255,255','120,110,90'])},${R01(.1,.35)})`;g.fillRect(Math.random()*W,Math.random()*H,2,2)}}),[6,3])}));
  fl.rotation.x=-Math.PI/2;fl.position.z=.6;fl.receiveShadow=true;S.add(fl);
  // back wall with a row of lockers, side wall with a window
  const plaster=new THREE.MeshStandardMaterial({map:paintTex6(512,512,'#efe4cf'),roughness:.95});bx6(S,9,2.6,.05,plaster,0,1.3,-.95,false);
  bx6(S,9,.12,.03,M6('#7a5c44'),0,.06,-.92,false);
  const cols=['#2f6fa8','#2b8a8a','#2f6fa8','#c8553b','#2b8a8a','#2f6fa8','#e0a83a','#2b8a8a','#2f6fa8','#c8553b','#2b8a8a','#2f6fa8'];
  cols.forEach((c,i)=>{const x=-2.3+i*.4;if(x>.3&&x<1.35)return;const L=new THREE.Mesh(new THREE.BoxGeometry(.39,1.75,.42),[M6(c),M6(c),M6(c),M6(c),new THREE.MeshStandardMaterial({map:lockerTex13(c,101+i),roughness:.5,metalness:.15}),M6(c)]);
    L.position.set(x,.875+.06,-.72);L.castShadow=L.receiveShadow=true;S.add(L)});
  bx6(S,.04,2.6,4,plaster,-2.6,1.3,.9,false);
  {const w=new THREE.Mesh(new THREE.PlaneGeometry(.9,.8),new THREE.MeshBasicMaterial({map:tex(canvas(360,320,(g,W,H)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#2c3e70');gr.addColorStop(1,'#e8a070');g.fillStyle=gr;g.fillRect(0,0,W,H);g.fillStyle='#fff8';for(let i=0;i<30;i++)g.fillRect(R01(0,W),R01(0,H*.5),2,2);g.fillStyle='#2a2a3a';for(let x=0;x<W;x+=40){const h=R01(30,80);g.fillRect(x,H-h,36,h)}}))}));
    w.rotation.y=Math.PI/2;w.position.set(-2.57,1.2,.2);S.add(w)}
  // the lost-property corner: a low bench, a box, a sign and a pinboard with the "who lost this?" photos
  const wood=new THREE.MeshStandardMaterial({map:tex(woodTex2('#c09060','#7a5434'),[2,1]),roughness:.65});
  bx6(S,1.0,.04,.36,wood,.82,.34,-.66);for(const x of[.36,1.28])bx6(S,.04,.34,.34,wood,x,.17,-.66);
  {box13=new THREE.Group();const cb=M6('#c49a62',{roughness:.95});bx6(box13,.42,.28,.32,cb,0,.14,0);for(const [x,ry] of[[-.21,.5],[.21,-.5]]){const f=new THREE.Mesh(new THREE.BoxGeometry(.2,.005,.32),cb);f.position.set(x+(x<0?-.08:.08),.3,0);f.rotation.z=ry;box13.add(f)}
    const lab=new THREE.Mesh(new THREE.PlaneGeometry(.36,.09),new THREE.MeshStandardMaterial({map:tex(canvas(720,180,(g,W,H)=>{g.fillStyle='#fffdf4';g.fillRect(0,0,W,H);g.fillStyle='#c0392b';g.font='800 96px "Baloo 2", sans-serif';g.textAlign='center';g.fillText('LÖYTÖTAVARAT',W/2,124)}))}));lab.position.set(0,.16,.161);box13.add(lab);
    for(const [img,x,y,z,rz] of[['t-reppu',-.1,.3,-.04,.3],['t-kirja',.08,.29,.02,-.2],['l-likainen',.0,.33,-.08,.1]]){const c=card13(img,.14);c.position.set(x,y,z);c.rotation.set(-.4,0,rz);box13.add(c)}
    box13.position.set(.45,0,-.3);box13.rotation.y=-.25;box13.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(box13)}
  {const sign=new THREE.Mesh(new THREE.PlaneGeometry(.8,.2),new THREE.MeshStandardMaterial({map:tex(canvas(800,200,(g,W,H)=>{g.fillStyle='#2f3a33';g.fillRect(0,0,W,H);g.strokeStyle='#a87645';g.lineWidth=14;g.strokeRect(0,0,W,H);g.fillStyle='#ffd36b';g.font='800 84px "Baloo 2", sans-serif';g.textAlign='center';g.fillText('Löytötavarat',W/2,90);g.fillStyle='#f4efe6';g.font='600 46px "Baloo 2"';g.fillText('Kenen tämä on?',W/2,160)}))}));sign.position.set(.82,1.0,-.915);S.add(sign)}
  {const pb=bx6(S,.8,.46,.02,M6('#b88a5a',{roughness:1}),.82,.62,-.92,false);const imgs=['l-ohut','l-paksu','l-ehja','t-silmalasit','t-kaulaliina','t-peikonhattu'];imgs.forEach((n,i)=>{const c=card13(n,.13);c.position.set(.52+(i%3)*.3,.72-Math.floor(i/3)*.2,-.905);c.rotation.z=R01(-.08,.08);S.add(c);
    const pin=new THREE.Mesh(new THREE.SphereGeometry(.008,8,6),M6(rnd(['#c8352b','#f2c230','#3f9a4a'])));pin.position.set(c.position.x,c.position.y+.055,-.9);S.add(pin)})}
  // things on the floor: the new scooter, the burst ball, a guitar case, a radiator
  scoot13=scooter13();scoot13.position.set(-1.0,0,-.5);scoot13.rotation.y=.35;S.add(scoot13);
  ball13=new THREE.Mesh(new THREE.SphereGeometry(.09,24,16),M6('#d23a2e',{roughness:.45}));ball13.scale.y=.62;ball13.position.set(-.4,.056,-.25);ball13.castShadow=true;S.add(ball13);
  {const r=new THREE.Group();for(let i=0;i<10;i++)bx6(r,.05,.42,.08,M6('#f2efe8',{roughness:.5}),i*.06,.3,0);r.position.set(-2.2,0,-.86);S.add(r)}
  // ceiling lights
  for(const x of[-1.4,.4,2.2]){const l=new THREE.Mesh(new THREE.BoxGeometry(.8,.04,.18),new THREE.MeshStandardMaterial({color:'#fff',emissive:new THREE.Color('#fff4d8'),emissiveIntensity:1.6}));l.position.set(x,2.4,-.2);S.add(l);const pl=new THREE.PointLight('#fff0d0',.8,4,1.6);pl.position.set(x,2.2,-.1);S.add(pl)}
  motes6(S,0,.6,-.3,1.4,.5,.6,80,'#fff2d8');
  (async()=>{sq13=await guest6('squirrel.glb','squirrel',.21);sq13.visible=false;S.add(sq13);
    owl13=await guest6('owl.glb','owl',.27);owl13.visible=false;S.add(owl13);
    const pg=await optGLB6('peikko.glb');if(pg){const inner=pg.scene;fitModel(inner,{h:.5});pk13=new THREE.Group();pk13.add(inner);inner.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false}});
      if(pg.animations?.length){const mx=new THREE.AnimationMixer(inner);pk13.userData.mixer=mx;pk13.userData.acts={};for(const c of pg.animations)pk13.userData.acts[c.name.toLowerCase()]=mx.clipAction(c)}}
    else{const t=await new THREE.TextureLoader().loadAsync('img11/peikko.webp');t.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Mesh(new THREE.PlaneGeometry(.5*t.image.width/t.image.height,.5),new THREE.MeshStandardMaterial({map:t,transparent:true,alphaTest:.4,side:THREE.DoubleSide}));sp.position.y=.25;pk13=new THREE.Group();pk13.add(sp);pk13.userData.sprite=sp}
    pk13.visible=false;S.add(pk13);
    const mg=await optGLB6('mato.glb');if(mg){const m=mg.scene;const bx=new THREE.Box3().setFromObject(m),sz=bx.getSize(new THREE.Vector3());m.scale.multiplyScalar(.14/Math.max(sz.x,sz.y,sz.z));const b2=new THREE.Box3().setFromObject(m);m.position.y-=b2.min.y;
      mato13=new THREE.Group();mato13.add(m);m.traverse(o=>{if(o.isMesh)o.castShadow=true});
      const hat=new THREE.Group();const hm=M6('#2f8a3a',{roughness:.6});const brim=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.004,20),hm);hat.add(brim);const top=new THREE.Mesh(new THREE.CylinderGeometry(.018,.02,.03,20),hm);top.position.y=.017;hat.add(top);hat.visible=false;mato13.userData.hat=hat;mato13.add(hat);
      const b3=new THREE.Box3().setFromObject(m);hat.position.set((b3.max.x+b3.min.x)/2,b3.max.y-.004,(b3.max.z+b3.min.z)/2);mato13.visible=false;S.add(mato13)}})();
  (function tick(now){requestAnimationFrame(tick);if(scene!==lostS)return;for(const g of[sq13,owl13,pk13])if(g?.userData.mixer)g.userData.mixer.update(1/60);if(mato13?.visible)mato13.children[0].rotation.y=Math.sin(now/700)*.2})(0)}
const LOST_CAM=[new THREE.Vector3(0,.34,1.0),new THREE.Vector3(.05,.16,-.4)];
async function toLost(){await goScene(lostS,buildLost13,LOST_CAM[0],LOST_CAM[1],'home');putSiiliIn(lostS,0,0,0);for(const g of[sq13,owl13,pk13,mato13])if(g)g.visible=false}
const camBox13=()=>camTo(new THREE.Vector3(.25,.38,.55),new THREE.Vector3(.5,.2,-.35),1100);
const camScoot13=()=>camTo(new THREE.Vector3(-.5,.45,.5),new THREE.Vector3(-.95,.3,-.5),1100);
const camBoard13=()=>camTo(new THREE.Vector3(.82,.62,.2),new THREE.Vector3(.82,.64,-.9),1100);
const camHome13=()=>camTo(LOST_CAM[0],LOST_CAM[1],1000);
async function waitG13(name){for(let i=0;i<50;i++){const g={sq:sq13,owl:owl13,pk:pk13,mato:mato13}[name];if(g)return g;await sleep(100)}return null}
async function guestIn13(name,x=.32,z=.12){const g=await waitG13(name);if(!g)return null;if(name==='mato'){g.position.set(x,0,z);g.rotation.y=-.6;g.visible=true;sfx('rustle',.3);return g}
  await enter6(g,x,z);if(name==='pk'&&g.userData.acts){guestAnim(g,/talk/);const a=Object.entries(g.userData.acts).find(([k])=>/talk/.test(k));if(a)a[1].timeScale=.5}return g}
async function guestOut13(g){if(!g||!g.visible)return;if(g===mato13){g.visible=false;return}if(!guestAnim(g,/walk/))guestAnim(g,/run/);const x0=g.position.x,z0=g.position.z,t0=performance.now();if(!g.userData.sprite)g.rotation.y=Math.PI/2;
  await new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/1400);g.position.x=x0+(1.2-x0)*k;if(k<1)requestAnimationFrame(s);else r()})()});g.visible=false;g.position.z=z0}
async function guestSay13(g,id){if(g&&!g.userData.sprite){if(!guestAnim(g,/talk|wave|dance/))hop6(g,350)}else if(g)hop6(g,350);await say(id)}

/* ---------- a crossword grid for part 7 ---------- */
(function(){const css=document.createElement('style');css.textContent=`
#cross13{position:absolute;left:2vw;top:10vh;display:none;pointer-events:none;background:#fffaf0;border-radius:18px;box-shadow:var(--shadow);padding:12px 14px}
#cross13 .r{display:flex;align-items:center;gap:3px;margin:3px 0}#cross13 .n{width:22px;font:800 14px 'Baloo 2';color:#7a6556}
#cross13 .c{width:min(3.2vh,26px);height:min(3.2vh,26px);border:2px solid #c9b48f;border-radius:5px;display:grid;place-items:center;font:800 min(2.4vh,18px) 'Baloo 2';background:#fff;text-transform:uppercase}
#cross13 .r.cur .c{border-color:#c0392b;background:#fff3c8}#cross13 .r.ok .c{background:#dff0d6}`;document.head.append(css);
 const d=document.createElement('div');d.id='cross13';(document.getElementById('ui')||document.body).append(d)})();
function drawCross13(words,k){$('#cross13').innerHTML=words.map((w,i)=>`<div class="r ${i===k?'cur':i<k?'ok':''}"><span class="n">${i+1}.</span>${[...w].map(ch=>`<span class="c">${i<k?ch:''}</span>`).join('')}</div>`).join('');$('#cross13').style.display='block'}
{const _qa=qActive;qActive=function(){return _qa()||(()=>{const e=$('#cross13');return e&&e.style.display==='block'})()}}

/* ---------- review questions ---------- */
for(const [w,v] of Object.entries(ADJ13))addR13('a-'+w,async()=>{showPic13(v.img);const t=await mc11(shuffle([{t:w,ok:true},{t:v.opp},{t:rnd(Object.keys(ADJ13).filter(x=>x!==w&&x!==v.opp))}]),{q:'Millainen se on?'});hidePic();showWord(w,v.sv,1200);hit13('a-'+w,t);addPaws(t?1:2)});
for(const x of NAMES13)addR13('n-'+x.n,async()=>{const t=await typeIt([x.g],`Kenen? ${x.n} → … (skriv namnet med N)`);showWord(x.g,x.sv,1200);hit13('n-'+x.n,t);addPaws(t?1:2)});
for(const m of MILL13)addR13('m-'+m.k,async()=>{showPic13(m.img);const t=await mc11(shuffle([{t:m.a,ok:true},...shuffle(MILL13.filter(x=>x!==m)).slice(0,2).map(x=>({t:x.a}))]),{q:`Millainen ${m.k} on?`});hidePic();showWord(m.k+' on '+m.a,'',1300);hit13('m-'+m.k,t);addPaws(t?1:2)});
for(const n of NOUN13.filter(n=>n.img))addR13('s-'+n.k,async()=>{showPic13(n.img);const t=await typeIt(n.acc||[n.k],'Skriv på finska: '+n.sv);hidePic();showWord(n.k,n.sv,1200);hit13('s-'+n.k,t);addPaws(t?1:2)});

/* ================= Part 1 · Hittegodset öppnar ================= */
async function c13Open(){await toLost();setMusic('search');play('wave');await tr11(P13A(0));play('present');await tr11(P13A(1));
  await tell13(0);await tell13(1);
  // the inventory from page 62, thing by thing
  await camScoot13();play('point');face(scoot13.position);await say(P13A(2));showWord('skuutti','sparkcykel',1500);await say(P13A(3));await tr11(P13A(4));
  await camHome13();face(cam.position);
  for(const [l,img,w] of[[5,'l-puhdas','puhdas'],[6,null,null],[7,'l-likainen','likainen'],[8,'t-pallo','rikki'],[9,'l-ehja','ehjä'],[10,null,null],[11,'l-ohut','ohut'],[12,'l-paksu','paksu']]){
    if(img)showPic13(img,'');play(l===7?'shake':rnd(['present','point','think']));await say(P13A(l));if(w)showWord(w,ADJ13[w]?.sv||'trasig',1300);await sleep(250);hidePic()}
  play('happy');await tell13(2);await tell13(3);
  // check: whose is it? (the answer is the name with N)
  for(const b of shuffle(BOOK13).slice(0,4)){showPic13(b.img);const others=shuffle(['Eetin','Hopsun','Leon','Emman','Larin'].filter(x=>x!==b.a)).slice(0,2);
    const t=await mc11(shuffle([{t:b.a,ok:true},...others.map(o=>({t:o}))]),{q:'Kenen? Vems är det?'});hidePic();showWord(b.fi,b.sv,1800);addPaws(t?1:3)}
  for(const n of[NOUN13[0],NOUN13[4]]){showPic13(n.img);const t=await typeIt(n.acc||[n.k],'Skriv på finska: '+n.sv);hidePic();showWord(n.k,n.sv,1300);hit13('s-'+n.k,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 2 · Kenen? Millainen? ================= */
async function c13Ask(){if(scene!==lostS)await toLost();await review13();setMusic('home');
  showWord('Kenen?','Vems?',2000);await say(P13A(13),{sub:false});showWord('Millainen?','Hurdan?',2000);await say(P13A(14),{sub:false});
  // the things, word by word
  for(const n of NOUN13){if(n.img)showPic13(n.img,n.k);await say(P13A(n.l),{sub:false});showWord(n.k,n.sv,1200);await sleep(200);hidePic()}
  // spoken and written language
  play('think');showWord('skuutti → potkulauta','talspråk → skriftspråk',2600);await tr11(P13A(21));showWord('toi → tuo','talspråk → skriftspråk',2600);await tr11(P13A(22));
  let t=await mc11(shuffle([{t:'potkulauta',ok:true},{t:'pikajuna'},{t:'pusero'}]),{q:'Skuutti är talspråk. Vad heter det i skriftspråket?'});addPaws(t?1:3);
  // Kenen …? – questions from page 64, Saga answers with the name
  for(const b of shuffle(BOOK13)){showPic13(b.img);await say(P13E(b.q),{sub:false});const others=shuffle(['Eetin','Hopsun','Leon','Emman','Larin','Elsan'].filter(x=>x!==b.a)).slice(0,2);
    const t=await mc11(shuffle([{t:b.a,ok:true},...others.map(o=>({t:o}))]));hidePic();showWord(b.fi,b.sv,1600);addPaws(t?1:3)}
  showPic13('img6/paaryna');await say(P13E(5),{sub:false});t=await mc11(shuffle([{t:'Se on opettajan.',ok:true},{t:'Se on opettaja.'},{t:'Se on uusi.'}]));hidePic();await say(P13E(6),{sub:false});addPaws(t?1:3);
  // Millainen …? – Saga answers how it is
  for(const [l,ans,others,img] of[[7,'paksu',['ohut','uusi'],'l-paksu'],[9,'oranssi',['vihreä','sininen'],null],[10,'vanha, mutta ehjä',['uusi ja rikki','pieni, mutta kiva'],'l-ehja'],[8,'pieni, mutta kiva',['vanha, mutta ehjä','paksu'],null]]){
    if(img)showPic13(img);await say(P13E(l),{sub:false});const t=await mc11(shuffle([{t:'Se on '+ans+'.',ok:true},...others.map(o=>({t:'Se on '+o+'.'}))]));hidePic();addPaws(t?1:3)}
  showWord('pusero','tröja',1500);await say(P13E(11),{sub:false});
  t=await typeIt(['pusero'],'Skriv på finska: tröja');showWord('pusero','tröja',1200);addPaws(t?1:3);hit13('pusero',t);
  t=await typeIt(['millainen'],'Hur frågar man "hurdan?" på finska?');showWord('Millainen?','Hurdan?',1300);hit13('millainen',t);addPaws(t?1:3);
  t=await typeIt(['kenen'],'Hur frågar man "vems?" på finska?');showWord('Kenen?','Vems?',1300);hit13('kenen',t);addPaws(t?1:3);await praise()}

/* ================= Part 3 · Motsatserna uusi–vanha, puhdas–likainen, ehjä–rikki, paksu–ohut ================= */
async function c13Opp(){if(scene!==lostS)await toLost();await review13();setMusic('home');
  for(const p of OPP13){showPic13(p.ia,p.a);await sleep(150);await say(P13B(p.l),{sub:false});showPic13(p.ib,p.b);showWord(p.a+' – '+p.b,p.sa+' – '+p.sb,2200);await sleep(1300);hidePic();await sleep(200)}
  play('think');await say(P13B(4));
  // listen: Se on X. – which picture?
  for(const [w,v] of shuffle(Object.entries(ADJ13))){ask('Lyssna! Vilken bild?');await rep11(()=>say(P13B(v.l),{sub:false}));
    const t=await mc11(shuffle([{t:'',e:pic13(v.img),ok:true},{t:'',e:pic13(ADJ13[v.opp].img)}]),{onWrong:()=>say(P13B(v.l),{sub:false})});unrep11();ask('');showWord(w,v.sv,1200);hit13('a-'+w,t);addPaws(t?1:3)}
  // picture → write
  for(const [w,v] of shuffle(Object.entries(ADJ13)).slice(0,5)){showPic13(v.img);const t=await typeIt([w],'Millainen se on? Skriv: (se on) …');hidePic();showWord(w,v.sv,1200);await say(P13B(v.l),{sub:false});hit13('a-'+w,t);addPaws(t?1:3)}
  // opposite of the opposite
  for(const p of shuffle(OPP13)){const t=await typeIt([p.b],`${p.a} ↔ ?  Skriv motsatsen:`);showWord(p.a+' – '+p.b,'',1300);hit13('a-'+p.b,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 4 · Etsivä: the N at the end ================= */
async function c13Etsiva(){if(scene!==lostS)await toLost();await review13();setMusic('search');
  play('think');await say(P13B(13));await say(P13B(14),{sub:false});
  for(const x of NAMES13){showWord(x.n+' → '+x.g,x.sv,1500);await sleep(1100)}
  await say(P13B(15),{sub:false});let t=await mc11(shuffle([{t:'N',ok:true},{t:'S'},{t:'T'}]));play('jump');await say(P13B(16));addPaws(t?1:3);
  ask('På svenska sätter man ett S: Leos jacka. På finska ett N: Leon takki.');await sleep(3000);ask('');
  // Saga adds the N herself
  for(const x of shuffle(NAMES13)){const t=await typeIt([x.g],`Vems? ${x.n} → … (lägg till N)`);showWord(x.g,x.sv,1200);hit13('n-'+x.n,t);addPaws(t?1:3)}
  // Kenen tämä on? – friends Saga knows
  await camBoard13();await say(P13B(17),{sub:false});await camHome13();
  for(const f of FRIENDS13.filter(f=>f.n!=='Peikko'&&f.n!=='Mato')){if(f.img)showPic13(f.img,f.n);await say(P13B(f.l));await sleep(250);hidePic()}
  for(const f of shuffle(FRIENDS13.filter(f=>['Orava','Siili','Saga','Noa','Pöllö-ope'].includes(f.n))).slice(0,4)){
    const t=await mc11(shuffle([{t:f.g,ok:true},{t:f.n},{t:f.n+'s'}]),{q:`Det är ${f.n}s. På finska: Se on …`});await say(P13B(f.l),{sub:false});addPaws(t?1:3)}
  t=await typeIt(['sagan','se on sagan'],'Det är Sagas! Skriv på finska: Se on …');showWord('Se on Sagan.','Det är Sagas.',1400);addPaws(t?1:3);hit13('n-Saga',t);
  // Siili finds a blue and white scarf
  await camBox13();play('present');showPic13('t-kaulaliina','');await say(P13B(27));hidePic();await camHome13();play('scared');await say(P13B(28));play('happy');await praise()}

/* ================= Part 5 · Ägarna kommer ================= */
async function c13Owners(){if(scene!==lostS)await toLost();await review13();setMusic('home');
  const visits=[
    {g:'sq',img:'t-kaulaliina',who:'Oravan',ids:['q13-00','q13-01'],q:'Kenen kaulaliina tämä on?',l:18,tell:null},
    {g:'owl',img:'t-silmalasit',who:'Pöllö-open',ids:['o13-00','o13-01'],q:'Kenen silmälasit nämä ovat?',l:19,tell:4},
    {g:'pk',img:'t-peikonhattu',who:'Peikon',ids:['pk13-00','pk13-01'],q:'Kenen hattu tämä on?',l:20,tell:5},
    {g:'mato',img:'t-matonhattu',who:'Maton',ids:[],q:'Kenen hattu tämä on?',l:21,tell:null}];
  for(const v of visits){await camBox13();play('present');showPic13(v.img,'');if(v.tell!==null){await camHome13();await tell13(v.tell)}await camHome13();
    const names=['Oravan','Pöllö-open','Peikon','Maton'];const others=shuffle(names.filter(n=>n!==v.who)).slice(0,2);
    const t=await mc11(shuffle([{t:'Se on '+v.who+'.',ok:true},...others.map(o=>({t:'Se on '+o+'.'}))]),{q:v.q});hidePic();addPaws(t?1:3);await say(P13B(v.l),{sub:false});
    const g=await guestIn13(v.g,v.g==='mato'?.3:.34,v.g==='mato'?.08:.14);
    if(v.g==='mato'){play('think');await say(P13B(22));play('happy');await say(P13B(23));if(g?.userData.hat)g.userData.hat.visible=true;await sleep(900);
      const t2=await mc11(shuffle([{t:'mato',e:'🪱',s:'mask',ok:true},{t:'matto',e:'🧶',s:'matta'}]),{q:'Vem får hatten? Mato eller matto?'});addPaws(t2?1:3)}
    for(const id of v.ids)await guestSay13(g,id);
    if(v.g==='pk'){play('think');await say(P13B(29));ask('Peikko → Peikon. Ett K försvann! Det får du veta mer om i kapitel 15.');await sleep(2600);ask('')}
    play('wave');await guestOut13(g);if(g?.userData.hat)g.userData.hat.visible=false}
  // the book's last owners: Kenen …?
  for(const [img,who,fi] of shuffle([['t-kirja','Hopsun','Hopsun kirja'],['t-pallo','Hopsun','Hopsun pallo'],['l-uusi','Eetin','Eetin skuutti'],['l-ohut','Leon','Leon takki']]).slice(0,3)){showPic13(img);
    const t=await typeIt([fi,fi.toLowerCase()],`Skriv vems det är: ${who.replace(/n$/,'')}s … (på finska, t.ex. Leon takki)`);hidePic();showWord(fi,'',1300);addPaws(t?1:3)}
  await praise()}

/* ================= Part 6 · Skriv och lyssna (sidan 66) ================= */
async function c13Write(){if(scene!==lostS)await toLost();await review13();setMusic('home');
  // listen and choose the Swedish meaning (övning 6)
  for(const l of shuffle([0,1,2,9,13])){const fi=LINES[P13C(l)]?.fi||'',sv=LINES[P13C(l)]?.sv||'';ask('Lyssna! Vad betyder det?');await rep11(()=>say(P13C(l),{sub:false}));
    const others=shuffle([0,1,2,3,7,8,9,13].filter(x=>x!==l)).slice(0,2).map(x=>LINES[P13C(x)]?.sv||'');const t=await mc11(shuffle([{t:sv,ok:true},...others.map(o=>({t:o}))]));unrep11();ask('');showWord(fi,'',1500);addPaws(t?1:3)}
  // build the questions (övning 5)
  for(const [l,W,sv] of shuffle([[0,['Kenen','takki','tämä','on?'],'Vems jacka är det här?'],[4,['Millainen','Hopsun','kirja','on?'],'Hurdan är Hopsus bok?'],[5,['Millainen','Suvin','huone','on?'],'Hurdant är Suvis rum?'],[6,['Millainen','Leon','takki','on?'],'Hurdan är Leos jacka?']]).slice(0,3)){
    const t=await order11(W,'Bygg frågan: '+sv);await say(P13C(l),{sub:false});addPaws(t?1:3)}
  // and answer them
  for(const [ql,al,ok,no] of[[4,7,'Hopsun kirja on uusi ja hyvä.',['Hopsun kirja on rikki.','Hopsun kirja on likainen.']],[5,8,'Suvin huone on kaunis.',['Suvin huone on paksu.','Suvin huone on ohut.']],[6,9,'Leon takki on sininen.',['Leon takki on puhdas ja vanha.','Leon takki on makea.']]]){
    await say(P13C(ql),{sub:false});const t=await mc11(shuffle([{t:ok,ok:true},...no.map(o=>({t:o}))]),{q:'Lyssna på Siili och välj svaret han vill ha'});await say(P13C(al),{sub:false});addPaws(t?1:3)}
  // write in Finnish (Kirjoita, page 66)
  for(const [ok,sv] of[['Kenen takki tämä on?','Vems jacka är det här?'],['Onko tämä Leon pallo?','Är det här Leos boll?'],['Hopsun kirja on hyvä.','Hopsus bok är bra.']]){
    const t=await typeIt([ok],'Skriv på finska: '+sv);showWord(ok,sv,1600);addPaws(t?1:3)}
  await praise()}

/* ================= Part 7 · Korsordet och Kotona ================= */
async function c13Cross(){if(scene!==lostS)await toLost();await review13();setMusic('search');play('present');await say(P13E(19));
  const CW=[{k:'skuutti',img:'l-uusi',sv:'sparkcykel'},{k:'kitara',img:'l-ehja',sv:'gitarr'},{k:'takki',img:'l-paksu',sv:'jacka'},{k:'kirja',img:'t-kirja',sv:'bok'},{k:'pallo',img:'t-pallo',sv:'boll'},
    {k:'huone',img:null,sv:'rum'},{k:'reppu',img:'t-reppu',sv:'ryggsäck'},{k:'pusero',img:null,sv:'tröja'},{k:'kaulaliina',img:'t-kaulaliina',sv:'halsduk'},{k:'silmälasit',img:'t-silmalasit',sv:'glasögon'}];
  for(let i=0;i<CW.length;i++){const w=CW[i];drawCross13(CW.map(x=>x.k),i);if(w.img)showPic13(w.img,'');const t=await typeIt([w.k],`${i+1}. ${w.img?'Vad är det på bilden?':'Skriv på finska: '+w.sv}  (${w.k.length} bokstäver)`);hidePic();hit13('s-'+w.k,t);addPaws(t?1:3)}
  drawCross13(CW.map(x=>x.k),CW.length);play('jump');showWord('Ristisanatehtävä valmis!','korsordet är klart',2200);await sleep(1800);$('#cross13').style.display='none';
  // Kotona: Kalle, Anna and Suvi
  await camScoot13();await say(P13C(10));await camHome13();
  for(const [l,img,ok,sv,o1,o2] of[[11,'t-appelsiini','Se on Annan appelsiini.','Det är Annas apelsin.','Se on Anna appelsiini.','Se on Annas appelsiini.'],[12,null,'Se on Suvin huone.','Det är Suvis rum.','Se on Suvi huone.','Se on Suvis huone.']]){
    if(img)showPic13(img);await say(P13C(l),{sub:false});let t=await mc11(shuffle([{t:ok,ok:true},{t:o1},{t:o2}]),{q:'Vems är det? Välj rätt mening.'});addPaws(t?1:3);
    t=await typeIt([ok],'Skriv hela meningen på finska: '+sv);hidePic();showWord(ok,sv,1600);addPaws(t?1:3)}
  await praise()}

/* ================= Part 8 · Millainen? (Lisää, sidan 67) ================= */
async function c13Mill(){if(scene!==lostS)await toLost();await review13();setMusic('home');
  for(const m of MILL13){showPic13(m.img,m.k);await say(P13C(m.l));showWord(m.a,m.sa,1200);await sleep(250);hidePic()}
  for(const m of shuffle(MILL13)){showPic13(m.img);const t=await mc11(shuffle([{t:m.a,ok:true},...shuffle(MILL13.filter(x=>x!==m)).slice(0,2).map(x=>({t:x.a}))]),{q:`Millainen ${m.k} on?`});hidePic();hit13('m-'+m.k,t);addPaws(t?1:3)}
  for(const m of shuffle(MILL13).slice(0,4)){showPic13(m.img);const t=await typeIt([m.a],`Millainen ${m.k} on? Skriv: ${m.k[0].toUpperCase()+m.k.slice(1)} on …`);hidePic();showWord(m.k+' on '+m.a,m.sv+' är '+m.sa,1500);hit13('m-'+m.k,t);addPaws(t?1:3)}
  // "lätt" again: kevyt or helppo?
  let t=await mc11(shuffle([{t:'kevyt',ok:true},{t:'helppo'}]),{q:'Höyhen on … (fjädern är lätt)'});addPaws(t?1:3);
  t=await mc11(shuffle([{t:'helppo',ok:true},{t:'kevyt'}]),{q:'Tehtävä on … (uppgiften är lätt)'});addPaws(t?1:3);await say(P13C(13));await praise()}

/* ================= Part 9 · Siili berättar, Siili lär sig svenska, provet ================= */
async function c13Test(){if(scene!==lostS)await toLost();setMusic('evening');await camHome13();
  for(let i=6;i<12;i++){play(rnd(['happy','think','present','point','shake']));await tell13(i);
    if(i===6){const t=await mc11(shuffle([{t:'juustolta',e:'🧀',s:'ost',ok:true},{t:'pizzalta',e:'🍕',s:'pizza'},{t:'kukalta',e:'🌸',s:'blomma'}]),{q:'Vad luktar t-tröjan?'});addPaws(t?1:3)}
    if(i===8){const t=await mc11(shuffle([{t:'N',ok:true},{t:'S'}]),{q:'På finska slutar namnet på …'});addPaws(t?1:3)}}
  // Siili writes Swedish – with the Finnish N
  setMusic('search');play('think');ask('Siili skriver på svenska …');await sleep(1000);
  for(const [wrong,ok,no] of[['Leon jacka är tunn.','Leos jacka är tunn.','Leo jacka är tunn.'],['Emman jacka är tjock.','Emmas jacka är tjock.','Emma jacka är tjock.']]){
    showWord(wrong,'Siili skrev …',2400);await sleep(1800);const t=await mc11(shuffle([{t:ok,ok:true},{t:wrong},{t:no}]),{q:'Siili satte ett finskt N! Vad är rätt på svenska?'});addPaws(t?1:3)}
  ask('Svenska: S. Finska: N. Siili tycker att svenskarna älskar S!');await sleep(2400);ask('');
  showWord('Koe!','prov',1800);await sleep(1200);
  const Q=[];for(const [w,v] of shuffle(Object.entries(ADJ13)).slice(0,4))Q.push({k:'a-'+w,f:async()=>{showPic13(v.img);const t=await typeIt([w],'Millainen se on? Skriv ordet');hidePic();return t},ok:()=>showWord(w,v.sv,1200)});
  for(const x of shuffle(NAMES13).slice(0,3))Q.push({k:'n-'+x.n,f:()=>typeIt([x.g],`Kenen? ${x.n} → …`),ok:()=>showWord(x.g,x.sv,1200)});
  for(const m of shuffle(MILL13).slice(0,3))Q.push({k:'m-'+m.k,f:async()=>{showPic13(m.img);const t=await typeIt([m.a],`Millainen ${m.k} on?`);hidePic();return t},ok:()=>showWord(m.k+' on '+m.a,'',1200)});
  for(const n of shuffle(NOUN13.filter(n=>n.img)).slice(0,2))Q.push({k:'s-'+n.k,f:async()=>{showPic13(n.img);const t=await typeIt(n.acc||[n.k],'Skriv på finska: '+n.sv);hidePic();return t},ok:()=>showWord(n.k,n.sv,1200)});
  Q.push({k:'kenen',f:()=>typeIt(['kenen'],'Vems? på finska'),ok:()=>showWord('Kenen?','Vems?',1200)});
  const need={};Q.forEach(q=>need[q.k]=2);const queue=shuffle(Q.concat(shuffle(Q)));let right=0;
  while(queue.length){const q=queue.shift();if(need[q.k]<=0)continue;const tt=await q.f();q.ok();if(tt){sfx('wrong',.3);queue.splice(Math.min(3,queue.length),0,q);addPaws(1)}else{need[q.k]--;right++;addPaws(2)}hit13(q.k,tt)}
  showWord(`${right} rätt på första försöket!`,'',2600);await praise();
  setMusic('evening');play('happy');await tr11(P13C(24));await tell13(11);play('curl');await tr11(P13C(25));ask('Hyvää yötä, koulu!');await sleep(1600);ask('');await sticker11(13)}

const PARTS13=[{n:'Löytötavarat',d:'Hittegodset öppnar',f:c13Open},{n:'Kenen? Millainen?',d:'Vems och hurdan',f:c13Ask},{n:'Vastakohdat',d:'Ny, gammal, ren, smutsig …',f:c13Opp},
  {n:'Etsivä',d:'Namnen får ett N',f:c13Etsiva},{n:'Omistajat tulevat',d:'Ägarna hämtar sina saker',f:c13Owners},{n:'Kirjoita ja kuuntele',d:'Skriv och lyssna',f:c13Write},
  {n:'Ristisanatehtävä',d:'Korsordet och Kotona',f:c13Cross},{n:'Millainen?',d:'Tio saker',f:c13Mill},{n:'Koe',d:'Provet och klistermärket',f:c13Test}];
CHS.push({n:'13 · Eetin skuutti',h:'Eetin skuutti',sub:'Kapitel 13 · Hittegodset',P:PARTS13,key:'done13'});st.done13??=[];
if(AUTO){const _v=window.__view;window.__view=async(n,q=0)=>{if(n==='lost'||n==='lostbox'||n==='lostguests'){await ready;setQuality(q);$('#menu').classList.add('hidden');$('#start')?.classList.add('hidden');await toLost();play('idle');
  if(n==='lostbox')await camBox13();if(n==='lostguests'){const a=await waitG13('pk');if(a){a.position.set(.36,0,.12);a.visible=true;a.rotation.y=-.4}const m=await waitG13('mato');if(m){m.position.set(-.3,0,.1);m.visible=true;m.userData.hat.visible=true}}return 'ok'}return _v(n,q)}}
