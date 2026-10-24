/* ---------- Siili's home: a little flat behind a door under Juni's stairs (2026-10-24) ----------
   Steve: the earth burrow was not cosy enough to spend lessons in. Now that Siili walks on two legs he lives like a
   person: a kitchen on the left, the living room in the middle and his bedroom on the right, seen like a doll's house.
   Nordic and cosy: patterned wallpaper, oak floor, windows with daylight, warm lamps. Furniture: CC0 copies in furn2/
   (KayKit, Kenney, Tiny Treats; see furn2/LICENSES.md), nothing loaded from Love's folders. */
const ROOM={back:-.6,front:.5,h:.56,kitchen:[-1.5,-.5],living:[-.5,.5],bed:[.5,1.5]};
const HOME_SPOTS={pulla:[-1.0,.152,.0,.08],pallo:[.2,.0,.32,.09],matto:[-.02,.003,.06,.55],mato:[1.15,.0,.25,.16],kukka:[-.38,.0,.28,.2],lamppu:[1.3,.162,-.5,.15],kuppi:[.12,.056,-.18,.045],sukka:[.76,.0,.12,.3]};
/* where Siili cannot walk: furniture and the two half walls between the rooms */
const HOME_OBST=[{x:-1.3,z:-.5,r:.18},{x:-.95,z:-.5,r:.16},{x:-.68,z:-.5,r:.11},{x:-1.0,z:.0,r:.17},{x:-1.22,z:.0,r:.06},{x:-.78,z:.0,r:.06},
  {x:-.5,z:-.55,r:.06},{x:-.5,z:-.42,r:.06},{x:-.5,z:-.3,r:.06},{x:.5,z:-.55,r:.06},{x:.5,z:-.42,r:.06},{x:.5,z:-.3,r:.06},
  {x:-.06,z:-.44,r:.13},{x:.2,z:-.44,r:.13},{x:.08,z:-.18,r:.1},{x:-.4,z:-.2,r:.08},{x:.42,z:-.5,r:.06},{x:-.36,z:-.52,r:.07},{x:.43,z:-.32,r:.06},{x:.4,z:.1,r:.1},
  {x:1.0,z:-.48,r:.12},{x:1.0,z:-.26,r:.12},{x:1.3,z:-.52,r:.06},{x:1.4,z:.15,r:.05}];
let homeCam='follow';
function homeCamTarget(){
  if(homeCam==='wide')return [new THREE.Vector3(0,.6,1.9),new THREE.Vector3(0,.12,-.1)];
  const x=siili&&siili.parent===homeS?THREE.MathUtils.clamp(siili.position.x,-1.0,1.0):0;
  return [new THREE.Vector3(x*.9,.32,1.22),new THREE.Vector3(x*.9,.1,-.18)];
}
function homeCamStep(dt){R.toneMappingExposure=scene===homeS?.9:1.15;if(scene!==homeS||homeCam==='free')return;const [p,l]=homeCamTarget();const k=1-Math.exp(-dt*(homeCam==='wide'?2.2:1.6));cam.position.lerp(p,k);camLook.lerp(l,k)}
function fitModel(m,{h,w}){const b=new THREE.Box3().setFromObject(m);const s=b.getSize(new THREE.Vector3());const k=h?h/s.y:w/Math.max(s.x,s.z);m.scale.multiplyScalar(k);
  const b2=new THREE.Box3().setFromObject(m);const c=b2.getCenter(new THREE.Vector3());m.position.x-=c.x;m.position.z-=c.z;m.position.y-=b2.min.y;return m}
