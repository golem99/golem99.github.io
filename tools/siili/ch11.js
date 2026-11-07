/* ================= Osa 3 · Kapitel 11 · Mitä sinä teet? – Pizzeria Siili (2026-11-07) =================
   Nine longer parts. Every part from 2 on starts with three quick questions from earlier parts, and the test (part 9)
   keeps asking until every word has been right twice. Lines: p11a-…, p11b-…, p11c-…, p11d-… (Siili, Finnish),
   p11f-NN + p11f-NNs (Siili tells, then explains in Swedish), q11- (Orava), o11- (Pöllö-ope), pk11- (Peikko).
   A line with f:null has no recording yet (11C): its text is shown for a moment instead.
   Images in img11/. */
{const _s1=say0;say0=function(id,o={}){const L=LINES[id];if(L&&!L.f){if(qActive())o={...o,sub:false};showSub(L.fi,L.sv,o.sub!==false);return sleep(1300+L.fi.length*55).then(()=>hideSub())}return _s1(id,o)}}
{const css=document.createElement('style');css.textContent=`
#pic6{top:44%;left:3vw;transform:translate(0,-50%) scale(.7)}#pic6.on{transform:translate(0,-50%) scale(1)}
#pic6 img{width:min(30vh,230px);height:min(30vh,230px)}#word .fi{font-size:clamp(30px,8vh,58px)}#word{max-width:min(760px,70vw)}#pic6 .cap{font-size:clamp(20px,3.4vh,28px)}`;document.head.append(css)}
const pic11=(n,sz=110)=>`<img src="img11/${n}.webp" alt="" style="width:${sz}px;height:${sz}px;object-fit:cover;border-radius:16px;display:block;margin:0 auto">`;
function showPic11(n,cap=''){showPicSrc(n.includes('/')?n:'img11/'+n+'.webp',cap)}
async function tr11(id){await say(id);if(has6(id+'s')&&!qActive())await say(id+'s',{sub:false})}
const nn=i=>String(i).padStart(2,'0');
const A11=i=>'p11a-'+nn(i),B11=i=>'p11b-'+nn(i),C11=i=>'p11c-'+nn(i),D11=i=>'p11d-'+nn(i),F11=i=>'p11f-'+nn(i);
async function rep11(fn){const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=fn;await fn()}
function unrep11(){const hb=$('#hint');hb.style.display='none';hb.textContent='?'}
/* one multiple-choice question, retried until right; returns the number of wrong tries */
async function mc11(opts,{q,onWrong}={}){if(q)ask(q);let tries=0;
  for(;;){const {o,b}=await choose6(shuffle(opts));if(o.ok){clearCards();ask('');return tries}
    b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');if(onWrong)await onWrong(tries);else await say(rnd(OOPS))}}
/* mastery: a word is learnt when it has been right (first try) twice */
st.m11??={};st.r11??=[];
function hit11(k,tries){st.m11[k]=(st.m11[k]||0)+(tries?0:1);if(!st.r11.includes(k))st.r11.push(k);save()}

/* ---------- the words of the chapter ---------- */
const VB11=[ // minä, sinä, swedish, picture, line "minä X, sinä Y", line "sinä Y"
  {k:'haluta',mi:'haluan',si:'haluat',sv:'vill',img:'img11/v-haluan.webp',a:8,b:0},
  {k:'pelata',mi:'pelaan',si:'pelaat',sv:'spelar',img:'img11/v-pelaan.webp',a:9,b:1},
  {k:'tehdä',mi:'teen',si:'teet',sv:'gör',img:'img6/teen.webp',a:10,b:2},
  {k:'tulla',mi:'tulen',si:'tulet',sv:'kommer',img:'img11/v-tulen.webp',a:11,b:3},
  {k:'mennä',mi:'menen',si:'menet',sv:'går',img:'img11/v-menen.webp',a:12,b:4},
  {k:'puhua',mi:'puhun',si:'puhut',sv:'pratar',img:'img11/v-puhun.webp',a:13,b:5},
  {k:'olla',mi:'olen',si:'olet',sv:'är',img:null,a:14,b:6},
  {k:'laskea',mi:'lasken',si:'lasket',sv:'räknar',img:'img6/lasken.webp',a:15,b:7},
  {k:'osata',mi:'osaan',si:'osaat',sv:'kan',img:'img11/v-osaan.webp',a:16,b:8},
  {k:'istua',mi:'istun',si:'istut',sv:'sitter',img:'img6/istun.webp',a:17,b:9},
  {k:'seistä',mi:'seison',si:'seisot',sv:'står',img:'img6/seison.webp',a:18,b:10}];
const vImg=(v,sz=96)=>v.img?`<img src="${v.img}" alt="" style="width:${sz}px;height:${sz}px;object-fit:cover;border-radius:16px;display:block;margin:0 auto">`:'';
const NUM11=['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista'];
const NUMSV=['','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv'];
const DAY11=[ // hour, picture, line, minä-sentence, swedish
  {h:7,img:'d-aamupala',l:15,fi:'minä syön aamupalaa',sv:'jag äter frukost'},{h:8,img:'d-koulu',l:16,fi:'minä menen kouluun',sv:'jag går till skolan'},
  {h:2,img:null,l:17,fi:'minä tulen kotiin',sv:'jag kommer hem'},{h:3,img:'d-laksyt',l:18,fi:'minä teen läksyt',sv:'jag gör läxorna'},
  {h:4,img:'d-sahly',l:19,fi:'minä pelaan sählyä',sv:'jag spelar innebandy'},{h:5,img:'d-peli',l:20,fi:'minä pelaan peliä',sv:'jag spelar spel'},
  {h:6,img:'d-pizza',l:21,fi:'minä syön pizzaa',sv:'jag äter pizza'},{h:8,img:'d-luen',l:22,fi:'minä luen',sv:'jag läser',pm:1},{h:9,img:'d-nukun',l:23,fi:'minä nukun',sv:'jag sover'}];
const TOP11=[{k:'juusto',sv:'ost',img:'p-juusto',l:5},{k:'ananas',sv:'ananas',img:'p-ananas',l:6},{k:'sieni',sv:'svamp',img:'p-sieni',l:7},{k:'salami',sv:'salami',img:'p-salami',l:8},{k:'oliivi',sv:'oliv',img:'p-oliivi',l:9}];

/* ---------- Pizzeria Siili: a hedgehog-sized pizzeria by the square ---------- */
const pizS=new THREE.Scene();let pizBuilt=false,oven11=null,ovenLight=null,phone11=null,clockH11=null,clockM11=null,screen11=null,pizza11=null,lamps11=[];
function brickTex11(base='#b5553a',w=512,h=512,rx=1,ry=1){return tex(canvas(w,h,(g,W,H)=>{g.fillStyle='#d9c7ae';g.fillRect(0,0,W,H);const bh=H/16,bw=W/6;
  for(let r=0;r<16;r++)for(let c=-1;c<7;c++){const x=c*bw+(r%2?bw/2:0),y=r*bh;const v=R01(-18,18);g.fillStyle=`hsl(${12+R01(-4,6)},${45+R01(-8,8)}%,${38+v/3}%)`;g.fillRect(x+3,y+3,bw-6,bh-6);
    g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x+3,y+bh-7,bw-6,4)}}),[rx,ry])}
function tileTex11(){return tex(canvas(256,256,(g,W,H)=>{const n=8,s=W/n;for(let i=0;i<n;i++)for(let j=0;j<n;j++){g.fillStyle=(i+j)%2?'#2d2a2e':'#f1e8d8';g.fillRect(i*s,j*s,s,s)}
  for(let i=0;i<600;i++){g.fillStyle=`rgba(0,0,0,${Math.random()*.05})`;g.fillRect(Math.random()*W,Math.random()*H,2,2)}}),[3,3])}
function clothTex11(){return tex(canvas(128,128,(g,W,H)=>{g.fillStyle='#fbf3e6';g.fillRect(0,0,W,H);g.fillStyle='rgba(200,53,43,.75)';for(let i=0;i<8;i+=2){g.fillRect(i*16,0,16,H);g.fillRect(0,i*16,W,16)}}),[2,2])}
function buildPizza11(){if(pizBuilt)return;pizBuilt=true;const S=pizS;S.background=new THREE.Color('#2a1c18');S.fog=new THREE.Fog('#3a2620',2.2,5);
  lightRoom6(S,{sky:'#ffe0c0',ground:'#4a3020',hemi:.6,key:'#ffd2a0',keyI:1.6,keyPos:[-1.4,1.6,1.2],shadow:1.2});
  // floor, walls
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.8),new THREE.MeshStandardMaterial({map:tileTex11(),roughness:.55}));fl.rotation.x=-Math.PI/2;fl.position.set(0,0,-.2);fl.receiveShadow=true;S.add(fl);
  const plaster=new THREE.MeshStandardMaterial({map:paintTex6(512,512,'#f0dcc0'),roughness:.95});
  bx6(S,2.4,.9,.04,plaster,0,.45,-.82,false);bx6(S,.04,.9,1.8,plaster,-1.1,.45,-.2,false);bx6(S,.04,.9,1.8,plaster,1.1,.45,-.2,false);
  bx6(S,2.4,.24,.03,new THREE.MeshStandardMaterial({map:brickTex11('#b5553a',512,256,4,1),roughness:.9}),0,.12,-.80,false);
  bx6(S,2.4,.015,.03,M6('#6a4028'),0,.245,-.79,false);
  // the window to the square at dusk, left
  {const w=new THREE.Mesh(new THREE.PlaneGeometry(.42,.3),new THREE.MeshBasicMaterial({map:tex(canvas(420,300,(g,W,H)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#3b4f8a');gr.addColorStop(.7,'#e79a6a');g.fillStyle=gr;g.fillRect(0,0,W,H);
      const cols=['#c8643c','#e8d6b4','#9cc2ea','#f2c230','#b5553a'];let x=0;while(x<W){const bw=R01(50,90),bh=R01(70,140);g.fillStyle=rnd(cols);g.fillRect(x,H-bh,bw,bh);g.beginPath();g.moveTo(x-4,H-bh);g.lineTo(x+bw/2,H-bh-30);g.lineTo(x+bw+4,H-bh);g.fill();
        g.fillStyle='#ffe2a0';for(let k=0;k<3;k++)g.fillRect(x+10+k*(bw-20)/3,H-bh+20,10,14);x+=bw+R01(2,8)}g.fillStyle='#fff6';for(let i=0;i<14;i++)g.fillRect(R01(0,W),R01(0,H*.4),2,2)}))}));
    w.position.set(-.62,.5,-.795);S.add(w);const fr=M6('#f4efe6');for(const [ww,hh,x,y] of[[.46,.025,0,.15],[.46,.025,0,-.15],[.025,.3,-.22,0],[.025,.3,.22,0],[.015,.3,0,0]])bx6(S,ww,hh,.02,fr,-.62+x,.5+y,-.79,false);
    bx6(S,.5,.02,.06,fr,-.62,.34,-.78);plant6(S,-.74,.35,-.78,.35);plant6(S,-.5,.35,-.78,.28)}
  // the wood-fired oven, back right
  {const G=new THREE.Group();const brick=new THREE.MeshStandardMaterial({map:brickTex11('#a84a30',512,512,2,2),roughness:.9});
    bx6(G,.44,.16,.34,brick,0,.08,0);const dome=new THREE.Mesh(new THREE.SphereGeometry(.2,32,16,0,Math.PI*2,0,Math.PI/2),brick);dome.scale.set(1.05,.85,.8);dome.position.y=.16;dome.castShadow=true;G.add(dome);
    const mouth=new THREE.Mesh(new THREE.CircleGeometry(.075,32,0,Math.PI),new THREE.MeshBasicMaterial({map:tex(canvas(256,128,(g,W,H)=>{g.fillStyle='#1a0c08';g.fillRect(0,0,W,H);
      const gr=g.createRadialGradient(W/2,H,4,W/2,H,H*1.1);gr.addColorStop(0,'#fff2a0');gr.addColorStop(.25,'#ffb030');gr.addColorStop(.6,'rgba(220,70,20,.8)');gr.addColorStop(1,'rgba(40,10,5,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);
      for(let i=0;i<14;i++){g.fillStyle=`rgba(255,${R01(140,230)|0},60,.85)`;g.beginPath();const x=R01(40,W-40);g.moveTo(x-12,H);g.quadraticCurveTo(x+R01(-10,10),H-R01(40,90),x+12,H);g.fill()}}))}));
    mouth.position.set(0,.165,.163);mouth.rotation.z=0;G.add(mouth);mouth.material.map.offset.y=0;
    const embers=new THREE.Mesh(new THREE.PlaneGeometry(.001,.001),new THREE.MeshBasicMaterial());
    const arch=new THREE.Mesh(new THREE.TorusGeometry(.075,.012,8,24,Math.PI),M6('#e8d6b4'));arch.position.set(0,.165,.165);G.add(arch);
    const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.5,16),M6('#3a3a3a',{metalness:.6,roughness:.4}));pipe.position.set(.06,.55,-.05);G.add(pipe);
    bx6(G,.5,.02,.38,M6('#6a4028'),0,.161,0);
    ovenLight=new THREE.PointLight('#ff8a3a',1.4,1.4,1.6);ovenLight.position.set(0,.2,.3);G.add(ovenLight);
    G.position.set(.66,0,-.58);S.add(G);oven11=G;
    // wood pile
    for(let i=0;i<7;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.12,8),M6('#7a5434'));l.rotation.z=Math.PI/2;l.position.set(.95+(i%3)*.002,.014+Math.floor(i/3)*.022,-.62+(i%3)*.026);l.castShadow=true;S.add(l)}}
  // the counter with the phone, the pizza peel and today's pizza
  {const wood=new THREE.MeshStandardMaterial({map:tex(woodTex2('#b8865a','#7a5434'),[2,1]),roughness:.6});
    bx6(S,.7,.13,.18,new THREE.MeshStandardMaterial({map:tex(canvas(256,64,(g,W,H)=>{for(let i=0;i<16;i++)for(let j=0;j<4;j++){g.fillStyle=(i+j)%2?'#c8352b':'#f4efe6';g.fillRect(i*16,j*16,16,16)}}),[1,1]),roughness:.7}),.32,.065,-.2);
    bx6(S,.74,.02,.22,wood,.32,.14,-.2);
    // telephone
    phone11=new THREE.Group();bx6(phone11,.07,.035,.055,M6('#c8352b',{roughness:.35}),0,.0175,0);const dial=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.006,20),M6('#f4efe6'));dial.position.set(0,.036,.008);phone11.add(dial);
    const hs=new THREE.Mesh(new THREE.CapsuleGeometry(.009,.06,6,10),M6('#c8352b',{roughness:.35}));hs.rotation.z=Math.PI/2;hs.position.set(0,.048,-.012);hs.name='handset';phone11.add(hs);
    phone11.position.set(.55,.15,-.22);phone11.rotation.y=-.4;S.add(phone11);
    // pizza on a board, toppings appear on it
    const board=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.008,32),wood);board.position.set(.22,.154,-.19);S.add(board);
    pizza11=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(.066,.064,.01,32),M6('#e8b56a',{roughness:.8}));pizza11.add(base);
    const sauce=new THREE.Mesh(new THREE.CylinderGeometry(.058,.058,.004,32),M6('#c8352b',{roughness:.6}));sauce.position.y=.006;pizza11.add(sauce);
    pizza11.position.set(.22,.163,-.19);S.add(pizza11);
    // menu board
    const mb=new THREE.Mesh(new THREE.PlaneGeometry(.34,.24),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(680,480,(g,W,H)=>{g.fillStyle='#2f3a33';g.fillRect(0,0,W,H);g.strokeStyle='#a87645';g.lineWidth=18;g.strokeRect(0,0,W,H);
      g.fillStyle='#ffd36b';g.font='800 64px "Baloo 2", sans-serif';g.fillText('PIZZA',60,90);g.fillStyle='#f4efe6';g.font='600 40px "Baloo 2", sans-serif';
      ['Juustopizza ....... 3 €','Ananaspizza ........ ?','Pähkinäpizza ..... 4 €','Kivipizza ........ EI!'].forEach((s,i)=>g.fillText(s,60,170+i*66));g.fillStyle='#9cc2ea';g.font='600 34px "Baloo 2"';g.fillText('Auki kello 11–21',60,H-34)}))}));
    mb.position.set(.3,.48,-.795);S.add(mb)}
  // the old arcade game, left
  {const G=new THREE.Group();const body=M6('#3f6fb8',{roughness:.5});bx6(G,.14,.3,.12,body,0,.15,0);bx6(G,.14,.06,.08,body,0,.33,-.02);bx6(G,.15,.02,.13,M6('#2d2a2e'),0,.205,.01);
    for(const [x,c] of[[-.03,'#c8352b'],[.0,'#f2c230'],[.03,'#3f9a4a']]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.007,.007,.008,12),M6(c,{roughness:.3}));b.position.set(x,.218,.04);G.add(b)}
    const stick=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.03,8),M6('#2d2a2e'));stick.position.set(-.045,.23,.02);G.add(stick);const ball=new THREE.Mesh(new THREE.SphereGeometry(.008,10,8),M6('#c8352b'));ball.position.set(-.045,.247,.02);G.add(ball);
    const sc=document.createElement('canvas');sc.width=160;sc.height=128;screen11={c:sc,g:sc.getContext('2d'),t:new THREE.CanvasTexture(sc),x:80,shots:[],aliens:[]};screen11.t.colorSpace=THREE.SRGBColorSpace;
    const scr=new THREE.Mesh(new THREE.PlaneGeometry(.11,.088),new THREE.MeshBasicMaterial({map:screen11.t}));scr.position.set(0,.27,.061);scr.rotation.x=-.25;G.add(scr);
    const marquee=new THREE.Mesh(new THREE.PlaneGeometry(.13,.04),new THREE.MeshBasicMaterial({map:tex(canvas(260,80,(g,W,H)=>{g.fillStyle='#f2c230';g.fillRect(0,0,W,H);g.fillStyle='#c8352b';g.font='800 46px "Baloo 2"';g.fillText('SIILI-PIU',20,58)}))}));marquee.position.set(0,.345,.021);G.add(marquee);
    const gl=new THREE.PointLight('#7ab8ff',.5,.5,2);gl.position.set(0,.27,.15);G.add(gl);
    G.position.set(-.78,0,-.45);G.rotation.y=.5;G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G)}
  // two little tables with checked cloths, a candle in a bottle
  for(const [x,z] of[[-.32,-.05],[-.55,.22]]){const G=new THREE.Group();const top=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.008,24),new THREE.MeshStandardMaterial({map:clothTex11(),roughness:.85}));top.position.y=.11;G.add(top);
    const cloth=new THREE.Mesh(new THREE.CylinderGeometry(.092,.1,.04,24,1,true),new THREE.MeshStandardMaterial({map:clothTex11(),roughness:.85,side:THREE.DoubleSide}));cloth.position.y=.09;G.add(cloth);
    const leg=new THREE.Mesh(new THREE.CylinderGeometry(.008,.012,.11,10),M6('#3a2a20'));leg.position.y=.055;G.add(leg);
    const bot=new THREE.Mesh(new THREE.CylinderGeometry(.012,.014,.04,12),M6('#3f7a4a',{roughness:.2,transparent:true,opacity:.85}));bot.position.y=.135;G.add(bot);
    const can=new THREE.Mesh(new THREE.CylinderGeometry(.004,.004,.02,8),M6('#fbf3e6'));can.position.y=.165;G.add(can);const fl=new THREE.Mesh(new THREE.SphereGeometry(.005,8,6),new THREE.MeshBasicMaterial({color:'#ffcf5a'}));fl.scale.y=1.8;fl.position.y=.18;G.add(fl);
    const cl=new THREE.PointLight('#ffb060',.35,.5,2);cl.position.y=.2;G.add(cl);lamps11.push([fl,cl]);
    for(const a of[0,Math.PI]){const ch=new THREE.Group();bx6(ch,.06,.008,.06,M6('#8a5434'),0,.065,0);bx6(ch,.06,.07,.008,M6('#8a5434'),0,.1,-.03);for(const sx of[-1,1])for(const sz of[-1,1])bx6(ch,.006,.065,.006,M6('#6a4028'),sx*.025,.032,sz*.025);ch.position.set(Math.sin(a)*.13,0,Math.cos(a)*.13);ch.rotation.y=a+Math.PI;G.add(ch)}
    G.position.set(x,0,z);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G)}
  // the wall clock above the counter: its hands are set in the clock part
  {const face_=new THREE.Mesh(new THREE.CircleGeometry(.075,48),new THREE.MeshStandardMaterial({roughness:.6,map:tex(canvas(256,256,(g,W,H)=>{g.fillStyle='#fbf6ec';g.fillRect(0,0,W,H);g.fillStyle='#3a2a20';g.font='800 30px "Baloo 2"';g.textAlign='center';g.textBaseline='middle';
      for(let i=1;i<=12;i++){const a=i/12*Math.PI*2;g.fillText(String(i),W/2+Math.sin(a)*96,H/2-Math.cos(a)*96)}}))}));face_.position.set(-.18,.58,-.795);S.add(face_);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(.076,.007,10,48),M6('#c8352b',{roughness:.4}));rim.position.copy(face_.position);S.add(rim);
    const mk=(len,w,c)=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.BoxGeometry(w,len,.003),M6(c));m.position.y=len/2-.006;g.add(m);g.position.set(-.18,.58,-.79);S.add(g);return g};
    clockH11=mk(.042,.007,'#3a2a20');clockM11=mk(.06,.004,'#3a2a20');setClock11(11,0)}
  // string lights and a glowing PIZZA sign
  {const n=16;for(let i=0;i<n;i++){const t=i/(n-1);const b=new THREE.Mesh(new THREE.SphereGeometry(.008,8,6),new THREE.MeshBasicMaterial({color:rnd(['#ffd36b','#ff8a6a','#9cd6ff','#a8e08a'])}));b.position.set(-1.05+t*2.1,.84-Math.sin(t*Math.PI)*.06,-.6);S.add(b)}
   const sign=new THREE.Mesh(new THREE.PlaneGeometry(.26,.07),new THREE.MeshBasicMaterial({transparent:true,map:tex(canvas(520,140,(g,W,H)=>{g.font='800 110px "Baloo 2", sans-serif';g.textAlign='center';g.shadowColor='#ff5fa2';g.shadowBlur=24;g.fillStyle='#ffd0e4';g.fillText('PIZZA',W/2,108)}))}));sign.position.set(-.62,.72,-.795);S.add(sign)}
  // a few things on the shelf by the oven
  bx6(S,.3,.012,.06,M6('#6a4028'),.66,.48,-.78);for(const [x,c,h] of[[.56,'#c8352b',.06],[.62,'#3f9a4a',.045],[.68,'#f2c230',.05],[.74,'#e8d6b4',.04]]){const j=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,h,14),M6(c,{roughness:.4}));j.position.set(x,.486+h/2,-.775);j.castShadow=true;S.add(j)}
  motes6(S,.3,.35,-.3,.6,.25,.4,90,'#ffd6a0');
  // flicker of the oven fire, and the old game running on its own
  (function tick(now){requestAnimationFrame(tick);if(scene!==pizS)return;if(ovenLight)ovenLight.intensity=1.2+Math.sin(now/90)*.15+Math.sin(now/37)*.1;
    for(const [f,l] of lamps11){l.intensity=.3+Math.sin(now/70+f.id)*.04}arcadeTick(now)})(0)}
