/* ================= Miljöer för kapitel 3 och 4 (2026-10-25 kväll, skiss) =================
   Lekplatsen (kapitel 3 · Kiva tavata!) och skolgården med äppelträdet (kapitel 4 · Yksi plus yksi).
   Kapitel 5 spelas på torget som redan finns (outS). Siili står på marken, y = 0, och allt runt
   omkring är i människostorlek, så att han ser liten och modig ut. */
function grassTex6(base='#6f8a42',n=6000,rep=16){return tex(canvas(512,512,(g,W,H)=>{g.fillStyle=base;g.fillRect(0,0,W,H);for(let i=0;i<n;i++){g.fillStyle=`rgba(${rnd(['40,70,20','150,170,60','190,150,60','90,120,40'])},${R01(.06,.25)})`;g.fillRect(Math.random()*W,Math.random()*H,2,R01(3,8))}}),[rep,rep])}
function tree6(S,x,z,h=4,cols=['#d9a441','#c46a2e','#b8402a','#e0b84a'],birch=false){const tm=birch?new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(64,256,(g,W,H)=>{g.fillStyle='#ece6da';g.fillRect(0,0,W,H);g.fillStyle='#2a2522';for(let k=0;k<26;k++)g.fillRect(R01(0,W),R01(0,H),R01(8,26),R01(2,5))}))}):M6('#5d4a3a');
  const t=new THREE.Mesh(new THREE.CylinderGeometry(.1,.2,h,10),tm);t.position.set(x,h/2,z);t.castShadow=true;S.add(t);
  for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(.8,1.4),2),M6(rnd(cols),{roughness:.9}));c.position.set(x+R01(-.6,.6),h+R01(-.4,.6),z+R01(-.6,.6));c.scale.y=R01(.8,1.1);c.castShadow=true;S.add(c)}}
function building6(S,x,z,w,h,d,wall,roof,{floors=1,ry=0,win='#33414f',door=true}={}){const G=new THREE.Group();bx6(G,w,h,d,M6(wall),0,h/2,0);
  const rs=new THREE.Shape();rs.moveTo(-w/2-.2,0);rs.lineTo(0,Math.min(1.6,w*.3));rs.lineTo(w/2+.2,0);rs.closePath();if(floors<3){const r=new THREE.Mesh(new THREE.ExtrudeGeometry(rs,{depth:d+.3,bevelEnabled:false}),M6(roof));r.position.set(0,h,-d/2-.15);G.add(r)}else bx6(G,w+.1,.15,d+.1,M6(roof),0,h+.07,0);
  const fh=h/floors,cols=Math.max(2,Math.round(w/1.4));for(let f=0;f<floors;f++)for(let c=0;c<cols;c++){const wx=-w/2+(c+.5)*w/cols;if(door&&f===0&&c===Math.floor(cols/2))continue;
    const lit=Math.random()<.35;const wm=new THREE.MeshStandardMaterial({color:lit?'#ffd590':win,emissive:new THREE.Color(lit?'#ffb860':'#000'),emissiveIntensity:lit?.8:0,roughness:.3});bx6(G,.7,.8,.06,M6('#f4efe6'),wx,f*fh+fh*.55,d/2+.02,false);bx6(G,.58,.68,.07,wm,wx,f*fh+fh*.55,d/2+.03,false)}
  if(door)bx6(G,.9,1.9,.08,M6('#7a4b2c'),0,.95,d/2+.03,false);G.position.set(x,0,z);G.rotation.y=ry;S.add(G);return G}