async function furn(H,f,x,y,z,ry,size,opts={}){
  try{const g=await load('furn2/'+f+'.glb');const inner=g.scene;fitModel(inner,size);const m=new THREE.Group();m.add(inner);m.position.set(x,y,z);m.rotation.y=ry;
    m.traverse(o=>{if(o.isMesh){o.castShadow=opts.shadow!==false;o.receiveShadow=true;const mt=o.material;if(mt){mt.roughness=Math.max(mt.roughness??.6,.55);mt.envMapIntensity=.7}}});H.add(m);return m}catch(e){console.warn(f,e)}
}
/* painted wallpapers: soft, slightly uneven, like a picture book */
function wallpaper(kind){return canvas(512,512,(g,w,h)=>{
  const bg={living:'#b9cdb0',kitchen:'#ecd79c',bed:'#e8bcc4'}[kind];g.fillStyle=bg;g.fillRect(0,0,w,h);
  for(let i=0;i<2500;i++){g.fillStyle=`rgba(${Math.random()<.5?'255,255,255':'90,70,60'},${Math.random()*.04})`;g.fillRect(Math.random()*w,Math.random()*h,R01(1,4),R01(1,4))}
  if(kind==='living'){for(let y=0;y<h;y+=64)for(let x=(y/64)%2?32:0;x<w;x+=64){g.save();g.translate(x+16,y+20);g.strokeStyle='#8fa98a';g.lineWidth=3;g.beginPath();g.moveTo(0,22);g.quadraticCurveTo(2,6,0,-8);g.stroke();
    g.fillStyle='#a7bf9e';for(const s of[-1,1]){g.beginPath();g.ellipse(s*7,4,7,3.5,s*.6,0,7);g.fill()}g.fillStyle='#f6f1e4';g.beginPath();g.arc(0,-10,4,0,7);g.fill();g.restore()}}
  if(kind==='bed'){for(let x=0;x<w;x+=42){g.fillStyle='rgba(255,255,255,.35)';g.fillRect(x,0,14,h);g.fillStyle='rgba(205,140,150,.25)';g.fillRect(x+20,0,3,h)}
    for(let y=20;y<h;y+=84)for(let x=28;x<w;x+=84){g.fillStyle='#e8a9b4';g.beginPath();g.arc(x-3,y,4,0,7);g.arc(x+3,y,4,0,7);g.fill();g.beginPath();g.moveTo(x-7,y+1);g.lineTo(x,y+9);g.lineTo(x+7,y+1);g.fill()}}
  if(kind==='kitchen'){for(let y=0;y<h;y+=56)for(let x=(y/56)%2?28:0;x<w;x+=56){g.fillStyle='#e0b45a';g.beginPath();g.arc(x+14,y+16,6,0,7);g.fill();g.fillStyle='#7aa35a';g.beginPath();g.ellipse(x+21,y+10,5,2.5,-.6,0,7);g.fill()}}
})}
function tiles(){return canvas(256,256,(g,w,h)=>{g.fillStyle='#e9eef0';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=0;x<w;x+=32){g.fillStyle=`hsl(205,${R01(35,50)}%,${R01(78,86)}%)`;g.fillRect(x+2,y+2,28,28);
  if((x/32+y/32)%3===0){g.strokeStyle='#4f7fa8';g.lineWidth=2;g.beginPath();g.arc(x+16,y+16,7,0,7);g.stroke();g.beginPath();g.moveTo(x+16,y+6);g.lineTo(x+16,y+26);g.moveTo(x+6,y+16);g.lineTo(x+26,y+16);g.stroke()}}})}
function oakFloor(){return canvas(1024,1024,(g,w,h)=>{const bw=64;for(let x=0;x<w;x+=bw){let y=-Math.random()*300;while(y<h){const L=R01(220,420);g.fillStyle=`hsl(${R01(26,32)},${R01(38,48)}%,${R01(52,62)}%)`;g.fillRect(x,y,bw,L);
  for(let i=0;i<14;i++){g.strokeStyle=`rgba(110,70,40,${R01(.06,.16)})`;g.lineWidth=R01(.6,1.6);g.beginPath();const xx=x+R01(4,bw-4);g.moveTo(xx,y);g.bezierCurveTo(xx+R01(-6,6),y+L*.3,xx+R01(-6,6),y+L*.7,xx+R01(-3,3),y+L);g.stroke()}
  g.fillStyle='rgba(70,40,20,.5)';g.fillRect(x,y,bw,2);y+=L}g.fillStyle='rgba(70,40,20,.45)';g.fillRect(x,0,2,h)}})}