function arcadeTick(now){const s=screen11;if(!s||now-(s.last||0)<70)return;s.last=now;const g=s.g;g.fillStyle='#0b1030';g.fillRect(0,0,160,128);
  if(s.aliens.length<6&&Math.random()<.08)s.aliens.push({x:R01(10,150),y:0});s.x+=Math.sin(now/600)*3;if(Math.random()<.15)s.shots.push({x:s.x,y:110});
  g.fillStyle='#ffd36b';for(const b of s.shots){b.y-=8;g.fillRect(b.x-1,b.y,2,6)}s.shots=s.shots.filter(b=>b.y>0);
  for(const a of s.aliens){a.y+=1.2;g.fillStyle='#a8e08a';g.fillRect(a.x-6,a.y,12,8);g.fillStyle='#0b1030';g.fillRect(a.x-3,a.y+2,2,2);g.fillRect(a.x+1,a.y+2,2,2)}
  s.aliens=s.aliens.filter(a=>{const hit=s.shots.some(b=>Math.abs(b.x-a.x)<7&&Math.abs(b.y-a.y)<8);return !hit&&a.y<120});
  g.fillStyle='#ff9ec8';g.beginPath();g.moveTo(s.x,104);g.lineTo(s.x-8,116);g.lineTo(s.x+8,116);g.fill();s.t.needsUpdate=true}
