/* ---------- smoother play (2026-10-24) ----------
   Graphics quality in steps. The game starts at step 1 (no ambient-occlusion pass, at most 1.25x pixels) and steps
   down by itself when the computer can't keep up, and remembers the step for next time. */
const QSTEPS=[
  {dpr:1.5, gtao:1,bokeh:1,paint:1,bloom:1,shadow:2048},
  {dpr:1.25,gtao:0,bokeh:1,paint:1,bloom:1,shadow:2048},
  {dpr:1,   gtao:0,bokeh:0,paint:1,bloom:1,shadow:2048},
  {dpr:1,   gtao:0,bokeh:0,paint:0,bloom:0,shadow:1024},
  {dpr:.75, gtao:0,bokeh:0,paint:0,bloom:0,shadow:1024}];
// a saved step is tried one step better next time, so one bad moment doesn't stick forever
let qStep=1;try{const v=localStorage.getItem('siili.q');if(v!==null)qStep=Math.max(1,Math.min(QSTEPS.length-1,+v-1))}catch(e){}
function setQuality(s){qStep=Math.max(0,Math.min(QSTEPS.length-1,s));const q=QSTEPS[qStep];
  R.setPixelRatio(Math.min(devicePixelRatio,q.dpr));composer.setPixelRatio(R.getPixelRatio());composer.setSize(innerWidth,innerHeight);
  gtao.enabled=!!q.gtao;bokeh.enabled=!!q.bokeh;paint.enabled=!!q.paint;bloom.enabled=!!q.bloom;
  for(const l of [sun,homeKey])if(l&&l.shadow){l.shadow.blurSamples=qStep?8:12;l.shadow.radius=(l===sun?9:8)*q.shadow/(l===sun?4096:2048)*(qStep?1:1.3);
    if(l.shadow.mapSize.x!==q.shadow){l.shadow.mapSize.set(q.shadow,q.shadow);if(l.shadow.map){l.shadow.map.dispose();l.shadow.map=null}}}
  try{localStorage.setItem('siili.q',String(qStep))}catch(e){}}
let homeKey=null;
/* frame watch: slow frames over a few seconds -> one step down. Pauses right after a scene change (shaders compile then). */
let pf={n:0,sum:0,slow:0,t0:0,hold:0};
function perfStep(rdt){if(window.__manual||window.__noAuto||document.hidden||!pf.t0){pf.t0=performance.now();return}
  const now=performance.now();if(now<pf.hold){pf.n=pf.sum=pf.slow=0;return}
  pf.n++;pf.sum+=rdt;if(rdt>.05)pf.slow++;
  if(pf.sum>=4){const fps=pf.n/pf.sum;
    if((fps<38||pf.slow>pf.n*.15)&&qStep<QSTEPS.length-1){setQuality(qStep+1);pf.hold=now+2500}
    pf.n=pf.sum=pf.slow=0}}
function perfHold(ms=3000){pf.hold=performance.now()+ms}

/* ---------- walking round furniture (2026-10-24) ----------
   A floor grid (2 cm squares) built from what actually stands in the home, widened by Siili's half width.
   A* finds the way, then the path is straightened where he can see past things. */
const NAV={c:.02,x0:-1.56,z0:-.64,nx:157,nz:62,body:.06};
function navGrid(skip){const g=new Uint8Array(NAV.nx*NAV.nz);const skipObj=skip&&things[skip];const bb=new THREE.Box3();
  homeS.updateMatrixWorld(true);
  homeS.traverse(o=>{if(!o.isMesh)return;
    for(let p=o;p;p=p.parent){if(!p.visible||p===siili||(skipObj&&p===skipObj))return}
    const m=o.material;if(m&&(m.visible===false||(m.transparent&&m.opacity<.05)))return;
    bb.setFromObject(o);if(bb.isEmpty())return;
    if(bb.min.y>.13||bb.max.y-bb.min.y<.016)return;               // over his head, or flat (rugs, floor)
    if((bb.max.x-bb.min.x)*(bb.max.z-bb.min.z)>.8)return;      // the floor or a whole-room piece
    const r=NAV.body,i0=Math.max(0,Math.floor((bb.min.x-r-NAV.x0)/NAV.c)),i1=Math.min(NAV.nx-1,Math.ceil((bb.max.x+r-NAV.x0)/NAV.c)),
      j0=Math.max(0,Math.floor((bb.min.z-r-NAV.z0)/NAV.c)),j1=Math.min(NAV.nz-1,Math.ceil((bb.max.z+r-NAV.z0)/NAV.c));
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)g[j*NAV.nx+i]=1});
  for(let j=0;j<NAV.nz;j++){const z=NAV.z0+j*NAV.c;if(z>.48||z<ROOM.back+.05)for(let i=0;i<NAV.nx;i++)g[j*NAV.nx+i]=1}
  for(let i=0;i<NAV.nx;i++){const x=NAV.x0+i*NAV.c;if(x<-1.47||x>1.47)for(let j=0;j<NAV.nz;j++)g[j*NAV.nx+i]=1}
  return g}