function windowView(){return canvas(256,320,(g,w,h)=>{const s=g.createLinearGradient(0,0,0,h);s.addColorStop(0,'#9fc3e6');s.addColorStop(.6,'#e8d9c4');s.addColorStop(1,'#f3c9a0');g.fillStyle=s;g.fillRect(0,0,w,h);
  g.fillStyle='rgba(255,255,255,.75)';for(const[x,y,r]of[[60,70,26],[90,64,20],[180,110,22],[205,104,16]]){g.beginPath();g.arc(x,y,r,0,7);g.fill()}
  const roofs=['#b05a3c','#c98a4b','#7d4a3a','#a86b52'];for(let i=0;i<6;i++){const x=i*46-10,bw=R01(40,60),bh=R01(60,120);g.fillStyle=['#e7cfa6','#d9a98a','#f0e2c4','#c9b49a'][i%4];g.fillRect(x,h-bh,bw,bh);g.fillStyle=roofs[i%4];g.beginPath();g.moveTo(x-4,h-bh);g.lineTo(x+bw/2,h-bh-26);g.lineTo(x+bw+4,h-bh);g.fill();
    g.fillStyle='#ffd98a';for(let k=0;k<3;k++)g.fillRect(x+8+k*14,h-bh+18,7,10)}
  g.fillStyle='#6f8f4f';for(let i=0;i<8;i++){g.beginPath();g.arc(R01(0,w),h-R01(0,20),R01(14,26),0,7);g.fill()}})}