function setClock11(h,m=0){if(!clockH11)return;clockH11.rotation.z=-((h%12)+m/60)/12*Math.PI*2;clockM11.rotation.z=-m/60*Math.PI*2}
async function spinClock11(h,m=0,ms=900){if(!clockH11)return;const h0=-clockH11.rotation.z/(Math.PI*2)*12,h1=(h%12)+m/60;let d=h1-h0;while(d<0)d+=12;const t0=performance.now();
  await new Promise(r=>{(function f(){const k=Math.min(1,(performance.now()-t0)/ms),e=k*k*(3-2*k);const hh=h0+d*e;clockH11.rotation.z=-hh/12*Math.PI*2;clockM11.rotation.z=-(hh%1)*Math.PI*2;if(k<1)requestAnimationFrame(f);else r()})()})}
const PIZ_CAM=[new THREE.Vector3(.02,.27,.66),new THREE.Vector3(.08,.17,-.3)];
async function toPizza(){await goScene(pizS,buildPizza11,PIZ_CAM[0],PIZ_CAM[1],'home');putSiiliIn(pizS,-.06,.06,.2);if(lamps11.length)lamps11.forEach(([f,l])=>{f.visible=true;l.intensity=.35});if(ovenLight)ovenLight.visible=true}
const camCounter=()=>camTo(new THREE.Vector3(.26,.33,.64),new THREE.Vector3(.36,.14,-.15),1100);
const camArcade=()=>camTo(new THREE.Vector3(-.45,.3,.05),new THREE.Vector3(-.75,.22,-.45),1100);
const camClock=()=>camTo(new THREE.Vector3(-.18,.58,-.22),new THREE.Vector3(-.18,.552,-.8),1000);
const camOven=()=>camTo(new THREE.Vector3(.5,.28,-.05),new THREE.Vector3(.66,.17,-.6),1100);
const camHome=()=>camTo(PIZ_CAM[0],PIZ_CAM[1],1000);
/* the phone rings (made with WebAudio, quiet) */
let ringAC=null;function ring11(times=2){if(!st.snd)return sleep(times*900);ringAC??=new (window.AudioContext||window.webkitAudioContext)();const ac=ringAC,t0=ac.currentTime+.05;
  for(let r=0;r<times;r++)for(let k=0;k<10;k++){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=k%2?1180:960;const t=t0+r*.9+k*.04;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.01);g.gain.linearRampToValueAtTime(0,t+.04);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.05)}
  const p=phone11;if(p){const t1=performance.now();(function sh(){const k=performance.now()-t1;p.rotation.z=Math.sin(k/18)*.06*(k<times*900?1:0);if(k<times*900)requestAnimationFrame(sh)})()}return sleep(times*900)}