/* ---------- Kapitel 3: lekplatsen ---------- */
const playS=new THREE.Scene();let playBuilt=false;
function buildPlay(){if(playBuilt)return;playBuilt=true;const S=playS;S.background=outS.background;S.fog=new THREE.FogExp2('#e6d2b8',.022);
  lightRoom6(S,{sky:'#c9d8f0',ground:'#8a6a40',hemi:1.25,key:'#ffd8a8',keyI:3,keyPos:[-6,8,5],shadow:3.5});
  const gr=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshStandardMaterial({roughness:1,map:grassTex6()}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;S.add(gr);
  // soft rubber ground under the climbing frame and a sand path
  {const r=new THREE.Mesh(new THREE.CircleGeometry(2.6,48),new THREE.MeshStandardMaterial({color:'#b5573e',roughness:.95,map:paintTex6(256,256,'#b5573e')}));r.rotation.x=-Math.PI/2;r.position.set(1.9,.004,-3.6);r.receiveShadow=true;S.add(r)}
  {const p=new THREE.Mesh(new THREE.PlaneGeometry(1.4,30),new THREE.MeshStandardMaterial({color:'#d9bf94',roughness:1,map:paintTex6(256,256,'#d9bf94')}));p.rotation.x=-Math.PI/2;p.rotation.z=-.5;p.position.set(-.6,.003,-4);p.receiveShadow=true;S.add(p)}
  // sandbox in front, where Siili stands on the wooden edge
  {const G=new THREE.Group();const wood=new THREE.MeshStandardMaterial({map:tex(woodTex2('#b08a62','#7a5a3c'),[2,1]),roughness:.85});for(const [w,d,x,z] of[[2,.12,0,-.75],[2,.12,0,.75],[.12,1.6,-.95,0],[.12,1.6,.95,0]])bx6(G,w,.14,d,wood,x,.07,z);
   const sand=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.4,24,20),new THREE.MeshStandardMaterial({color:'#e6cf9a',roughness:1,map:paintTex6(256,256,'#e6cf9a')}));sand.rotation.x=-Math.PI/2;sand.position.y=.08;const pa=sand.geometry.attributes.position;for(let i=0;i<pa.count;i++)pa.setZ(i,Math.random()*.02);sand.geometry.computeVertexNormals();sand.receiveShadow=true;G.add(sand);
   const bucket=new THREE.Mesh(new THREE.CylinderGeometry(.08,.06,.12,20),M6('#e8423a',{roughness:.5}));bucket.position.set(.4,.14,.1);bucket.castShadow=true;G.add(bucket);
   const sp=new THREE.Group();bx6(sp,.03,.02,.24,M6('#3f74b8'),0,0,0);bx6(sp,.08,.015,.1,M6('#3f74b8'),0,0,.15);sp.position.set(.2,.1,.25);sp.rotation.set(.1,.6,.2);G.add(sp);
   {const castle=new THREE.Group();bx6(castle,.14,.1,.14,M6('#d9bf88',{roughness:1}),0,.13,0);for(const [x,z] of[[-.06,-.06],[.06,-.06],[-.06,.06],[.06,.06]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.025,.03,.06,10),M6('#d9bf88',{roughness:1}));t.position.set(x,.2,z);castle.add(t)}castle.position.set(-.3,0,-.2);G.add(castle)}
   G.position.set(1.5,0,-.9);S.add(G)}
  // climbing frame with monkey bars, like the picture on p. 10
  {const G=new THREE.Group();const wood=M6('#8a6440');for(const [x,z] of[[-1,-.6],[1,-.6],[-1,.6],[1,.6]])bx6(G,.12,2.2,.12,wood,x,1.1,z);
   for(let i=0;i<9;i++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1.2,8),M6('#d9a441',{metalness:.4,roughness:.4}));r.rotation.x=Math.PI/2;r.position.set(-1+i*.25,2.1,0);G.add(r)}
   for(const z of[-.6,.6]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,2.1,8),wood);r.rotation.z=Math.PI/2;r.position.set(0,2.1,z);G.add(r)}
   const net=new THREE.Mesh(new THREE.PlaneGeometry(1.2,1.6),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,transparent:true,alphaTest:.5,map:tex(canvas(128,170,(g,W,H)=>{g.strokeStyle='#e8e0cc';g.lineWidth=5;for(let x=0;x<=W;x+=21){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}for(let y=0;y<=H;y+=21){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}g.fillStyle='#f2c230';for(let x=0;x<=W;x+=21)for(let y=0;y<=H;y+=21){g.beginPath();g.arc(x,y,4,0,7);g.fill()}}))}));
   net.position.set(-1,1.05,0);net.rotation.y=Math.PI/2;G.add(net);G.traverse(o=>{if(o.isMesh)o.castShadow=true});G.position.set(1.9,0,-3.6);G.rotation.y=-.35;S.add(G)}
  // swings
  {const G=new THREE.Group();const pm=M6('#3f74b8',{metalness:.4,roughness:.4});for(const s of[-1.4,1.4])for(const t of[-1,1]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,2.5,10),pm);l.position.set(s,1.2,t*.45);l.rotation.x=-t*.2;G.add(l)}
   const top=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,3,10),pm);top.rotation.z=Math.PI/2;top.position.y=2.4;G.add(top);
   for(const x of[-.55,.55]){const sw=new THREE.Group();for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,1.8,6),M6('#9a9a9a',{metalness:.7}));c.position.set(s*.22,-.9,0);sw.add(c)}bx6(sw,.5,.05,.2,M6('#c23a2b',{roughness:.6}),0,-1.8,0);sw.position.set(x,2.4,0);G.add(sw);
     (function tick(now){requestAnimationFrame(tick);if(scene!==playS)return;sw.rotation.x=Math.sin(now/900+x*3)*.08})(0)}
   G.traverse(o=>{if(o.isMesh)o.castShadow=true});G.position.set(-2.6,0,-4.6);G.rotation.y=.4;S.add(G)}
  // slide
  {const G=new THREE.Group();const wood=M6('#8a6440');for(const [x,z] of[[-.35,-.35],[.35,-.35],[-.35,.35],[.35,.35]])bx6(G,.08,1.3,.08,wood,x,.65,z);bx6(G,.8,.06,.8,wood,0,1.3,0);
   for(let i=0;i<5;i++)bx6(G,.6,.04,.08,wood,0,.25+i*.24,-.45-i*.0);
   const sl=new THREE.Mesh(new THREE.BoxGeometry(.55,.04,2.2),M6('#f2c230',{roughness:.3,metalness:.1}));sl.position.set(0,.68,1.35);sl.rotation.x=.62;G.add(sl);for(const s of[-1,1]){const rl=new THREE.Mesh(new THREE.BoxGeometry(.04,.14,2.2),M6('#f2c230',{roughness:.3}));rl.position.set(s*.29,.75,1.33);rl.rotation.x=.62;G.add(rl)}
   G.traverse(o=>{if(o.isMesh)o.castShadow=true});G.position.set(-2.4,0,-2.6);G.rotation.y=2.2;S.add(G)}
  // a small football goal with a net, and a ball
  {const G=new THREE.Group();const wm=M6('#f4f4f4',{roughness:.5});for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.2,10),wm);p.position.set(s,.6,0);G.add(p)}const cb=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,2.08,10),wm);cb.rotation.z=Math.PI/2;cb.position.y=1.2;G.add(cb);
   const net=new THREE.Mesh(new THREE.PlaneGeometry(2,1.2),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,transparent:true,alphaTest:.4,map:tex(canvas(200,120,(g,W,H)=>{g.strokeStyle='#ffffff';g.lineWidth=2;for(let x=0;x<=W;x+=10){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}for(let y=0;y<=H;y+=10){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}}))}));net.position.set(0,.6,-.5);net.rotation.x=-.25;G.add(net);
   G.position.set(-3.2,0,-6.5);G.rotation.y=.2;S.add(G);const ball=new THREE.Mesh(new THREE.SphereGeometry(.11,24,16),M6('#c8352b',{roughness:.5}));ball.position.set(-.55,.11,-.7);ball.castShadow=true;S.add(ball)}
  // the three kinds of houses from the Lisää page: kerrostalo, rivitalo, omakotitalo
  building6(S,-6,-13,9,9,6,'#e6d8c0','#6a6a6a',{floors:4,ry:.25});
  {const G=new THREE.Group();for(let i=0;i<4;i++)building6(G,i*3.1,0,3,2.6,5,['#e8c9a0','#b8c9a8','#e8b8a0','#c9c0dc'][i],'#5a4a40',{floors:1});G.position.set(2.5,0,-11.5);G.rotation.y=-.2;S.add(G)}
  building6(S,10,-8,4.4,3,4.5,'#9b2f24','#3a3634',{floors:1,ry:-.6});
  // benches, lamp posts, a fence and trees all round
  for(const [x,z,r] of[[2.8,.6,-.9],[-3.4,-1.6,.7]]){const b=new THREE.Group();for(let i=0;i<3;i++)bx6(b,1.4,.04,.1,M6('#7a5434'),0,.42,i*.12-.12);bx6(b,1.4,.3,.04,M6('#7a5434'),0,.65,-.2);for(const s of[-1,1])bx6(b,.06,.56,.4,M6('#2f3a34',{metalness:.5}),s*.6,.14,-.05);b.position.set(x,0,z);b.rotation.y=r;S.add(b)}
  for(let i=0;i<22;i++){const x=-9+i*.85;bx6(S,.08,.8,.04,M6('#f4efe6'),x,.4,-8.2)}bx6(S,18.6,.06,.03,M6('#f4efe6'),.0,.6,-8.18);bx6(S,18.6,.06,.03,M6('#f4efe6'),.0,.25,-8.18);
  for(const [x,z,b] of[[-4.6,-5,true],[4.6,-4.6,false],[-6.5,-1,false],[6,-1.6,true],[0.5,-7.5,true],[-1.8,-9.8,false],[7.5,-6,false]])tree6(S,x,z,R01(3.5,5),undefined,b);
  for(const [x,z] of[[-1.2,-1.8],[3.4,-1.2]]){const G=new THREE.Group();const pm=M6('#2f3a34',{metalness:.5,roughness:.4});const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.045,2.6,12),pm);pole.position.y=1.3;G.add(pole);
    const lamp=new THREE.Mesh(new THREE.SphereGeometry(.13,20,16),new THREE.MeshStandardMaterial({color:'#fff2d0',emissive:new THREE.Color('#ffc070'),emissiveIntensity:1.6}));lamp.position.y=2.65;G.add(lamp);G.position.set(x,0,z);S.add(G)}
  motes6(S,0,1.4,-1.6,3,1.2,2.5,140,'#fff0d0');
}
const PLAY_CAM=[new THREE.Vector3(.05,.36,1.1),new THREE.Vector3(.1,.3,-1)];
async function toPlay(){await goScene(playS,buildPlay,PLAY_CAM[0],PLAY_CAM[1]);putSiiliIn(playS,0,0,0)}