async function buildHome(){
  const H=homeS;homeS.background=new THREE.Color('#2a1d1a');
  const [kx0,kx1]=ROOM.kitchen,[lx0,lx1]=ROOM.living,[bx0,bx1]=ROOM.bed,B=ROOM.back,F=ROOM.front,WH=ROOM.h;
  // floor: one oak floor through all three rooms
  {const t=tex(oakFloor(),[3,1]);const f=new THREE.Mesh(new THREE.PlaneGeometry(3,F-B),new THREE.MeshStandardMaterial({map:t,roughness:.62,color:'#d9b58f'}));f.rotation.x=-Math.PI/2;f.position.set(0,0,(F+B)/2);f.receiveShadow=true;H.add(f);
   // the doll's-house edge: a thick base under the floor
   const base=new THREE.Mesh(new THREE.BoxGeometry(3.04,.06,F-B+.04),M('#efe6d6'));base.position.set(0,-.031,(F+B)/2);H.add(base)}
  // walls: back wall per room with its wallpaper, white skirting, a picture rail and a dark cut edge on top
  const wall=(x0,x1,kind)=>{const t=tex(wallpaper(kind),[(x1-x0)*2.2,WH*2.2]);const w=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0,WH),new THREE.MeshStandardMaterial({map:t,roughness:.95}));w.position.set((x0+x1)/2,WH/2,B);w.receiveShadow=true;H.add(w);
    const sk=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,.028,.008),M('#f7f2e8'));sk.position.set((x0+x1)/2,.014,B+.004);sk.receiveShadow=true;H.add(sk);
    const rail=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,.008,.006),M('#f7f2e8'));rail.position.set((x0+x1)/2,WH*.78,B+.003);H.add(rail);
    const top=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,.02,.035),M('#efe6d6'));top.position.set((x0+x1)/2,WH+.01,B-.012);H.add(top)};
  wall(kx0,kx1,'kitchen');wall(lx0,lx1,'living');wall(bx0,bx1,'bed');
  // end walls at the far left and right, so it reads as a doll's house
  for(const[x,kind]of[[kx0,'kitchen'],[bx1,'bed']]){const t=tex(wallpaper(kind),[1.2,1.2]);const w=new THREE.Mesh(new THREE.PlaneGeometry(.55,WH),new THREE.MeshStandardMaterial({map:t,roughness:.95,side:THREE.DoubleSide}));w.position.set(x,WH/2,B+.275);w.rotation.y=Math.PI/2;w.receiveShadow=true;H.add(w)}
  // half walls between the rooms, with a doorway gap at the front
  for(const x of[lx0,lx1]){const kindL=x<0?'kitchen':'living',kindR=x<0?'living':'bed';
    for(const[s,kind]of[[-1,kindL],[1,kindR]]){const t=tex(wallpaper(kind),[1,1.2]);const p=new THREE.Mesh(new THREE.PlaneGeometry(.36,WH),new THREE.MeshStandardMaterial({map:t,roughness:.95}));p.position.set(x+s*.013,WH/2,B+.18);p.rotation.y=s*Math.PI/2;p.receiveShadow=true;p.castShadow=true;H.add(p)}
    const edge=new THREE.Mesh(new THREE.BoxGeometry(.026,WH+.01,.02),M('#efe6d6'));edge.position.set(x,WH/2,B+.36);edge.castShadow=true;H.add(edge);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(.03,.02,.37),M('#efe6d6'));cap.position.set(x,WH+.01,B+.18);H.add(cap)}
  // kitchen backsplash tiles
  {const t=tex(tiles(),[3.2,.6]);const sp=new THREE.Mesh(new THREE.PlaneGeometry(.56,.12),new THREE.MeshStandardMaterial({map:t,roughness:.35}));sp.position.set(-.84,.28,B+.002);H.add(sp)}
  // windows with daylight: one per room
  const view=tex(windowView());
  const win=(x,y,w,h)=>{const g=new THREE.Group();const pane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:view,toneMapped:false,color:'#f2ecdf'}));g.add(pane);
    const fm=M('#f7f2e8');for(const[px,py,sw,sh]of[[0,h/2,w+.02,.014],[0,-h/2,w+.02,.014],[-w/2,0,.014,h+.02],[w/2,0,.014,h+.02],[0,0,.008,h],[0,h*.08,w,.008]]){const b=new THREE.Mesh(new THREE.BoxGeometry(sw,sh,.012),fm);b.position.set(px,py,.004);b.castShadow=true;g.add(b)}
    const sill=new THREE.Mesh(new THREE.BoxGeometry(w+.04,.01,.03),fm);sill.position.set(0,-h/2-.008,.012);g.add(sill);
    // curtains: soft linen with a gentle wave, tied back
    const cm=new THREE.MeshStandardMaterial({color:'#f4ead8',roughness:1,side:THREE.DoubleSide});
    for(const s of[-1,1]){const cg=new THREE.PlaneGeometry(w*.32,h+.06,8,8);const p=cg.attributes.position;for(let i=0;i<p.count;i++){const px=p.getX(i),py=p.getY(i);p.setZ(i,Math.sin(px*120)*.004+.012);p.setX(i,px*(1-.35*Math.max(0,-(py)/(h)+.1)))}cg.computeVertexNormals();
      const c=new THREE.Mesh(cg,cm);c.position.set(s*(w/2+.005),.01,.012);c.castShadow=true;g.add(c)}
    const rod=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,w+.1,8),M('#8a6a4a'));rod.rotation.z=Math.PI/2;rod.position.set(0,h/2+.03,.02);g.add(rod);
    g.position.set(x,y,B+.002);H.add(g);
    const sun=new THREE.SpotLight('#cfe2ff',1.6,1.6,.7,.9,1.2);sun.position.set(x,y+.05,B+.06);sun.target.position.set(x+.05,0,B+.6);H.add(sun,sun.target);return g};
  win(-1.1,.42,.18,.15);win(-.12,.34,.2,.2);win(1.22,.36,.15,.15);
  // lights: low warm fill, a key over the living room, lamps that glow
  homeS.add(new THREE.HemisphereLight('#ffe2bf','#4a3040',.32));
  {const key=new THREE.SpotLight('#ffd2a0',2.6,2.6,.8,.9,1.3);key.position.set(.2,.9,.8);key.target.position.set(0,0,-.15);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.radius=8;key.shadow.bias=-.001;H.add(key,key.target)}
  const glow=(x,y,z,c,i,d)=>{const l=new THREE.PointLight(c,i,d,1.6);l.position.set(x,y,z);H.add(l);return l};
  homeLamp=glow(.42,.42,-.46,'#ffb766',1.8,1.3);glow(1.3,.26,-.48,'#ffb06a',1.0,.9);
  {const shade=new THREE.Mesh(new THREE.ConeGeometry(.045,.04,24,1,true),new THREE.MeshStandardMaterial({color:'#e9c46a',roughness:.6,side:THREE.DoubleSide,emissive:new THREE.Color('#ffb44a'),emissiveIntensity:.35}));shade.position.set(-1.0,.44,.0);H.add(shade);
   const cord=new THREE.Mesh(new THREE.CylinderGeometry(.0012,.0012,.14,4),M('#2c2420'));cord.position.set(-1.0,.53,.0);H.add(cord);
   const bulb=new THREE.Mesh(new THREE.SphereGeometry(.01,12,8),new THREE.MeshBasicMaterial({color:'#fff1c4'}));bulb.position.set(-1.0,.42,.0);H.add(bulb);glow(-1.0,.4,.0,'#ffc27a',1.4,1.1)}
  // ---- kitchen ----
  await Promise.all([
    furn(H,'tinytreats-kitchen_fridge',-1.3,0,-.5,0,{h:.36}),
    furn(H,'tinytreats-kitchen_stove',-.95,0,-.5,0,{h:.2}),
    furn(H,'kenney_kitchenSink',-.68,0,-.5,Math.PI,{h:.22}),
    furn(H,'tinytreats-kitchen_wall_shelf_kitchen_hooks_decorated',-.9,.46,B+.04,0,{w:.26}),
    furn(H,'kaykit_table_medium',-1.0,0,.0,0,{h:.15}),
    furn(H,'kaykit_chair_A_wood',-1.22,0,.0,Math.PI/2,{h:.2}),
    furn(H,'kaykit_chair_A_wood',-.78,0,.0,-Math.PI/2,{h:.2}),
    // 2026-10-24: the KayKit oval rug was a plain beige board too; a braided oval rag rug instead
    (()=>{const rt=tex(canvas(512,512,(g,w,h)=>{const cols=['#c9785f','#e8d3b8','#7fa3b5','#e8d3b8','#d9a35e','#e8d3b8','#b8869a'];
      for(let r=256,i=0;r>0;r-=13,i++){g.fillStyle=cols[i%cols.length];g.beginPath();g.arc(256,256,r,0,Math.PI*2);g.fill()}
      for(let k=0;k<16000;k++){g.fillStyle=`rgba(${Math.random()<.5?'255,255,255':'70,40,30'},${(Math.random()*.1).toFixed(3)})`;g.fillRect(Math.random()*w,Math.random()*h,2,3)}}),[1,1]);
     const r=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.005,64),new THREE.MeshStandardMaterial({map:rt,roughness:1}));
     r.geometry.attributes.uv&&(()=>{const p=r.geometry.attributes.position,uv=r.geometry.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)+.5,p.getZ(i)+.5);uv.needsUpdate=true})();
     r.scale.set(.5,1,.36);r.position.set(-1.0,.0025,.02);r.receiveShadow=true;H.add(r);return r})(),
    // ---- living room ----
    furn(H,'kaykit_couch_pillows',.07,0,-.44,0,{h:.19}),
    furn(H,'kaykit_table_low',.08,0,-.18,0,{w:.26}),
    furn(H,'kenney_cabinetTelevision',-.4,0,-.2,Math.PI/2,{h:.11}),
    furn(H,'kenney_televisionModern',-.41,.11,-.2,Math.PI/2,{h:.15}),
    furn(H,'kaykit_lamp_standing',.42,0,-.5,0,{h:.45}),
    furn(H,'kenney_bookcaseOpen',-.36,0,-.52,0,{h:.42}),
    furn(H,'kenney_pottedPlant',.43,0,-.3,0,{h:.25}),
    furn(H,'kaykit_pictureframe_large_A',.04,.4,B+.012,0,{h:.14}),
    furn(H,'kaykit_pictureframe_small_B',.26,.38,B+.012,0,{h:.07}),
    furn(H,'kaykit_book_set',-.36,.3,-.52,0,{w:.1}),
    // ---- bedroom ----
    furn(H,'kaykit_bed_single_A',1.0,0,-.38,0,{h:.14}),
    furn(H,'kaykit_cabinet_small_decorated',1.3,0,-.52,0,{h:.16}),
    // 2026-10-24: the KayKit rug showed as a flat beige board ("a plate under Siili"); a soft woven rug instead
    (()=>{const rt=tex(canvas(512,384,(g,w,h)=>{g.fillStyle='#efe0cf';g.fillRect(0,0,w,h);
      const cols=['#d79aa6','#efe0cf','#93b7c9','#efe0cf','#e2b277','#efe0cf'];let x=26,i=0;while(x<w-26){const sw=[22,34,14][i%3];g.fillStyle=cols[i%cols.length];g.fillRect(x,22,sw,h-44);x+=sw;i++}
      for(let k=0;k<14000;k++){g.fillStyle=`rgba(${Math.random()<.5?'255,255,255':'70,40,30'},${(Math.random()*.09).toFixed(3)})`;g.fillRect(Math.random()*w,Math.random()*h,2,3)}
      g.strokeStyle='#c98a7c';g.lineWidth=14;g.strokeRect(9,9,w-18,h-18);g.fillStyle='#efe0cf';for(let y=4;y<h;y+=9){g.fillRect(0,y,6,4);g.fillRect(w-6,y,6,4)}}),[1,1]);
     const r=new THREE.Mesh(new RoundedBoxGeometry(.5,.005,.36,2,.0025),new THREE.MeshStandardMaterial({map:rt,roughness:1}));r.position.set(1.0,.0025,.06);r.receiveShadow=true;H.add(r);return r})(),
    furn(H,'tinytreats_slippers',.8,0,-.15,.4,{h:.025}),
    furn(H,'kaykit_shelf_B_large_decorated',.76,.42,B+.035,0,{w:.26}),
    furn(H,'kaykit_pictureframe_medium',1.02,.4,B+.012,0,{h:.13}),
    furn(H,'kaykit_cactus_medium_A',1.4,0,.15,0,{h:.12}),
  ]);
  // little paintings in the empty frames: the lighthouse by the sea, a heart for Saga and a hedgehog family
  {const art=(draw)=>tex(canvas(256,200,(g,w,h)=>{draw(g,w,h);g.strokeStyle='rgba(0,0,0,.15)';g.lineWidth=4;g.strokeRect(2,2,w-4,h-4)}));
   const sea=art((g,w,h)=>{const s=g.createLinearGradient(0,0,0,h);s.addColorStop(0,'#f3c9a0');s.addColorStop(.55,'#cfe0ef');s.addColorStop(.56,'#5f8fb5');s.addColorStop(1,'#3e6f96');g.fillStyle=s;g.fillRect(0,0,w,h);
     g.fillStyle='#fff3d6';g.beginPath();g.arc(70,70,22,0,7);g.fill();g.fillStyle='#f4efe6';g.fillRect(168,52,22,64);g.fillStyle='#c94b3e';for(let y=60;y<116;y+=16)g.fillRect(168,y,22,7);g.fillStyle='#3b2a20';g.fillRect(164,46,30,8);g.fillStyle='#ffd77a';g.fillRect(172,38,14,10);
     g.fillStyle='#7d5a3c';g.beginPath();g.moveTo(140,118);g.lineTo(220,118);g.lineTo(236,130);g.lineTo(130,130);g.fill();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;for(let i=0;i<6;i++){g.beginPath();g.moveTo(20+i*40,150+i%2*12);g.lineTo(44+i*40,150+i%2*12);g.stroke()}});
   const heart=art((g,w,h)=>{g.fillStyle='#f6e7dc';g.fillRect(0,0,w,h);g.fillStyle='#e86a8c';g.beginPath();g.moveTo(128,160);g.bezierCurveTo(40,100,60,30,128,70);g.bezierCurveTo(196,30,216,100,128,160);g.fill();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(98,80,10,0,7);g.fill()});
   const family=art((g,w,h)=>{g.fillStyle='#e9dcc2';g.fillRect(0,0,w,h);g.fillStyle='#b9d39a';g.fillRect(0,140,w,60);
     const hog=(x,y,s)=>{g.fillStyle='#8a5a36';g.beginPath();g.ellipse(x,y,32*s,26*s,0,Math.PI,0);g.fill();for(let i=0;i<9;i++){g.beginPath();const a=Math.PI+i/8*Math.PI;g.moveTo(x+Math.cos(a)*28*s,y+Math.sin(a)*22*s);g.lineTo(x+Math.cos(a)*40*s,y+Math.sin(a)*34*s);g.lineTo(x+Math.cos(a+.2)*28*s,y+Math.sin(a+.2)*22*s);g.fill()}
       g.fillStyle='#f2e2cc';g.beginPath();g.ellipse(x,y+6*s,22*s,20*s,0,0,7);g.fill();g.fillStyle='#2b1a12';g.beginPath();g.arc(x-8*s,y,3*s,0,7);g.arc(x+8*s,y,3*s,0,7);g.fill();g.beginPath();g.arc(x,y+8*s,4*s,0,7);g.fill()};
     hog(80,120,1.1);hog(170,118,1.0);hog(126,138,.6)});
   for(const[t,x,y,w,h]of[[sea,.04,.47,.095,.075],[heart,.26,.415,.05,.028],[family,1.02,.462,.085,.07]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:t,roughness:.85}));m.position.set(x,y,B+.03);H.add(m)}}
  // a tea set on the living-room table, and a teapot on the stove
  furn(H,'tinytreats-kitchen_kettle',-.9,.2,-.5,.4,{h:.05});furn(H,'tinytreats-kitchen_pot',-1.02,.2,-.47,0,{h:.03});
  furn(H,'tinytreats-kitchen_plate',.02,.056,-.17,0,{w:.06});
  // a woollen throw on the sofa
  {const knit=tex(canvas(256,256,(g,w,h)=>{g.fillStyle='#d9895f';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=12)for(let x=0;x<w;x+=10){g.fillStyle=`hsl(20,${50+Math.random()*10}%,${58+Math.random()*8}%)`;g.beginPath();g.ellipse(x+5,y+6,4,6,(y/12)%2?.4:-.4,0,7);g.fill()}
     g.fillStyle='#f4ead8';for(let y=40;y<h;y+=80)g.fillRect(0,y,w,10)}),[1,1]);
   const th=new THREE.Mesh(new RoundedBoxGeometry(.11,.012,.09,2,.005),new THREE.MeshPhysicalMaterial({map:knit,roughness:1,sheen:1,sheenRoughness:.6,sheenColor:new THREE.Color('#ffe2cc')}));th.position.set(.22,.1,-.43);th.scale.setScalar(1.5);th.rotation.set(.15,-.3,.08);th.castShadow=true;H.add(th)}
  // Siili's slate on a little easel: words appear here and Siili can point at them (boardWrite)
  {const bc=document.createElement('canvas');bc.width=512;bc.height=384;const bt=new THREE.CanvasTexture(bc);bt.colorSpace=THREE.SRGBColorSpace;bt.anisotropy=8;
   boardWrite=(text='',sub='')=>{const g=bc.getContext('2d');g.fillStyle='#2f3b35';g.fillRect(0,0,512,384);
     for(let i=0;i<900;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.035})`;g.fillRect(Math.random()*512,Math.random()*384,R01(2,30),R01(1,3))}
     g.fillStyle='rgba(255,255,255,.07)';g.beginPath();g.ellipse(170,250,150,40,-.2,0,7);g.fill();
     g.textAlign='center';g.textBaseline='middle';g.fillStyle='#f6f1e4';g.shadowColor='rgba(255,255,255,.35)';g.shadowBlur=6;
     if(text){let fs=150;g.font=`800 ${fs}px "Baloo 2", Nunito, sans-serif`;while(g.measureText(text).width>460&&fs>40){fs-=8;g.font=`800 ${fs}px "Baloo 2", Nunito, sans-serif`}g.fillText(text,256,sub?165:192)}
     if(sub){g.font='700 54px Nunito, sans-serif';g.fillStyle='#f3d38a';g.fillText(sub,256,292)}
     bt.needsUpdate=true};
   boardWrite('Hei!','');document.fonts?.ready.then(()=>boardWrite('Hei!',''));
   const easel=new THREE.Group();const wood=new THREE.MeshStandardMaterial({color:'#9b6b42',roughness:.8});
   const leg=(x,z,rx,rz)=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.004,.0055,.25,8),wood);l.position.set(x,.12,z);l.rotation.set(rx,0,rz);easel.add(l)};
   leg(-.07,.012,-.12,.12);leg(.07,.012,-.12,-.12);leg(0,-.06,.32,0);
   const frame=new THREE.Mesh(new RoundedBoxGeometry(.19,.145,.012,3,.006),wood);frame.position.set(0,.16,.03);frame.rotation.x=-.12;
   const slate=new THREE.Mesh(new THREE.PlaneGeometry(.172,.128),new THREE.MeshStandardMaterial({map:bt,roughness:.95,emissive:new THREE.Color('#ffffff'),emissiveMap:bt,emissiveIntensity:.12}));slate.position.set(0,.16,.0375);slate.rotation.x=-.12;
   const tray=new THREE.Mesh(new THREE.BoxGeometry(.18,.008,.02),wood);tray.position.set(0,.085,.045);
   const chalk=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.024,8),new THREE.MeshStandardMaterial({color:'#fffaf0',roughness:1}));chalk.rotation.z=Math.PI/2;chalk.position.set(.05,.092,.048);
   easel.add(frame,slate,tray,chalk);easel.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});
   easel.position.set(.4,0,.1);easel.rotation.y=-.55;easel.scale.setScalar(1.35);H.add(easel);homeBoard=easel}
  // the eight things
  for(const[w,[x,y,z,size]]of Object.entries(HOME_SPOTS)){const g=new THREE.Group();g.name='thing_'+w;g.position.set(x,y,z);H.add(g);things[w]=g}
  addPlaceholders();
  await Promise.all(Object.keys(HOME_SPOTS).map(async w=>{try{const g=await load('props_'+w+'.glb');const th=things[w];th.clear();const m=g.scene;
    m.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material){o.material.roughness=Math.max(o.material.roughness??.5,.45)}}});
    m.rotation.y=w==='matto'?0:R01(-.8,.8)+(w==='mato'?.8:0);const want=HOME_SPOTS[w][3];const bx=new THREE.Box3().setFromObject(m);const sz=bx.getSize(new THREE.Vector3());const cur=Math.max(sz.x,sz.y,sz.z);if(cur>0)m.scale.multiplyScalar(want/cur);if(w==='matto'){m.scale.y*=.3;m.traverse(o=>{if(o.isMesh&&o.material){o.material.roughness=1;o.material.envMapIntensity=.4}})}th.add(m)}catch(e){}}));
  // a few dust motes in the window light
  const N=120,gg=new THREE.BufferGeometry(),p=new Float32Array(N*3);for(let i=0;i<N;i++){p[i*3]=R01(-1.4,1.4);p[i*3+1]=R01(.05,.45);p[i*3+2]=R01(-.5,.2)}
  gg.setAttribute('position',new THREE.BufferAttribute(p,3));homeMotes=new THREE.Points(gg,new THREE.PointsMaterial({map:dotTex(),color:'#fff0d0',size:.006,transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending}));H.add(homeMotes);
}