function lift11(up){const h=phone11?.getObjectByName('handset');if(h)h.position.y=up?.11:.048}

/* ---------- the clock you set yourself, and the word puzzle ---------- */
(function(){const css=document.createElement('style');css.textContent=`
#clk11{position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:none}
#clk11 .p{pointer-events:auto;background:var(--card);border-radius:50%;box-shadow:var(--shadow);padding:14px}
#clk11 svg{width:min(52vh,380px);height:min(52vh,380px);display:block}#clk11 .n{cursor:pointer}#clk11 .n circle{fill:#fff6e8;transition:.15s}#clk11 .n:hover circle{fill:#ffd36b}
#clk11 .n.bad circle{fill:#f2a6b8}#clk11 .n.ok circle{fill:#9fd39b}
#ord11{position:absolute;left:50%;bottom:110px;transform:translateX(-50%);display:none;flex-direction:column;align-items:center;gap:12px;pointer-events:auto;background:var(--card);border-radius:26px;padding:16px 20px;box-shadow:var(--shadow);min-width:min(620px,92vw)}
#ord11 .line{min-height:56px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;border-bottom:3px dashed #e6cfae;padding-bottom:8px;width:100%}
#ord11 .pool{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
#ord11 button{all:unset;cursor:pointer;background:#f6e6cf;border-radius:14px;padding:8px 16px;font:800 26px 'Baloo 2'}#ord11 .line button{background:#ffd36b}
#ord11 .q{font-weight:800;font-size:18px;color:#7a6556}`;document.head.append(css);
 const ui=document.getElementById('ui')||document.body;for(const [id,h] of[['clk11','<div class="p"></div>'],['ord11','<div class="q"></div><div class="line"></div><div class="pool"></div>']]){const d=document.createElement('div');d.id=id;d.innerHTML=h;ui.append(d)}})();