/* ---------- Kapitel 4: skolgården med äppelträdet ---------- */
const appleS=new THREE.Scene();let appleBuilt=false;const apples6=[];
function buildApple(){if(appleBuilt)return;appleBuilt=true;const S=appleS;S.background=outS.background;S.fog=new THREE.FogExp2('#e8d4ba',.024);
  lightRoom6(S,{sky:'#d0dcf0',ground:'#8a6a40',hemi:1.2,key:'#ffd2a0',keyI:3.1,keyPos:[5,8,5],shadow:3.5});
  // asphalt yard with a hopscotch 1–10 painted on it, and a patch of grass under the tree
  const asph=new THREE.Mesh(new THREE.PlaneGeometry(40,30),new THREE.MeshStandardMaterial({roughness:.95,map:tex(canvas(1024,768,(g,W,H)=>{g.fillStyle='#6f6a66';g.fillRect(0,0,W,H);for(let i=0;i<12000;i++){g.fillStyle=`rgba(${rnd(['30,30,30','200,200,190','120,110,100'])},${R01(.05,.2)})`;g.fillRect(Math.random()*W,Math.random()*H,R01(1,3),R01(1,3))}
    const cx=W*.62,cy=H*.62,s=34;g.strokeStyle='rgba(255,250,240,.85)';g.lineWidth=5;g.fillStyle='rgba(255,250,240,.85)';g.font='700 34px "Baloo 2", sans-serif';g.textAlign='center';g.textBaseline='middle';
    const cells=[[0,0,1],[0,1,2],[-.5,2,3],[.5,2,4],[0,3,5],[-.5,4,6],[.5,4,7],[0,5,8],[-.5,6,9],[.5,6,10]];for(const [x,y,n] of cells){const px=cx+x*s*2,py=cy-y*s*2;g.strokeRect(px-s,py-s,s*2,s*2);g.fillText(n,px,py)}}))}));
  asph.rotation.x=-Math.PI/2;asph.position.set(0,-.005,-5);asph.receiveShadow=true;S.add(asph);
  const gp=new THREE.Mesh(new THREE.CircleGeometry(3.4,48),new THREE.MeshStandardMaterial({roughness:1,map:grassTex6('#6f8a42',3000,6)}));gp.rotation.x=-Math.PI/2;gp.position.set(0,.002,-1.2);gp.receiveShadow=true;S.add(gp);
  // a patch of dark soil where Siili will dig for the bone
  {const d=new THREE.Mesh(new THREE.CircleGeometry(.45,32),new THREE.MeshStandardMaterial({color:'#5a3f2a',roughness:1,map:paintTex6(128,128,'#5a3f2a')}));d.rotation.x=-Math.PI/2;d.position.set(.75,.004,.15);d.receiveShadow=true;S.add(d)}
  // the apple tree: a thick trunk, branches, a big round crown and ten apples that can fall
  {const T=new THREE.Group();const bark=new THREE.MeshStandardMaterial({roughness:.95,map:tex(canvas(128,256,(g,W,H)=>{g.fillStyle='#6a4c36';g.fillRect(0,0,W,H);for(let i=0;i<60;i++){g.strokeStyle=`rgba(30,20,10,${R01(.2,.5)})`;g.lineWidth=R01(1,4);g.beginPath();const x=R01(0,W);g.moveTo(x,0);g.lineTo(x+R01(-10,10),H);g.stroke()}}),[1,1])});
   const tr=new THREE.Mesh(new THREE.CylinderGeometry(.22,.34,2.2,14),bark);tr.position.y=1.1;T.add(tr);
   for(const [a,l,h] of[[.4,1.4,1.9],[2.2,1.3,2],[3.8,1.2,1.85],[5.2,1.3,2.1]]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.06,.13,l,8),bark);b.position.set(Math.cos(a)*l*.35,h+.35,Math.sin(a)*l*.35);b.rotation.set(Math.sin(a)*.9,0,-Math.cos(a)*.9);T.add(b)}
   const leaf=['#5f8a3e','#6f9a46','#4f7a36','#7aa04a'];for(let k=0;k<11;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(.7,1.05),2),M6(rnd(leaf),{roughness:.9}));const a=k/11*Math.PI*2;c.position.set(Math.cos(a)*R01(.5,1.1),R01(2.5,3.3),Math.sin(a)*R01(.5,1.1));c.castShadow=true;T.add(c)}
   const top=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1,2),M6('#6f9a46',{roughness:.9}));top.position.y=3.5;top.castShadow=true;T.add(top);
   T.traverse(o=>{if(o.isMesh)o.castShadow=true});T.position.set(-.4,0,-1.6);T.scale.setScalar(.8);S.add(T);
   const am=M6('#c8352b',{roughness:.35});for(let i=0;i<10;i++){const a=i/10*Math.PI*2+.3;const ap=new THREE.Group();const sp=new THREE.Mesh(new THREE.SphereGeometry(.09,18,14),am);sp.scale.y=.9;ap.add(sp);const st_=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.05,6),M6('#4a3426'));st_.position.y=.08;ap.add(st_);
     const lf=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),M6('#4f8a3a'));lf.scale.set(1.4,.3,.8);lf.position.set(.03,.1,0);ap.add(lf);
     const col=i%5,row=Math.floor(i/5);const dx=-1+col*.5+(row?.25:0)+R01(-.08,.08),ht=row?R01(1.85,2.05):R01(2.35,2.6);const home=new THREE.Vector3(-.4+dx,ht,-1.6+1.3-Math.abs(dx)*.35);ap.position.copy(home);ap.userData.home=home.clone();ap.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(ap);apples6.push(ap)}}
  // a basket and some fallen apples
  {const G=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.17,.22,24,1,true),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,roughness:.9,map:tex(canvas(128,64,(g,W,H)=>{g.fillStyle='#b08a52';g.fillRect(0,0,W,H);g.strokeStyle='#7a5a32';g.lineWidth=3;for(let x=0;x<W;x+=8){g.beginPath();g.moveTo(x,0);g.lineTo(x+4,H);g.stroke()}for(let y=0;y<H;y+=8){g.beginPath();g.moveTo(0,y);g.lineTo(W,y+2);g.stroke()}}),[4,1])}));b.position.y=.11;G.add(b);
   const bt=new THREE.Mesh(new THREE.CircleGeometry(.17,24),M6('#7a5a32'));bt.rotation.x=-Math.PI/2;bt.position.y=.01;G.add(bt);G.position.set(-.55,0,.05);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G);appleS.userData.basket=G}
  // the school: a long brick wall with tall windows, a door and a clock
  {const brick=new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(512,256,(g,W,H)=>{g.fillStyle='#c8c0b4';g.fillRect(0,0,W,H);for(let y=0;y<H;y+=16)for(let x=-(y/16%2)*16;x<W;x+=32){g.fillStyle=`hsl(${R01(8,18)},${R01(40,55)}%,${R01(32,42)}%)`;g.fillRect(x+1,y+1,30,14)}}),[8,3])});
   bx6(S,26,7,.6,brick,0,3.5,-9);for(let i=0;i<8;i++){const x=-10.5+i*3;if(i===4)continue;bx6(S,1.6,2.2,.08,M6('#f4efe6'),x,3.6,-8.68,false);bx6(S,1.4,2,.09,new THREE.MeshStandardMaterial({color:'#3a4a5a',roughness:.2,metalness:.2}),x,3.6,-8.66,false)}
   bx6(S,1.6,2.4,.1,M6('#2f5a8a'),1.5,1.2,-8.66,false);bx6(S,26.5,.4,.8,M6('#5a4a40'),0,7.1,-9);clock6(S,1.5,5.4,-8.62,0,.4)}
  // flagpole with the Finnish flag, a bike rack, a bench, trees along the edge
  {const p=new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,7,10),M6('#e8e8e8',{metalness:.5}));p.position.set(5,3.5,-6);S.add(p);
   const f=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.86,10,4),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:tex(canvas(140,86,(g,W,H)=>{g.fillStyle='#fff';g.fillRect(0,0,W,H);g.fillStyle='#1f4fa3';g.fillRect(40,0,22,H);g.fillRect(0,32,W,22)}))}));f.position.set(5.72,6.4,-6);S.add(f);
   (function tick(now){requestAnimationFrame(tick);if(scene!==appleS)return;const pa=f.geometry.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i)+.7;pa.setZ(i,Math.sin(now/300+x*4)*.06*x)}pa.needsUpdate=true})(0)}
  for(let i=0;i<6;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.35,.025,8,24,Math.PI),M6('#3a3a3a',{metalness:.6}));r.position.set(-6+i*.5,0,-7.4);S.add(r)}
  {const b=new THREE.Group();for(let i=0;i<3;i++)bx6(b,1.4,.04,.1,M6('#7a5434'),0,.42,i*.12-.12);bx6(b,1.4,.3,.04,M6('#7a5434'),0,.65,-.2);for(const s of[-1,1])bx6(b,.06,.56,.4,M6('#2f3a34',{metalness:.5}),s*.6,.14,-.05);b.position.set(2.6,0,-1.2);b.rotation.y=-.5;S.add(b)}
  for(const [x,z] of[[-7,-5],[8,-4],[-9,-1.5],[9.5,-1],[-4.5,-7.5],[6.5,-7.8]])tree6(S,x,z,R01(3.5,5));
  {const ball=new THREE.Mesh(new THREE.SphereGeometry(.11,24,16),M6('#3f74b8',{roughness:.5}));ball.position.set(1.8,.11,-2.6);ball.castShadow=true;S.add(ball)}
  motes6(S,-.4,1.5,-1,2.5,1.2,2,120,'#fff0d0');
}
const APPLE_CAM=[new THREE.Vector3(.1,.6,2.7),new THREE.Vector3(-.3,1.45,-1.4)];
async function toApple(){await goScene(appleS,buildApple,APPLE_CAM[0],APPLE_CAM[1]);putSiiliIn(appleS,.25,0,-.95)}
/* one apple falls from the tree and rolls a little */
function dropApple6(i){const a=apples6[i];if(!a)return Promise.resolve();const p0=a.position.clone(),land=new THREE.Vector3(p0.x+R01(-.3,.3),.07,p0.z+R01(.2,.6));const t0=performance.now(),T=Math.sqrt(2*p0.y/9.8)*1000;
  return new Promise(r=>{(function s(){const t=performance.now()-t0;if(t<T){const k=t/T;a.position.set(p0.x+(land.x-p0.x)*k,p0.y-4.9*(t/1000)**2,p0.z+(land.z-p0.z)*k);a.rotation.x+=.2;requestAnimationFrame(s)}else{a.position.copy(land);sfx('rustle',.15);r()}})()})}
function resetApples6(){apples6.forEach(a=>{a.position.copy(a.userData.home);a.rotation.set(0,0,0)})}
