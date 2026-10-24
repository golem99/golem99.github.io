/* the little front door under the stairs (2026-10-24: Siili walks on two legs now and lives in a real flat, so the hole
   became a door). Arched, painted green, with a frame, a lamp, a name board and a doormat. Clicking it starts the story. */
const HOLE=new THREE.Vector3(64.6,0,41.72);
let doorPivot=null,doorOpen=0,doorTarget=0;
function buildHole(){
  const G=new THREE.Group();G.position.set(HOLE.x,0,HOLE.z-.018);G.rotation.y=Math.PI;outS.add(G);
  const W=.17,Hh=.25,r=W/2,arch=new THREE.Shape();arch.moveTo(-r,0);arch.lineTo(-r,Hh-r);arch.absarc(0,Hh-r,r,Math.PI,0,true);arch.lineTo(r,0);arch.lineTo(-r,0);
  // dark hallway behind the door
  const hall=new THREE.Mesh(new THREE.ShapeGeometry(arch,24),new THREE.MeshBasicMaterial({color:'#1a100b'}));hall.position.z=-.002;G.add(hall);
  {const glow=new THREE.Mesh(new THREE.ShapeGeometry(arch,24),new THREE.MeshBasicMaterial({color:'#ffb766',transparent:true,opacity:.18}));glow.scale.set(.6,.55,1);glow.position.set(0,.02,-.001);G.add(glow)}
  // frame: a stone arch
  const outer=new THREE.Shape();const R=r+.022;outer.moveTo(-R,0);outer.lineTo(-R,Hh-r);outer.absarc(0,Hh-r,R,Math.PI,0,true);outer.lineTo(R,0);outer.lineTo(-R,0);outer.holes.push(arch);
  const frame=new THREE.Mesh(new THREE.ExtrudeGeometry(outer,{depth:.02,bevelEnabled:true,bevelSize:.004,bevelThickness:.004,bevelSegments:2,curveSegments:24}),new THREE.MeshStandardMaterial({color:'#d9cbb4',roughness:.85}));frame.castShadow=true;frame.receiveShadow=true;G.add(frame);
  // the door itself, hinged on the left
  const plank=tex(canvas(256,384,(g,w,h)=>{g.fillStyle='#4f8a6e';g.fillRect(0,0,w,h);for(let x=0;x<w;x+=64){g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x,0,3,h);for(let i=0;i<10;i++){g.strokeStyle=`rgba(20,40,30,${R01(.08,.2)})`;g.beginPath();const xx=x+R01(6,58);g.moveTo(xx,0);g.bezierCurveTo(xx+R01(-5,5),h*.3,xx+R01(-5,5),h*.7,xx,h);g.stroke()}}
    g.fillStyle='rgba(255,255,255,.05)';g.fillRect(0,0,w,h*.15)}));
  const door=new THREE.Mesh(new THREE.ExtrudeGeometry(arch,{depth:.012,bevelEnabled:false,curveSegments:24}),new THREE.MeshStandardMaterial({map:plank,roughness:.7}));
  {const uv=door.geometry.attributes.uv,p=door.geometry.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,(p.getX(i)+r)/W,p.getY(i)/Hh)}
  door.position.x=r;door.castShadow=true;doorPivot=new THREE.Group();doorPivot.position.set(-r,0,.004);doorPivot.add(door);G.add(doorPivot);
  const brass=new THREE.MeshStandardMaterial({color:'#d4a94a',roughness:.35,metalness:.7});
  const knob=new THREE.Mesh(new THREE.SphereGeometry(.009,16,12),brass);knob.position.set(W-.022,.115,.016);doorPivot.add(knob);
  const win=new THREE.Mesh(new THREE.CircleGeometry(.025,24),new THREE.MeshStandardMaterial({color:'#ffd9a0',emissive:new THREE.Color('#ffb05a'),emissiveIntensity:.8,roughness:.3}));win.position.set(r,.19,.0125);doorPivot.add(win);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.026,.004,8,24),brass);ring.position.copy(win.position);doorPivot.add(ring);
  // a small lamp on the wall, a name board and a doormat
  const lampG=new THREE.Group();const cage=new THREE.Mesh(new THREE.CylinderGeometry(.014,.012,.03,12),new THREE.MeshStandardMaterial({color:'#2f2a26',roughness:.5}));
  const bulb=new THREE.Mesh(new THREE.SphereGeometry(.009,12,8),new THREE.MeshBasicMaterial({color:'#ffe2a8'}));lampG.add(cage,bulb);lampG.position.set(r+.05,Hh-.02,.03);G.add(lampG);
  const pl=new THREE.PointLight('#ffc27a',.6,.8,1.8);pl.position.set(r+.05,Hh-.03,.08);G.add(pl);
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(.11,.032),new THREE.MeshStandardMaterial({map:tex(canvas(256,76,(g,w,h)=>{g.fillStyle='#c79a63';g.fillRect(0,0,w,h);g.strokeStyle='#7a5434';g.lineWidth=6;g.strokeRect(3,3,w-6,h-6);g.fillStyle='#4a2f1c';g.font='800 46px "Baloo 2", Nunito, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('SIILI',w/2,h/2+3)})),roughness:.8}));
  sign.position.set(0,Hh+.045,.024);G.add(sign);
  const mat=new THREE.Mesh(new THREE.PlaneGeometry(.17,.08),new THREE.MeshStandardMaterial({map:tex(canvas(256,120,(g,w,h)=>{g.fillStyle='#9b6a3c';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=4){g.fillStyle=`rgba(60,35,15,${R01(.1,.3)})`;g.fillRect(0,y,w,1)}g.fillStyle='#f2e2c2';g.font='800 30px Nunito, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('TERVETULOA',w/2,h/2)})),roughness:1}));
  mat.rotation.x=-Math.PI/2;mat.position.set(0,.002,.07);mat.receiveShadow=true;G.add(mat);
  // what Saga clicks
  const hit=new THREE.Mesh(new THREE.PlaneGeometry(W+.06,Hh+.08),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(0,(Hh+.08)/2,.03);G.add(hit);
  hit.userData.hole=true;return hit;
}
function doorStep(dt){if(!doorPivot)return;doorOpen+=(doorTarget-doorOpen)*Math.min(1,dt*4);doorPivot.rotation.y=-doorOpen*1.75}