/* Saga clicks the hour on a big clock. Returns the number of wrong tries. */
function pickHour11(h,{onWrong}={}){const box_=$('#clk11'),p=box_.querySelector('.p');if(AUTO)return Promise.resolve(0);
  let s=`<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="96" fill="#fbf6ec" stroke="#c8352b" stroke-width="5"/>`;
  for(let i=1;i<=12;i++){const a=i/12*Math.PI*2,x=100+Math.sin(a)*74,y=100-Math.cos(a)*74;s+=`<g class="n" data-h="${i}"><circle cx="${x}" cy="${y}" r="17"/><text x="${x}" y="${y+7}" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="20" fill="#3a2a20">${i}</text></g>`}
  s+=`<circle cx="100" cy="100" r="5" fill="#3a2a20"/></svg>`;p.innerHTML=s;box_.style.display='flex';let tries=0;
  return new Promise(res=>p.querySelectorAll('.n').forEach(g=>g.onclick=async()=>{const v=+g.dataset.h;if(v===h){g.classList.add('ok');sfx('right',.3);await sleep(450);box_.style.display='none';res(tries)}
    else{tries++;g.classList.add('bad');sfx('wrong',.4);if(onWrong)await onWrong(tries)}}))}
/* Saga puts the words in the right order */
function order11(words,q){const box_=$('#ord11'),line=box_.querySelector('.line'),pool=box_.querySelector('.pool');box_.querySelector('.q').textContent=q;line.innerHTML='';pool.innerHTML='';
  if(AUTO)return Promise.resolve(0);box_.style.display='flex';let tries=0,pos=0;
  return new Promise(res=>{for(const w of shuffle(words.map((w,i)=>({w,i})))){const b=document.createElement('button');b.textContent=w.w;
    b.onclick=async()=>{if(words[pos]===w.w){line.append(b);b.onclick=null;pos++;sfx('right',.25);if(pos===words.length){await sleep(500);box_.style.display='none';res(tries)}}
      else{tries++;sfx('wrong',.35);b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:260})}};pool.append(b)}})}
{const _qa=qActive;qActive=function(){return _qa()||['#clk11','#ord11'].some(q=>{const e=$(q);return e&&e.style.display&&e.style.display!=='none'})}}

/* ---------- repetition: three quick questions from earlier parts ---------- */
const POOL11={};
function addPool11(k,item){POOL11[k]=item}
async function review11(n=3){const keys=st.r11.filter(k=>POOL11[k]);if(keys.length<3)return;showWord('Kertaus!','repetition',1600);await sleep(900);
  for(const k of shuffle(keys).slice(0,n))await POOL11[k]();}
/* register all review questions once */
for(const v of VB11){addPool11('v-'+v.k,async()=>{ask(`minä ${v.mi} → sinä …?`);const t=await mc11([{t:'sinä '+v.si,ok:true},{t:'sinä '+v.mi},{t:'sinä '+v.si.slice(0,-1)}]);showWord('sinä '+v.si,'du '+v.sv,1600);hit11('v-'+v.k,t);addPaws(t?1:2)})}
for(let h=1;h<=12;h++)addPool11('h-'+h,async()=>{const cp=cam.position.clone(),cl=camLook.clone();await camClock();await spinClock11(h);ask('Paljonko kello on?');const t=await mc11([{t:'kello '+NUM11[h],ok:true},{t:'kello '+NUM11[h%12+1]},{t:'kello '+NUM11[(h+5)%12+1]}]);hit11('h-'+h,t);addPaws(t?1:2);await camTo(cp,cl,900)});
for(const p of TOP11)addPool11('t-'+p.k,async()=>{showPic11(p.img);const t=await mc11(shuffle(TOP11).filter(x=>x!==p).slice(0,2).map(x=>({t:x.k})).concat([{t:p.k,ok:true}]),{q:'Vad är det på finska?'});hidePic();hit11('t-'+p.k,t);addPaws(t?1:2)});

/* ================= Part 1 · Pizzerian öppnar ================= */
async function c11Open(){await toPizza();setMusic('search');play('wave');await tr11(A11(0));play('present');await tr11(A11(1));
  await camCounter();play('happy');await tr11(A11(2));
  // three new words before anything else: pizza, peli, vanha
  showPic11('d-pizza','pizza');await sleep(1600);hidePic();
  await camArcade();play('point');await tr11(A11(3));showWord('peli','spel');await sleep(1200);await tr11(A11(4));showWord('vanha','gammal');await sleep(1200);
  play('happy');await tr11(A11(5));await sleep(500);play('jump');await tr11(A11(6));
  await camHome();play('think');await say(A11(7));ask('Vad spelar du? Välj!');
  await choose6([{t:'Just Dance',e:'💃',s:'dansspel',free:true,ok:true},{t:'Minecraft',e:'⛏️',s:'byggspel',free:true,ok:true},{t:'Love',e:'💗',s:'ditt eget spel!',free:true,ok:true},{t:'sählyä',e:'🏑',s:'innebandy',free:true,ok:true}]);clearCards();ask('');
  play('happy');await say(F11(9));if(has6(F11(9)+'s'))await say(F11(9)+'s',{sub:false});
  // the old game: vanha or uusi? (pictures from chapter 13 are already here)
  for(const [img,ok,no] of shuffle([['l-vanha','vanha','uusi'],['l-uusi','uusi','vanha']])){showPic11(img);const t=await mc11([{t:ok,ok:true},{t:no},{t:'hyvä'}],{q:'Är den gammal eller ny? Välj det finska ordet.'});hidePic();showWord(ok,ok==='vanha'?'gammal':'ny',1400);addPaws(t?1:3)}
  showPic11('v-pelaan');const t1=await typeIt(['peli'],'Skriv på finska: spel');hidePic();showWord('peli','spel');addPaws(t1?1:3);await praise();
  showPic11('d-pizza');const t2=await typeIt(['pizza'],'Skriv på finska: pizza (det är lätt!)');hidePic();addPaws(t2?1:2);
  const t3=await typeIt(['vanha'],'Skriv på finska: gammal');showWord('vanha','gammal');addPaws(t3?1:3);hit11('w-vanha',t3);await praise()}

/* ================= Part 2 · Minä och sinä: N blir T ================= */
async function c11MinaSina(){if(scene!==pizS)await toPizza();setMusic('home');
  // the rule first, slowly, with every verb shown as a pair
  play('present');for(const v of VB11){showWord('minä '+v.mi+' · sinä '+v.si,'jag '+v.sv+' · du '+v.sv,2400);if(v.img)showPicSrc(v.img,'');await say(A11(v.a),{sub:false});await sleep(250);hidePic()}
  play('think');await tr11(A11(19));await tr11(A11(20));
  showWord('N → T','minä tulen → sinä tulet',3200);play('point');await tr11(A11(21));await tr11(A11(22));
  // Siili gets it wrong twice; Saga corrects him
  play('happy');await say(A11(23),{sub:false});let t=await mc11([{t:'Sinä tulet!',ok:true},{t:'Sinä tulen!'},{t:'Sinä tule!'}],{q:'Siili säger fel! Vad är rätt?'});play('shake');await tr11(A11(24));addPaws(t?1:3);
  await say(A11(25),{sub:false});t=await mc11([{t:'Minä haluan pizzaa!',ok:true},{t:'Minä haluat pizzaa!'},{t:'Sinä haluan pizzaa!'}],{q:'Fel igen! Vad är rätt?'});play('happy');await tr11(A11(26));await tr11(A11(27));addPaws(t?1:3);
  // eight verbs: minä → sinä, every second one written
  let n=0;for(const v of shuffle(VB11).slice(0,8)){n++;if(v.img)showPicSrc(v.img,'');
    if(n%2===0){const tt=await typeIt(['sinä '+v.si,v.si],`minä ${v.mi} → sinä …  (skriv hela)`);hidePic();showWord('sinä '+v.si,'du '+v.sv,1600);await say(B11(v.b),{sub:false});hit11('v-'+v.k,tt);addPaws(tt?1:3);continue}
    const tt=await mc11([{t:'sinä '+v.si,ok:true},{t:'sinä '+v.mi},{t:'minä '+v.si}],{q:`minä ${v.mi} → ?`});hidePic();showWord('sinä '+v.si,'du '+v.sv,1600);await say(B11(v.b),{sub:false});hit11('v-'+v.k,tt);addPaws(tt?1:3)}
  await praise()}

