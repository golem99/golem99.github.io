  // ---- 2026-10-24: a cartoon-film pass. Light pools, a beam of daylight, moss, mushrooms, leaves and Siili's slate ----
  // a soft key light over the middle of the room, so Siili and the rug sit in a warm pool
  {const key=new THREE.SpotLight('#ffd09a',5,2.2,.55,.9,1.3);key.position.set(.15,.62,.55);key.target.position.set(.05,0,-.1);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.radius=10;key.shadow.bias=-.0015;H.add(key,key.target)}
  // a soft beam of cool daylight from the tunnel
  {const g=new THREE.ConeGeometry(.26,1.1,32,1,true);g.translate(0,-.55,0);g.rotateZ(Math.PI/2);
   const beamM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{c:{value:new THREE.Color('#9cc4ff')}},
    vertexShader:'varying vec3 vp;varying vec3 vn;varying vec3 vv;void main(){vp=position;vec4 w=modelViewMatrix*vec4(position,1.);vv=normalize(-w.xyz);vn=normalize(normalMatrix*normal);gl_Position=projectionMatrix*w;}',
    fragmentShader:'uniform vec3 c;varying vec3 vp;varying vec3 vn;varying vec3 vv;void main(){float along=clamp(vp.x/1.1,0.,1.);float edge=pow(abs(dot(vn,vv)),1.6);gl_FragColor=vec4(c*edge*edge*(1.-along)*(1.-along)*.2,1.);}'});
   const beam=new THREE.Mesh(g,beamM);beam.position.set(-.86,.15,-.12);beam.rotation.set(0,-.2,-.32);H.add(beam)}
  // moss cushions where the floor meets the walls
  {const mossT=tex(canvas(256,256,(g,w,h)=>{g.fillStyle='#4f6b2c';g.fillRect(0,0,w,h);for(let i=0;i<1400;i++){g.fillStyle=`hsl(${R01(78,100)},${R01(35,55)}%,${R01(22,42)}%)`;g.beginPath();g.arc(Math.random()*w,Math.random()*h,R01(1,3.5),0,7);g.fill()}}),[2,2]);
   const mossM=new THREE.MeshStandardMaterial({map:mossT,roughness:1,color:'#b9d08a'});
   for(let i=0;i<16;i++){const a=R01(-Math.PI*1.02,Math.PI*.02),r=R01(.025,.07);const m=new THREE.Mesh(rockGeo(r,2,.18),mossM);m.scale.y=.45;m.position.set(Math.cos(a)*R01(.78,.88),r*.15,Math.sin(a)*R01(.62,.7));m.receiveShadow=true;m.castShadow=true;H.add(m)}}
  // a few small mushrooms with softly glowing caps
  {for(const[x,z,s,c]of[[-.34,.5,1,'#ffb48a'],[-.29,.54,.7,'#ffd2a0'],[.66,-.44,.9,'#ffb48a'],[.6,-.48,.6,'#ffe0b0'],[-.48,-.52,.8,'#ffd2a0']]){
    const mu=new THREE.Group();const stem=new THREE.Mesh(new THREE.CylinderGeometry(.006*s,.009*s,.035*s,12),new THREE.MeshStandardMaterial({color:'#f2e2c8',roughness:.8}));stem.position.y=.0175*s;
    const cap=new THREE.Mesh(new THREE.SphereGeometry(.02*s,20,12,0,Math.PI*2,0,Math.PI*.5),new THREE.MeshStandardMaterial({color:c,roughness:.6,emissive:new THREE.Color(c),emissiveIntensity:.55}));cap.scale.y=.75;cap.position.y=.033*s;
    for(let k=0;k<5;k++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.0028*s,8,6),new THREE.MeshBasicMaterial({color:'#fff6e6'}));const aa=k*1.3,rr=.011*s;dot.position.set(Math.cos(aa)*rr,.033*s+.012*s,Math.sin(aa)*rr);mu.add(dot)}
    mu.add(stem,cap);mu.position.set(x,0,z);mu.rotation.z=R01(-.12,.12);mu.traverse(o=>o.castShadow=true);H.add(mu)}
   const glow=new THREE.PointLight('#ffb27a',.35,.45,2);glow.position.set(-.32,.06,.52);H.add(glow);const glow2=new THREE.PointLight('#ffb27a',.3,.4,2);glow2.position.set(.64,.06,-.44);H.add(glow2)}
  // autumn leaves blown in through the tunnel
  {const leafT=(hue)=>tex(canvas(64,64,(g)=>{g.fillStyle=`hsl(${hue},75%,48%)`;g.beginPath();g.moveTo(32,2);g.bezierCurveTo(58,18,56,46,32,62);g.bezierCurveTo(8,46,6,18,32,2);g.fill();g.strokeStyle=`hsl(${hue},60%,30%)`;g.lineWidth=2;g.beginPath();g.moveTo(32,6);g.lineTo(32,60);g.stroke();for(let i=0;i<4;i++){g.beginPath();g.moveTo(32,16+i*10);g.lineTo(18,10+i*10);g.moveTo(32,16+i*10);g.lineTo(46,10+i*10);g.stroke()}}));
   const LT=[leafT(18),leafT(32),leafT(44),leafT(8)];
   for(let i=0;i<22;i++){const near=Math.random()<.5;const x=near?R01(-.85,-.45):R01(-.6,.65),z=near?R01(-.3,.25):R01(.25,.55);const lf=new THREE.Mesh(new THREE.PlaneGeometry(.04,.04),new THREE.MeshStandardMaterial({map:LT[i%4],transparent:true,alphaTest:.4,side:THREE.DoubleSide,roughness:.9}));
    lf.position.set(x,.002+Math.random()*.004,z);lf.rotation.set(-Math.PI/2+R01(-.25,.25),0,R01(0,Math.PI*2));lf.receiveShadow=true;lf.castShadow=true;H.add(lf)}}
  // Siili's slate on a little twig easel: words appear here and Siili can point at them (boardWrite)
  {const bc=document.createElement('canvas');bc.width=512;bc.height=384;const bt=new THREE.CanvasTexture(bc);bt.colorSpace=THREE.SRGBColorSpace;bt.anisotropy=8;
   boardWrite=(text='',sub='')=>{const g=bc.getContext('2d');g.fillStyle='#2f3b35';g.fillRect(0,0,512,384);
     for(let i=0;i<900;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.035})`;g.fillRect(Math.random()*512,Math.random()*384,R01(2,30),R01(1,3))}
     g.fillStyle='rgba(255,255,255,.07)';g.beginPath();g.ellipse(170,250,150,40,-.2,0,7);g.fill();
     g.textAlign='center';g.textBaseline='middle';g.fillStyle='#f6f1e4';g.shadowColor='rgba(255,255,255,.35)';g.shadowBlur=6;
     if(text){let fs=150;g.font=`800 ${fs}px "Baloo 2", Nunito, sans-serif`;while(g.measureText(text).width>460&&fs>40){fs-=8;g.font=`800 ${fs}px "Baloo 2", Nunito, sans-serif`}g.fillText(text,256,sub?165:192)}
     if(sub){g.font='700 54px Nunito, sans-serif';g.fillStyle='#f3d38a';g.fillText(sub,256,292)}
     bt.needsUpdate=true};
   boardWrite('Hei!','');document.fonts?.ready.then(()=>boardWrite('Hei!',''));
   const easel=new THREE.Group();const twig=new THREE.MeshStandardMaterial({color:'#7a5536',roughness:.9});
   const leg=(x,z,rx,rz)=>{const l=new THREE.Mesh(new THREE.CylinderGeometry(.0045,.006,.27,8),twig);l.position.set(x,.13,z);l.rotation.set(rx,0,rz);easel.add(l)};
   leg(-.075,.012,-.12,.12);leg(.075,.012,-.12,-.12);leg(0,-.06,.32,0);
   const frame=new THREE.Mesh(new RoundedBoxGeometry(.21,.16,.012,3,.006),new THREE.MeshStandardMaterial({color:'#9b6b42',roughness:.8}));frame.position.set(0,.17,.03);frame.rotation.x=-.12;
   const slate=new THREE.Mesh(new THREE.PlaneGeometry(.19,.142),new THREE.MeshStandardMaterial({map:bt,roughness:.95,emissive:new THREE.Color('#ffffff'),emissiveMap:bt,emissiveIntensity:.12}));slate.position.set(0,.17,.0375);slate.rotation.x=-.12;
   const tray=new THREE.Mesh(new THREE.BoxGeometry(.2,.008,.022),twig);tray.position.set(0,.088,.045);
   const chalk=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.026,8),new THREE.MeshStandardMaterial({color:'#fffaf0',roughness:1}));chalk.rotation.z=Math.PI/2;chalk.position.set(.05,.095,.048);
   const chalk2=chalk.clone();chalk2.material=new THREE.MeshStandardMaterial({color:'#f6b6c8',roughness:1});chalk2.position.x=.07;chalk2.rotation.y=.4;
   easel.add(frame,slate,tray,chalk,chalk2);easel.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});
   easel.position.set(.34,0,-.22);easel.rotation.y=-.42;H.add(easel);homeBoard=easel}
  // soft shapes at the front corners give depth, like a camera looking in from the edge
  {const fg=new THREE.MeshStandardMaterial({color:'#5a3a26',roughness:1});
   const r1=new THREE.Mesh(rockGeo(.09,3,.22),fg);r1.position.set(-.42,0,.62);r1.scale.y=.6;H.add(r1);
   const r2=new THREE.Mesh(rockGeo(.07,3,.22),fg);r2.position.set(.4,0,.6);r2.scale.y=.55;H.add(r2);
   const fern=new THREE.Group();for(let i=0;i<5;i++){const fr=new THREE.Mesh(new THREE.PlaneGeometry(.03,.16),new THREE.MeshStandardMaterial({map:tex(canvas(32,160,(g,w,h)=>{g.fillStyle='#4e7a35';for(let y=8;y<h;y+=7){const ww=(1-y/h)*14+3;g.fillRect(16-ww,y,ww*2,4)}g.fillRect(15,0,2,h)})),transparent:true,alphaTest:.4,side:THREE.DoubleSide,roughness:.9}));fr.position.y=.07;fr.rotation.set(R01(-.5,.5),i*1.25,R01(-.6,.6));fern.add(fr)}fern.position.set(-.38,0,.52);H.add(fern)}