function navPath(from,to,skip){
  const g=navGrid(skip),W=NAV.nx,H=NAV.nz;
  const cell=v=>[Math.round((v.x-NAV.x0)/NAV.c),Math.round((v.z-NAV.z0)/NAV.c)];
  const inb=(i,j)=>i>=0&&j>=0&&i<W&&j<H,free=(i,j)=>inb(i,j)&&!g[j*W+i];
  const near=(i,j)=>{if(free(i,j))return[i,j];for(let r=1;r<45;r++)for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;if(free(i+di,j+dj))return[i+di,j+dj]}return null};
  let s=cell(from),e=cell(to);if(!inb(...s)||!inb(...e))return null;
  const s0=s;s=near(...s);e=near(...e);if(!s||!e)return null;
  const N=W*H,G=new Float32Array(N).fill(1e9),from_=new Int32Array(N).fill(-1),closed=new Uint8Array(N);
  const heap=[],push=(k,f)=>{heap.push([f,k]);let i=heap.length-1;while(i){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p}},
    pop=()=>{const top=heap[0],last=heap.pop();if(heap.length){heap[0]=last;let i=0;for(;;){const l=2*i+1,r=l+1;let m=i;if(l<heap.length&&heap[l][0]<heap[m][0])m=l;if(r<heap.length&&heap[r][0]<heap[m][0])m=r;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m}}return top[1]};
  const hh=(i,j)=>{const dx=Math.abs(i-e[0]),dy=Math.abs(j-e[1]);return Math.max(dx,dy)+.414*Math.min(dx,dy)};
  const sk=s[1]*W+s[0],ek=e[1]*W+e[0];G[sk]=0;push(sk,hh(...s));let found=false;
  while(heap.length){const k=pop();if(closed[k])continue;closed[k]=1;if(k===ek){found=true;break}const i=k%W,j=(k/W)|0;
    for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const ni=i+di,nj=j+dj;if(!free(ni,nj))continue;
      if(di&&dj&&(!free(i+di,j)||!free(i,j+dj)))continue;const nk=nj*W+ni,c=G[k]+(di&&dj?1.414:1);if(c<G[nk]){G[nk]=c;from_[nk]=k;push(nk,c+hh(ni,nj))}}}
  if(!found)return null;
  const cells=[];for(let k=ek;k!==-1;k=from_[k])cells.push([k%W,(k/W)|0]);cells.reverse();
  const see=(a,b)=>{const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])*2);for(let q=1;q<n;q++){const u=q/n;if(!free(Math.round(a[0]+(b[0]-a[0])*u),Math.round(a[1]+(b[1]-a[1])*u)))return false}return true};
  const pts=[];let a=0;while(a<cells.length-1){let b=cells.length-1;while(b>a+1&&!see(cells[a],cells[b]))b--;pts.push(cells[b]);a=b}
  const out=pts.map(([i,j])=>new THREE.Vector3(NAV.x0+i*NAV.c,0,NAV.z0+j*NAV.c));
  // last step to the real goal when it's free (keeps "stop in front of the thing" exact)
  const ec=cell(to);if(free(...ec)&&out.length)out[out.length-1]=to.clone();
  return out.length?out:null}

/* music (2026-10-24): every piece plays once and fades out over its last seconds, no looping */
music.addEventListener('timeupdate',()=>{const d=music.duration;if(!isFinite(d)||music.loop)return;const left=d-music.currentTime;
  if(left<5&&!music.__fading){music.__fading=true;fadeMusic(0,Math.max(300,left*1000))}});
music.addEventListener('play',()=>{music.__fading=false});

/* the worm (2026-10-24): Steve wanted it lying down and wriggling, with a face. Built here instead of props_mato.glb:
   a tapered tube along the floor in an S, a travelling wave runs down the body, a round head with eyes and a smile. */