/* ================= Part 3 · Siili gör, du gör ================= */
async function c11Sina(){if(scene!==pizS)await toPizza();await review11();setMusic('home');
  const withImg=VB11.filter(v=>v.img);
  // listen: Siili says "sinä X" – which picture?
  for(const v of shuffle(withImg).slice(0,6)){ask('Lyssna! Vilken bild säger Siili?');await rep11(()=>say(B11(v.b),{sub:false}));
    const t=await mc11(shuffle([v,...shuffle(withImg.filter(x=>x!==v)).slice(0,2)]).map(x=>({t:'',e:vImg(x,92),ok:x===v})),{onWrong:()=>say(B11(v.b),{sub:false})});
    unrep11();play('happy');showWord('sinä '+v.si,'du '+v.sv,1500);hit11('v-'+v.k,t);addPaws(t?1:3)}
  // picture → write the sinä form
  for(const v of shuffle(withImg).slice(0,4)){showPicSrc(v.img,'');const t=await typeIt(['sinä '+v.si,v.si],'Vad gör du på bilden? Skriv: sinä …');hidePic();showWord('sinä '+v.si,'du '+v.sv,1500);await say(B11(v.b),{sub:false});hit11('v-'+v.k,t);addPaws(t?1:3)}
  // Puhutko sinä suomea?
  play('think');await say(B11(11),{sub:false});await choose6([{t:'Kyllä!',e:'😊',s:'ja',free:true,ok:true},{t:'Vähän!',e:'🤏',s:'lite',free:true,ok:true}]);clearCards();
  play('happy');await tr11(B11(12));await praise()}

/* ================= Part 4 · Telefonen ringer ================= */
const CALL11=[
  {who:'Orava',img:'img6/squirrel.webp',ids:['q11-00','q11-01','q11-02','q11-03'],what:[{t:'pähkinäpizzaa',ok:true},{t:'teetä'},{t:'kivipizzaa'}],h:3,qa:19,qh:20},
  {who:'Pöllö-ope',img:'img6/owl.webp',ids:['o11-00','o11-01','o11-02','o11-03'],what:[{t:'pizzaa ja teetä',ok:true},{t:'pähkinäpizzaa'},{t:'jäätelöä'}],h:6,qa:21,qh:22},
  {who:'Peikko',img:'img11/peikko.webp',ids:['pk11-00','pk11-01','pk11-02','pk11-03','pk11-04'],what:[{t:'kivipizzaa',ok:true},{t:'pizzaa ja teetä'},{t:'juustopizzaa'}],h:11,qa:23,qh:24}];
async function c11Phone(){if(scene!==pizS)await toPizza();await review11();setMusic('home');await camCounter();
  for(const c of CALL11){siili.position.set(.47,0,.06);face(phone11.position);await ring11(2);play('scared');await say(B11(13),{sub:false});lift11(true);play('happy');await say(B11(14),{sub:false});
    const call=async()=>{showPicSrc(c.img,c.who);for(const id of c.ids)await say(id,{sub:false});hidePic()};await call();
    lift11(false);play('nod');await say(B11(17),{sub:false});if(c.who==='Peikko'){play('scared');await tr11(B11(26));play('happy');await tr11(B11(27))}
    face(cam.position);await tr11(B11(25));
    // what and when – Saga writes the order down
    await rep11(call);await say(B11(c.qa),{sub:false});let t=await mc11(c.what,{q:`Mitä ${c.who} haluaa?`});addPaws(t?1:3);hit11('call-'+c.who,t);
    await say(B11(c.qh),{sub:false});t=await mc11([{t:'kello '+NUM11[c.h],ok:true},...shuffle([3,6,11,2,9].filter(h=>h!==c.h)).slice(0,2).map(h=>({t:'kello '+NUM11[h]}))],{q:`Milloin ${c.who} tulee?`});addPaws(t?1:3);
    unrep11();const cp=cam.position.clone(),cl=camLook.clone();await camClock();await spinClock11(c.h);t=await typeIt([NUM11[c.h],'kello '+NUM11[c.h]],`Skriv i Siilis bok: ${c.who} kommer klockan … (på finska)`);showWord('kello '+NUM11[c.h],'klockan '+NUMSV[c.h],1600);hit11('h-'+c.h,t);addPaws(t?1:3);await camTo(cp,cl,900);await praise()}
  // who ordered what?
  await camHome();await say(B11(18),{sub:false});ask('Vem vill ha te?');let t=await mc11(CALL11.map(c=>({t:c.who,e:`<img src="${c.img}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:14px">`,ok:c.who==='Pöllö-ope'})));addPaws(t?1:3);
  ask('Vem kommer på natten?');t=await mc11(CALL11.map(c=>({t:c.who,e:`<img src="${c.img}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:14px">`,ok:c.who==='Peikko'})));addPaws(t?1:3);await praise()}

/* ================= Part 5 · Klockan ================= */
async function c11Clock(){if(scene!==pizS)await toPizza();await review11();setMusic('search');await camClock();
  play('think');await say(C11(0),{sub:false});
  // all twelve hours, the hand moves and Siili says it
  for(let h=1;h<=12;h++){await spinClock11(h,0,600);ask('kello '+NUM11[h]+'  ·  klockan '+NUMSV[h]);await say(C11(h),{sub:false});await sleep(300)}ask('');
  // clock → choose
  for(const h of shuffle([1,2,3,4,5,6,7,8,9,10,11,12]).slice(0,5)){await spinClock11(h);const t=await mc11([{t:'kello '+NUM11[h],ok:true},...shuffle([1,2,3,4,5,6,7,8,9,10,11,12].filter(x=>x!==h)).slice(0,2).map(x=>({t:'kello '+NUM11[x]}))],{q:'Paljonko kello on?'});hit11('h-'+h,t);addPaws(t?1:3);await say(C11(h),{sub:false})}
  // listen → Saga sets the clock herself
  await camHome();play('point');await tr11(C11(13));
  for(const h of shuffle([1,2,3,4,5,6,7,8,9,10,11,12]).slice(0,5)){ask('Lyssna och klicka på rätt timme!');await rep11(()=>say(C11(h),{sub:false}));const t=await pickHour11(h,{onWrong:()=>say(C11(h),{sub:false})});unrep11();ask('');await camClock();await spinClock11(h,0,500);ask('kello '+NUM11[h]);await sleep(1300);ask('');hit11('h-'+h,t);addPaws(t?1:3)}
  // writing the numbers
  for(const h of shuffle([2,3,4,5,6,7,9,10]).slice(0,4)){await spinClock11(h,0,500);const t=await typeIt([NUM11[h],'kello '+NUM11[h]],'Titta på klockan. Skriv på finska: kello …');ask('kello '+NUM11[h]);await sleep(1300);ask('');hit11('h-'+h,t);addPaws(t?1:3)}
  await praise()}

/* ================= Part 6 · Siilis dag ================= */
async function c11Day(){if(scene!==pizS)await toPizza();await review11();setMusic('home');
  play('present');await tr11(C11(14));
  for(const d of DAY11){await spinClock11(d.h,0,600);if(d.img)showPic11(d.img,'kello '+NUM11[d.h]);else showPicSrc('img11/v-tulen.webp','kello '+NUM11[d.h]);await say(C11(d.l),{sub:false});showWord(d.fi,d.sv,1400);await sleep(300);hidePic()}
  // what does Siili do at …?
  for(const d of shuffle(DAY11.filter(x=>x.img)).slice(0,5)){await spinClock11(d.h,0,500);showPic11(d.img,'');const others=shuffle(DAY11.filter(x=>x.fi!==d.fi)).slice(0,2);
    const t=await mc11([{t:d.fi,ok:true},...others.map(o=>({t:o.fi}))],{q:`Vad gör Siili klockan ${NUMSV[d.h]}?`});hidePic();await say(C11(d.l),{sub:false});addPaws(t?1:3)}
  // Siili asks Saga: answer with the minä form (any activity is fine, the form must be right)
  for(const [l,h] of[[24,7],[25,3],[26,4],[27,9]]){await spinClock11(h,0,500);await say(C11(l),{sub:false});const pick=rnd(DAY11.filter(x=>x.h===h).concat(DAY11)).fi.replace('minä ','');
    const v=pick.split(' ')[0];const bad=v.replace(/n$/,'t');
    const t=await mc11([{t:'Minä '+pick+'.',ok:true},{t:'Sinä '+pick+'.'},{t:'Minä '+pick.replace(v,bad)+'.'}],{q:'Vad svarar du? (jag …)'});play('happy');addPaws(t?1:3);await praise()}
  // build the sentence
  for(const d of shuffle(DAY11.filter(x=>x.fi.split(' ').length>=3)).slice(0,3)){showPic11(d.img||'v-tulen','');const W=['Kello',NUM11[d.h],...d.fi.split(' ')];const t=await order11(W,`Bygg meningen: klockan ${NUMSV[d.h]} – ${d.sv}`);hidePic();await say(C11(d.l),{sub:false});addPaws(t?1:3)}
  await praise()}

/* ================= Part 7 · Bygg pizzan ================= */
function topping11(k){const G=new THREE.Group();const add=(geo,mat,n,r=.045,y=.012,s=1)=>{for(let i=0;i<n;i++){const m=new THREE.Mesh(geo,mat);const a=Math.random()*Math.PI*2,rr=Math.sqrt(Math.random())*r;m.position.set(Math.cos(a)*rr,y,Math.sin(a)*rr);m.rotation.y=Math.random()*6;m.scale.setScalar(s);m.castShadow=true;G.add(m)}};
  if(k==='juusto'){const c=new THREE.Mesh(new THREE.CylinderGeometry(.056,.056,.004,32),M6('#f6d36a',{roughness:.5}));c.position.y=.009;G.add(c);add(new THREE.SphereGeometry(.006,6,4),M6('#f0c040'),18,.05,.012)}
  if(k==='ananas')add(new THREE.BoxGeometry(.012,.006,.01),M6('#f6e05a',{roughness:.4}),10);
  if(k==='sieni')add(new THREE.CylinderGeometry(.009,.006,.004,12),M6('#e8d6b4'),9);
  if(k==='salami')add(new THREE.CylinderGeometry(.011,.011,.003,16),M6('#c23a2b',{roughness:.5}),8);
  if(k==='oliivi')add(new THREE.TorusGeometry(.005,.0025,6,12),M6('#2d2a2e',{roughness:.3}),10,.045,.014);
  G.children.forEach(m=>{if(m.geometry.type==='TorusGeometry')m.rotation.x=Math.PI/2});G.name='top-'+k;pizza11.add(G);
  const t0=performance.now();G.scale.setScalar(.01);(function f(){const k_=Math.min(1,(performance.now()-t0)/400);G.scale.setScalar(.01+k_*.99);if(k_<1)requestAnimationFrame(f)})()}
function clearPizza11(){for(const c of[...pizza11.children])if(c.name?.startsWith('top-'))pizza11.remove(c);pizza11.position.set(.22,.163,-.19);pizza11.visible=true}
async function c11Pizza(){if(scene!==pizS)await toPizza();await review11();setMusic('home');clearPizza11();await camCounter();siili.position.set(.12,0,.06);face(pizza11.position);
  play('happy');await tr11(D11(3));showPic11('p-pohja','');await sleep(1200);hidePic();await say(D11(4),{sub:false});
  for(const p of TOP11){showPic11(p.img,p.k);await say(D11(p.l),{sub:false});showWord(p.k,p.sv,1300);topping11(p.k);await sleep(300);hidePic()}
  // listen → picture
  for(const p of shuffle(TOP11)){ask('Lyssna! Vad säger Siili?');await rep11(()=>say(D11(p.l),{sub:false}));const t=await mc11(shuffle([p,...shuffle(TOP11.filter(x=>x!==p)).slice(0,2)]).map(x=>({t:'',e:pic11(x.img,92),ok:x===p})),{onWrong:()=>say(D11(p.l),{sub:false})});unrep11();hit11('t-'+p.k,t);addPaws(t?1:3)}
  // picture → write
  for(const p of shuffle(TOP11).slice(0,4)){showPic11(p.img,'');const t=await typeIt([p.k],'Skriv på finska: '+p.sv);hidePic();showWord(p.k,p.sv,1200);hit11('t-'+p.k,t);addPaws(t?1:3)}
  // the pineapple question: there is no wrong answer
  clearPizza11();play('think');showPic11('p-ananas','');await say(D11(10),{sub:false});const {o}=await choose6([{t:'On!',e:'😋',s:'ja!',free:true,ok:true},{t:'Eikä ole!',e:'🤢',s:'nej!',free:true,ok:true}]);clearCards();hidePic();
  play(o.t==='On!'?'happy':'shake');await tr11(D11(o.t==='On!'?11:12));play('think');await tr11(D11(13));
  // Saga's own pizza
  await say(D11(14),{sub:false});ask('Välj vad du vill ha på pizzan! Klicka på Valmis när du är klar.');
  for(;;){const chosen=new Set([...pizza11.children].filter(c=>c.name?.startsWith('top-')).map(c=>c.name.slice(4)));const left=TOP11.filter(x=>!chosen.has(x.k));
    const {o}=await choose6([...left.map(x=>({t:x.k,e:pic11(x.img,70),s:x.sv,free:true,ok:true,k:x.k})),{t:'Valmis!',e:'✅',s:'klar',free:true,ok:true,done:true}]);clearCards();
    if(o.done||AUTO)break;topping11(o.k);await say(D11(TOP11.find(x=>x.k===o.k).l),{sub:false});if(!left.length)break}
  ask('');await camOven();const t0=performance.now(),p0=pizza11.position.clone(),p1=new THREE.Vector3(.66,.19,-.5);
  await new Promise(r=>{(function f(){const k=Math.min(1,(performance.now()-t0)/1400),e=k*k*(3-2*k);pizza11.position.lerpVectors(p0,p1,e);pizza11.position.y+=Math.sin(e*Math.PI)*.08;if(k<1)requestAnimationFrame(f);else r()})()});
  await sleep(1600);pizza11.position.copy(p0);await camCounter();play('jump');await tr11(D11(15));play('happy');await tr11(D11(16));await tr11(D11(17));
  // Lisää: fill in the gap (sinä form)
  for(const [l,pre,ok,post,sv] of[[0,'Huomenna sinä','tulet','kotiin.','I morgon kommer du hem.'],[1,'Sinä','pelaat','sählyä.','Du spelar innebandy.'],[2,'Sinä','haluat','jäätelön.','Du vill ha glass.']]){
    const base=ok.slice(0,-1);const t=await mc11([{t:ok,ok:true},{t:base+'n'},{t:base}],{q:`${pre} ___ ${post}   (${sv})`});await say(D11(l),{sub:false});addPaws(t?1:3)}
  await praise()}