function makeWorm(){
  const G=new THREE.Group(),L=.17,N=72,RAD=10,R0=.0105;
  const band=tex(canvas(512,32,(g,w,h)=>{g.fillStyle='#e0928a';g.fillRect(0,0,w,h);
    for(let x=0;x<w;x+=14){g.fillStyle='rgba(150,60,60,.22)';g.fillRect(x,0,3,h)}
    g.fillStyle='#ecaaa0';g.fillRect(w*.22,0,w*.07,h);                         // the light saddle band near the head
    const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(255,255,255,.25)');gr.addColorStop(.5,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(90,30,30,.25)');g.fillStyle=gr;g.fillRect(0,0,w,h)}),[1,1]);
  const mat=new THREE.MeshPhysicalMaterial({map:band,roughness:.45,clearcoat:.6,clearcoatRoughness:.35,sheen:.4,sheenColor:new THREE.Color('#ffd0c8')});
  // u = 0 at the head, 1 at the tail
  const base=u=>new THREE.Vector3(L*(.5-u),0,Math.sin(u*Math.PI*1.6)*.022);
  const radius=u=>R0*(u<.08?.85+u*1.9:1-.4*Math.pow(Math.max(0,u-.55)/.45,1.4));
  const geo=new THREE.BufferGeometry(),pos=new Float32Array((N+1)*(RAD+1)*3),uv=new Float32Array((N+1)*(RAD+1)*2),idx=[];
  for(let i=0;i<=N;i++)for(let j=0;j<=RAD;j++){const k=i*(RAD+1)+j;uv[k*2]=i/N;uv[k*2+1]=j/RAD;if(i<N&&j<RAD){const a=k,b=k+RAD+1;idx.push(a,b,a+1,b,b+1,a+1)}}
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.BufferAttribute(uv,2));geo.setIndex(idx);
  const body=new THREE.Mesh(geo,mat);body.castShadow=body.receiveShadow=true;G.add(body);
  const tailCap=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),mat);G.add(tailCap);
  // head: a slightly bigger sphere, two eyes, a smile
  const head=new THREE.Group();const hs=new THREE.Mesh(new THREE.SphereGeometry(R0*1.35,24,18),mat);hs.castShadow=true;head.add(hs);
  const white=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.25,emissive:new THREE.Color('#ffffff'),emissiveIntensity:.35}),black=new THREE.MeshStandardMaterial({color:'#1d1412',roughness:.2}),shine=new THREE.MeshBasicMaterial({color:'#ffffff'});
  for(const s of[-1,1]){const e=new THREE.Group();const ew=new THREE.Mesh(new THREE.SphereGeometry(R0*.62,18,14),white);const ep=new THREE.Mesh(new THREE.SphereGeometry(R0*.36,14,10),black);ep.position.set(R0*.38,0,0);
    const hl=new THREE.Mesh(new THREE.SphereGeometry(R0*.1,8,6),shine);hl.position.set(R0*.62,R0*.14,R0*.1*s);e.add(ew,ep,hl);e.position.set(R0*.6,R0*1.15,s*R0*.55);head.add(e)}
  const smile=new THREE.Mesh(new THREE.TorusGeometry(R0*.45,R0*.09,6,16,Math.PI*.8),new THREE.MeshStandardMaterial({color:'#7a2f2f',roughness:.5}));
  smile.rotation.set(0,Math.PI/2,Math.PI*.6);smile.position.set(R0*1.28,R0*.1,0);head.add(smile);
  G.add(head);
  const P=new THREE.Vector3(),T=new THREE.Vector3(),Nn=new THREE.Vector3(),up=new THREE.Vector3(0,1,0),B=new THREE.Vector3();
  const centre=(u,t)=>{const p=base(u);const amp=.009*Math.min(1,u*5+.25);p.z+=Math.sin(t*2.6-u*Math.PI*3)*amp;p.x+=Math.sin(t*1.3)*.004;return p};
  function shape(t){for(let i=0;i<=N;i++){const u=i/N;const c=centre(u,t),c2=centre(Math.min(1,u+.01),t),c1=centre(Math.max(0,u-.01),t);T.subVectors(c2,c1).normalize();B.crossVectors(T,up).normalize();Nn.crossVectors(B,T).normalize();
      const r=radius(u);for(let j=0;j<=RAD;j++){const a=j/RAD*Math.PI*2;const k=(i*(RAD+1)+j)*3;
        P.copy(c).addScaledVector(Nn,Math.cos(a)*r*.82).addScaledVector(B,Math.sin(a)*r);P.y+=r*.82;pos[k]=P.x;pos[k+1]=P.y;pos[k+2]=P.z}}
    geo.attributes.position.needsUpdate=true;geo.computeVertexNormals();
    const h=centre(0,t),h2=centre(.04,t);head.position.set(h.x,R0*1.2,h.z);head.rotation.y=Math.atan2(-(h.z-h2.z),h.x-h2.x)+Math.sin(t*1.1)*.25;
    const tc=centre(1,t);tailCap.position.set(tc.x,radius(1)*.82,tc.z);tailCap.scale.setScalar(radius(1)*.95)}
  shape(0);geo.computeBoundingSphere();
  let last=0;(function tick(now){requestAnimationFrame(tick);if(typeof scene==='undefined'||scene!==homeS||!G.parent)return;if(now-last<33)return;last=now;shape(now/1000)})(0);
  return G}