/* ================= Part 8 · Siili berättar ================= */
async function c11Story(){if(scene!==pizS)await toPizza();await review11();setMusic('evening');await camHome();siili.position.set(.0,0,.05);face(cam.position);
  const moves=['happy','sad','present','sad','sniff','happy','shake','point','think','think','curl','scared','nod','happy','jump','think','sad'];
  for(let i=0;i<17;i++){if(i===11)ring11(1);play(moves[i]||'idle');await say(F11(i));if(has6(F11(i)+'s'))await say(F11(i)+'s',{sub:false});await sleep(250);
    if(i===4){ask('Vad beställer Orava alltid?');const t=await mc11([{t:'pähkinäpizzaa',ok:true},{t:'puuroa'},{t:'multapizzaa'}]);addPaws(t?1:3)}
    if(i===8){ask('Hur många gånger har Siili vunnit?');const t=await mc11([{t:'kerran',e:'1️⃣',s:'en gång',ok:true},{t:'tuhat kertaa',e:'🔢',s:'tusen gånger'},{t:'ei koskaan',e:'0️⃣',s:'aldrig'}]);addPaws(t?1:3)}
    if(i===12){ask('Vad var det som pep?');const t=await mc11([{t:'uuni',e:'🔥',s:'ugnen',ok:true},{t:'puhelin',e:'☎️',s:'telefonen'},{t:'peli',e:'🎮',s:'spelet'}]);addPaws(t?1:3)}}
  // four new words from the story
  for(const [fi,sv] of shuffle([['puuro','gröt'],['jäätelö','glass'],['väsynyt','trött'],['mummi','mormor']]).slice(0,3)){const t=await typeIt([fi],'Siili lärde dig ett nytt ord! Skriv på finska: '+sv);showWord(fi,sv,1400);addPaws(t?1:3)}
  await praise()}

/* ================= Part 9 · Prov och klistermärke ================= */
async function c11Test(){if(scene!==pizS)await toPizza();setMusic('search');await camHome();showWord('Koe!','prov',1800);await sleep(1200);
  // every item has to be right twice; a wrong one comes back three questions later
  const Q=[];const v=shuffle(VB11).slice(0,5),h=shuffle([1,2,3,4,5,6,7,8,9,10,11,12]).slice(0,4),p=shuffle(TOP11).slice(0,3);
  for(const x of v)Q.push({k:'v-'+x.k,f:()=>typeIt(['sinä '+x.si,x.si],`minä ${x.mi} → sinä …`),ok:()=>showWord('sinä '+x.si,'du '+x.sv,1200)});
  for(const x of h)Q.push({k:'h-'+x,f:async()=>{await camClock();await spinClock11(x,0,500);const t=await typeIt([NUM11[x],'kello '+NUM11[x]],'Paljonko kello on? Skriv: kello …');await camHome();return t},ok:()=>showWord('kello '+NUM11[x],'klockan '+NUMSV[x],1200)});
  for(const x of p)Q.push({k:'t-'+x.k,f:async()=>{showPic11(x.img,'');const t=await typeIt([x.k],'Skriv på finska vad det är');hidePic();return t},ok:()=>showWord(x.k,x.sv,1200)});
  Q.push({k:'call-Orava',f:()=>mc11([{t:'kello kolme',ok:true},{t:'kello kuusi'},{t:'kello yksitoista'}],{q:'Milloin Orava tulee?'}),ok:()=>{}});
  const need={};Q.forEach(q=>need[q.k]=2);const queue=shuffle(Q.concat(shuffle(Q)));let total=0,right=0;
  while(queue.length){const q=queue.shift();if(need[q.k]<=0)continue;total++;const t=await q.f();q.ok();if(t){sfx('wrong',.3);queue.splice(Math.min(3,queue.length),0,q);addPaws(1)}else{need[q.k]--;right++;addPaws(2)}hit11(q.k,t)}
  showWord(`${right} rätt på första försöket!`,'',2600);await praise();
  // closing time
  setMusic('evening');play('happy');await tr11(D11(18));play('wave');await tr11(D11(19));
  for(const [f,l] of lamps11){f.visible=false;l.intensity=0}if(ovenLight)ovenLight.intensity=.3;sfx('door',.25);play('curl');await tr11(D11(20));
  ask('Hyvää yötä, pizzeria!');await sleep(1600);ask('');await sticker11(11)}
async function sticker11(n){st['stk'+n]=true;save();if(AUTO)return;const s=$('#stk6');s.querySelector('img').src='img11/sticker'+n+'.webp';s.style.display='flex';sfx('fanfare',.5);await new Promise(r=>s.querySelector('button').onclick=r);s.style.display='none'}

const PARTS11=[{n:'Pizzeria Siili',d:'Det gamla spelet',f:c11Open},{n:'Minä ja sinä',d:'N blir T',f:c11MinaSina},{n:'Sinä teet',d:'Lyssna och skriv',f:c11Sina},
  {n:'Puhelin soi!',d:'Kunderna ringer',f:c11Phone},{n:'Paljonko kello on?',d:'Klockan',f:c11Clock},{n:'Siilin päivä',d:'Vad gör Siili när?',f:c11Day},
  {n:'Tehdään pizza!',d:'Bygg din pizza',f:c11Pizza},{n:'Siili kertoo',d:'Lyssna på Siili',f:c11Story},{n:'Koe',d:'Provet och klistermärket',f:c11Test}];
CHS.push({n:'11 · Mitä teet?',h:'Mitä sinä teet?',sub:'Kapitel 11 · Pizzeria Siili',P:PARTS11,key:'done11'});st.done11??=[];

/* the sticker album gets five more places */
showAlbum=function(){const g=$('#album6 .g');g.innerHTML='';const names=['Jee!','O ja U','Kiva tavata!','Yksi plus yksi','Hyvä idea!','Koulussa','Läksy','Minä teen','Färger','Nähdään!','Mitä teet?','Eikä ole!','Eetin skuutti','Koiran kuono','Kop kop kop!'];
  names.forEach((n,i)=>{const c=i+1;const got=c>=6?st['stk'+c]:c===2?st.stickers2:c===1?(st.done||[]).length>=6:false;const img=c>=11?`img11/sticker${c}.webp`:c>=6?`img6/sticker${c}.webp`:null;
    g.insertAdjacentHTML('beforeend',`<div><div class="s">${got&&img?`<img src="${img}" alt="">`:got?'⭐':c}</div><div class="n">${c} · ${n}</div></div>`)});$('#album6').style.display='flex'};
if(AUTO){const _v=window.__view;window.__view=async(n,q=0)=>{if(n==='pizza'||n==='pizzaclock'||n==='pizzaphone'){await ready;setQuality(q);$('#menu').classList.add('hidden');$('#start')?.classList.add('hidden');await toPizza();play('idle');if(n==='pizzaclock'){await camClock();await spinClock11(4)}if(n==='pizzaphone'){await camCounter();siili.position.set(.47,0,.06);face(phone11.position)}return 'ok'}return _v(n,q)}}
