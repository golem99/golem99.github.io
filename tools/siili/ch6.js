/* ================= Kapitel 6–10 och provrepetitionen (2026-10-25) =================
   Inför Sagas finskaprov fredag 30 oktober (luku 6–10). Nya platser byggs här i koden:
   klassrummet på kvällen (6), stadsbiblioteket (7), gymnastiksalen (8), parken i höstfärger (9);
   kalaset (10) är Siilis vardagsrum med ballonger. Repliker: k6-00 … (finska, svensk text som undertext),
   k6-00s (samma replik på svenska, Siilis röst), x6-52 (bara svenska), o-00 (ugglan), q-00 (ekorren), kw-x (ord).
   Meshy-modeller laddas om de finns (desk.glb, kiosk.glb, boardgame.glb, cake.glb, gifts.glb, bouquet.glb,
   football.glb, owl.glb, squirrel.glb); annars används enkla former eller utklippta bilder. */
const AUTO=/[?&]robot/.test(location.search);
const pic6=(n,sz=110)=>`<img src="img6/${n}.webp" alt="" style="width:${sz}px;height:${sz}px;object-fit:cover;border-radius:16px;display:block;margin:0 auto">`;
const has6=id=>!!LINES[id];
async function tr6(id){await say(id);if(has6(id+'s')&&st.sub&&!qActive())await say(id+'s',{sub:false})}
async function sayIf6(id){if(has6(id))await say(id)}
const optGLB6=f=>load(f).then(g=>g).catch(()=>null);
function choose6(opts,{hint}={}){if(AUTO){const o=opts.find(x=>x.ok)||opts[0];return Promise.resolve({o,b:document.createElement('div')})}return cardsChoice(opts,{hint})}
/* a big picture card floating above the scene */
(function(){const css=document.createElement('style');css.textContent=`
#pic6{position:absolute;top:16%;left:50%;transform:translate(-50%,0) scale(.7);opacity:0;transition:.35s cubic-bezier(.3,1.6,.5,1);background:var(--card);border-radius:28px;padding:14px;box-shadow:var(--shadow);pointer-events:none}
#pic6.on{opacity:1;transform:translate(-50%,0) scale(1)}#pic6 img{width:min(26vh,220px);height:min(26vh,220px);object-fit:cover;border-radius:20px;display:block}
#pic6 .cap{font:800 28px 'Baloo 2';text-align:center;color:var(--rust);margin-top:4px}
#type6{position:absolute;bottom:110px;left:50%;transform:translateX(-50%);background:var(--card);border-radius:24px;padding:16px 20px;box-shadow:var(--shadow);text-align:center;pointer-events:auto;display:none;min-width:min(520px,90vw)}
#type6 .q{font-weight:800;font-size:20px;margin-bottom:10px}#type6 input{font:800 34px 'Baloo 2';width:min(420px,80vw);text-align:center;border:3px solid #e6cfae;border-radius:16px;padding:6px 10px;color:#4a3426;background:#fffaf2;outline:none}
#type6 input.bad{animation:shake .4s;border-color:#d0674a}#type6 .row{margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
#type6 button{all:unset;cursor:pointer;background:#f6e6cf;border-radius:14px;padding:8px 16px;font:800 22px 'Baloo 2'}#type6 button.ok{background:#c8643c;color:#fff8ec}
#type6 .help{margin-top:8px;font-size:18px;color:#8a7466;min-height:24px}
#grid6{position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:auto;background:rgba(40,28,20,.35)}
#grid6 .board{background:var(--card);border-radius:26px;padding:16px;box-shadow:var(--shadow)}
#grid6 table{border-collapse:separate;border-spacing:6px}#grid6 td{width:min(11vw,104px);height:min(8.4vh,64px);border-radius:14px;background:#fff6e8;text-align:center;font:800 clamp(11px,1.25vw,15px) Nunito,sans-serif;color:#4a3426;padding:2px 4px;position:relative;cursor:default}
#grid6 td.h{font:800 26px 'Baloo 2';background:#ffd36b;width:auto}#grid6 td.v{background:#9cc2ea}#grid6 td.c{background:transparent}
#grid6 td.me{background:#f2a6b8}#grid6 td.si{background:#c9b28f}#grid6 td.cur{outline:4px solid #c8643c}
#grid6 td .own{position:absolute;right:4px;bottom:2px;font-size:18px}
#grid6 .dice{display:flex;gap:14px;justify-content:center;align-items:center;margin-top:10px}#grid6 .die{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;font:800 34px 'Baloo 2';color:#fff}
#grid6 .score{font:800 18px Nunito,sans-serif;margin-top:6px}
#search6{position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:none}
#search6 .board{pointer-events:auto;background:var(--card);border-radius:26px;padding:16px;box-shadow:var(--shadow)}
#search6 table{border-collapse:separate;border-spacing:5px}#search6 td{width:52px;height:52px;border-radius:12px;background:#fff6e8;text-align:center;font:800 30px 'Baloo 2';cursor:pointer;user-select:none}
#search6 td.sel{background:#ffd36b}#search6 td.found{background:#9fd39b}#search6 .words{margin-top:8px;font:800 18px Nunito;display:flex;gap:12px;justify-content:center}#search6 .words s{color:#7a9a6a}
#scarf6{position:absolute;top:14%;left:50%;transform:translateX(-50%);display:none;pointer-events:none}
#pal6{position:absolute;bottom:120px;left:50%;transform:translateX(-50%);display:none;gap:10px;pointer-events:auto}
#pal6 button{all:unset;cursor:pointer;width:62px;height:62px;border-radius:50%;box-shadow:var(--shadow);border:4px solid #fff8ec}
#stk6{position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:auto;background:rgba(40,28,20,.45)}
#stk6 .p{background:var(--card);border-radius:30px;padding:24px 30px;text-align:center;box-shadow:var(--shadow)}#stk6 img{width:min(40vh,300px);height:auto;animation:pop6 .7s cubic-bezier(.3,1.6,.5,1)}
@keyframes pop6{0%{transform:scale(.2) rotate(-20deg)}100%{transform:scale(1) rotate(0)}}
#chtabs{flex-wrap:wrap;max-width:720px;margin-left:auto;margin-right:auto}`;document.head.append(css);
 const ui=document.getElementById('ui')||document.body;
 for(const [id,html] of[['pic6','<img alt=""><div class="cap"></div>'],['type6','<div class="q"></div><input autocomplete="off" autocapitalize="off" spellcheck="false"><div class="row"><button data-k="ä">ä</button><button data-k="ö">ö</button><button class="ok">OK</button></div><div class="help"></div>'],
   ['grid6','<div class="board"></div>'],['search6','<div class="board"></div>'],['scarf6',''],['pal6',''],['stk6','<div class="p"><img alt=""><h2 style="font-family:Baloo 2;margin:10px 0 4px">Nytt klistermärke!</h2><button class="big">Jee!</button></div>']]){const d=document.createElement('div');d.id=id;d.innerHTML=html;ui.append(d)}})();
function showPic(n,cap='',ms=0){const p=$('#pic6');p.querySelector('img').src='img6/'+n+'.webp';p.querySelector('.cap').textContent=cap;p.classList.add('on');clearTimeout(showPic.t);if(ms)showPic.t=setTimeout(hidePic,ms)}
function hidePic(){$('#pic6').classList.remove('on')}
const fold6=s=>s.toLowerCase().normalize('NFC').replace(/[!?.,…"'´`]/g,'').replace(/\s+/g,' ').trim();
function lev6(a,b){const m=a.length,n=b.length;const d=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
/* Saga writes the Finnish word herself. answers: list of accepted spellings (the first is shown as the right one).
   One letter wrong in a long word counts, but the right spelling is shown. Returns the number of tries. */
function typeIt(answers,q){const box_=$('#type6'),inp=box_.querySelector('input'),help=box_.querySelector('.help');box_.querySelector('.q').textContent=q;inp.value='';help.textContent='';box_.style.display='block';
  const A=[].concat(answers),best=A[0];if(AUTO){box_.style.display='none';return Promise.resolve(0)}
  setTimeout(()=>inp.focus(),50);let tries=0;
  return new Promise(res=>{const check=()=>{const v=fold6(inp.value);if(!v)return;const ok=A.some(a=>fold6(a)===v);const near=!ok&&A.some(a=>fold6(a).length>=5&&lev6(fold6(a),v)===1);
      if(ok){box_.style.display='none';if(tries){st.miss??={};st.miss[best]=(st.miss[best]||0)+1;save()}else if(st.miss&&st.miss[best]){st.miss[best]--;if(st.miss[best]<=0)delete st.miss[best];save()}res(tries);return}
      if(near){tries++;sfx('wrong',.3);help.innerHTML='Nästan! Det stavas <b style="color:#c8643c;font-size:24px">'+best+'</b> – skriv det rätt.';inp.select();return}
      tries++;sfx('wrong',.4);inp.classList.remove('bad');void inp.offsetWidth;inp.classList.add('bad');
      if(tries===1)help.textContent='Försök igen! Det börjar med '+best.slice(0,2)+' …';else if(tries===2)help.textContent=best.split('').map((c,i)=>i%2?'_':c).join(' ');else{help.textContent='Skriv: '+best}};
    box_.querySelector('.ok').onclick=check;inp.onkeydown=e=>{if(e.key==='Enter')check()};
    box_.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{inp.value+=b.dataset.k;inp.focus()})})}
async function sticker6(n){st['stk'+n]=true;save();if(AUTO)return;const s=$('#stk6');s.querySelector('img').src='img6/sticker'+n+'.webp';s.style.display='flex';sfx('fanfare',.5);
  await new Promise(r=>s.querySelector('button').onclick=r);s.style.display='none'}
async function quizWords(list,{q,mk,after,n=6,type=0}){ /* list: [{fi,sv,img,say,ok}] choose the Finnish word for a picture */
  const L=shuffle(list).slice(0,n);let k=0;
  for(const w of L){k++;const writing=type&&k%type===0;
    if(w.img)showPic(w.img,writing?'':'');if(w.ask)await say(w.ask);
    if(writing){const t=await typeIt(w.acc||w.fi,q?.typ||'Skriv på finska: '+(w.sv||''));hidePic();play('happy');showWord(w.fi,w.sv);learn(w.fi);addPaws(t?1:3);if(after)await after(w,t);else await praise();continue}
    ask(q?.ch||'Vad är det på finska?');let tries=0;
    for(;;){const opts=shuffle([w,...shuffle(list.filter(x=>x.fi!==w.fi)).slice(0,2)]).map(x=>({t:x.fi,e:'',s:'',ok:x===w,x}));
      const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');hidePic();play('happy');showWord(w.fi,w.sv);learn(w.fi);addPaws(tries?1:3);if(after)await after(w,tries);else await praise();break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await say(rnd(OOPS))}}
  hidePic()}


/* ---------- rules for every chapter (2026-10-25 kväll, efter Sagas första runda) ----------
   1) While a question is open, Siili's Swedish subtitle is not shown, and the answer cards never show Swedish
      under the Finnish word (except free choices, where nothing is being tested).
   2) Movement words in chapter 2 are shown as pictures (img2/move-*.webp) instead of hard-to-read animations.
   3) The boat leaves the harbour slowly: it turns first, then picks up speed. */
function qActive(){const a=$('#ask');return (a&&a.textContent.trim()!==''&&a.style.opacity!=='0')||$('#cards').children.length>0||$('#type6').style.display==='block'||pickHandler!==null||['#pal6','#grid6','#search6'].some(q=>{const e=$(q);return e&&e.style.display&&e.style.display!=='none'})}
{const _s0=say0;say0=function(id,o={}){if(qActive())o={...o,sub:false};return _s0(id,o)}}
cardsChoice=function(opts,{hint}={}){const box_=$('#cards');box_.innerHTML='';return new Promise(r=>{for(const o of opts){const b=document.createElement('button');b.className='card';b.innerHTML=`<div class="e">${o.e||''}</div><div class="t">${o.t}</div><div class="s">${st.sub&&o.free?(o.s||''):''}</div>`;b.onclick=()=>r({o,b});box_.append(b)}})};
{const _bt=boatTo;boatTo=function(x,z,ms){if(!harbBoat||x<=harbBoat.position.x+3)return _bt(x,z,ms);
  const b=harbBoat,p0=b.position.clone(),r0=b.rotation.y,r1=-Math.PI/2,turn=2600,go=ms*1.9,t0=performance.now();
  return new Promise(res=>{(function s(){const t=performance.now()-t0;
    if(t<turn){const k=t/turn,e=k*k*(3-2*k);b.rotation.y=r0+(r1-r0)*e;b.position.x=p0.x+e*.35;b.position.z=p0.z+Math.sin(e*Math.PI)*.25;requestAnimationFrame(s);return}
    const k=Math.min(1,(t-turn)/go),e=k*k*k*(k*(6*k-15)+10);const px=p0.x+.35,pz=p0.z;b.position.x=px+(x-px)*e;b.position.z=pz+(z-pz)*e;b.rotation.z=Math.sin(t/700)*.03;if(k<1)requestAnimationFrame(s);else res()})()})}}
const MV2={suit:'💨',hissun:'👉',hopo:'💬',mukkelis:'🤸',sikin:'🔀',kipin:'🏃',kiikun:'⚖️',nippa:'🤏'};const mvOK={};
for(const k in MV2){const im=new Image();im.onload=()=>mvOK[k]=true;im.src='img2/move-'+k+'.webp'}
const mvPic=(k,sz=96)=>mvOK[k]?`<img src="img2/move-${k}.webp" alt="" style="width:${sz}px;height:${sz}px;object-fit:cover;border-radius:16px;display:block;margin:0 auto">`:`<div style="font-size:${Math.round(sz*.6)}px;line-height:1.2">${MV2[k]}</div>`;
async function c2MovesPic(){if(scene!==harbS){await toHarbor()}
  bucketO.visible=bucketU.visible=false;siili.position.set(.15,0,-.25);face(cam.position);camTo(HARB_CAM[0],HARB_CAM[1],1000);setMusic('home');await say('c2-move');
  const keys=shuffle(Object.keys(MOVES2));
  for(const k of keys.slice(0,5)){if(mvOK[k])showPicSrc('img2/move-'+k+'.webp',MOVES2[k].t);else showWord(MOVES2[k].t,'',2400);play(MOVES2[k].a);await say('r-'+k);await sleep(600);hidePic();play('idle',.3)}
  for(const k of shuffle(keys.slice(0,5))){if(mvOK[k])showPicSrc('img2/move-'+k+'.webp','');await say('c2-which');ask('Vilket ordpar passar bilden?');let tries=0;
    const opts=shuffle([k,...shuffle(keys.filter(x=>x!==k)).slice(0,2)]).map(x=>({t:MOVES2[x].t,e:mvOK[k]?'':MV2[x],k:x,ok:x===k}));
    for(;;){const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');hidePic();play(MOVES2[k].a);await say('r-'+k);learn(MOVES2[k].t);addPaws(tries?1:3);await praise();break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;await say(rnd(OOPS))}
    play('idle',.3)}}
function showPicSrc(src,cap){const p=$('#pic6');p.querySelector('img').src=src;p.querySelector('.cap').textContent=cap;p.classList.add('on')}
PARTS2[3].f=c2MovesPic;


/* ---------- sticker album in the menu ---------- */
{const css=document.createElement('style');css.textContent=`#albumB{all:unset;cursor:pointer;display:inline-block;margin-top:10px;padding:8px 16px;border-radius:999px;background:#ffd36b;font:800 16px Nunito,sans-serif}
#album6{position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:auto;background:rgba(40,28,20,.55);z-index:5}
#album6 .p{background:#fff6e8;border-radius:30px;padding:22px 26px;box-shadow:var(--shadow);text-align:center;max-width:min(860px,94vw)}
#album6 .g{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin:12px 0}
#album6 .s{width:min(15vw,130px);height:min(15vw,130px);border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;font:800 38px 'Baloo 2';color:#cdb89a;background:repeating-linear-gradient(45deg,#f3e6d2,#f3e6d2 8px,#efdcc2 8px,#efdcc2 16px);border:4px dashed #e0c9a6}
#album6 .s img{width:100%;height:100%;border-radius:50%}#album6 .n{font:800 13px Nunito;margin-top:4px;color:#7a6556}`;document.head.append(css);
 const d=document.createElement('div');d.id='album6';d.innerHTML='<div class="p"><h1 style="font-family:Baloo 2;margin:0;color:var(--rust)">Siilis album</h1><div class="g"></div><button class="big">Stäng</button></div>';(document.getElementById('ui')||document.body).append(d);
 d.querySelector('button').onclick=()=>d.style.display='none'}
function showAlbum(){const g=$('#album6 .g');g.innerHTML='';const names=['Jee!','O ja U','Kiva tavata!','Yksi plus yksi','Hyvä idea!','Koulussa','Läksy','Minä teen','Färger','Nähdään!'];
  names.forEach((n,i)=>{const c=i+1;const got=c>=6?st['stk'+c]:c===2?st.stickers2:c===1?(st.done||[]).length>=6:false;const img=c>=6?`img6/sticker${c}.webp`:null;
    g.insertAdjacentHTML('beforeend',`<div><div class="s">${got&&img?`<img src="${img}" alt="">`:got?'⭐':c}</div><div class="n">${c} · ${n}</div></div>`)});$('#album6').style.display='flex'}
{const _rm=renderMenu;renderMenu=function(){_rm();if(!$('#albumB')){const b=document.createElement('button');b.id='albumB';b.textContent='📒 Siilis album';b.onclick=showAlbum;$('#doors').after(b)}}}

/* ---------- shared scene helpers ---------- */
function lightRoom6(S,{sky='#ffd8b0',ground='#6a5040',hemi=1,key='#ffd2a0',keyI=2.4,keyPos=[-4,6,3],shadow=4}={}){
  S.add(new THREE.HemisphereLight(sky,ground,hemi));const k=new THREE.DirectionalLight(key,keyI);k.position.set(...keyPos);k.castShadow=true;k.shadow.mapSize.set(2048,2048);
  Object.assign(k.shadow.camera,{left:-shadow,right:shadow,top:shadow,bottom:-shadow,near:.5,far:30});k.shadow.bias=-.0005;k.shadow.normalBias=.02;k.shadow.radius=5;k.target.position.set(0,0,-.5);S.add(k,k.target);return k}
function paintTex6(w,h,base,draw){return tex(canvas(w,h,(g,W,H)=>{g.fillStyle=base;g.fillRect(0,0,W,H);for(let i=0;i<900;i++){g.fillStyle=`rgba(${Math.random()<.5?'0,0,0':'255,255,255'},${(Math.random()*.035).toFixed(3)})`;g.fillRect(Math.random()*W,Math.random()*H,R01(2,14),R01(2,14))}draw&&draw(g,W,H)}))}
const M6=(c,o={})=>new THREE.MeshStandardMaterial({color:c,roughness:.85,...o});
function bx6(S,w,h,d,mat,x,y,z,sh=true){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=sh;m.receiveShadow=true;S.add(m);return m}
function room6(S,{w,d,h,y0,floor,wall,ceil='#f4ece0'}){const f=bx6(S,w,.04,d,floor,0,y0-.02,-d/2+2,false);
  bx6(S,w,h,.1,wall,0,y0+h/2,-d+2,false);bx6(S,.1,h,d,wall,-w/2,y0+h/2,-d/2+2,false);bx6(S,.1,h,d,wall,w/2,y0+h/2,-d/2+2,false);
  const c=bx6(S,w,.05,d,M6(ceil),0,y0+h,-d/2+2,false);c.castShadow=false;return f}
function bookTex6(){return tex(canvas(512,256,(g,W,H)=>{let x=0;const cols=['#a8473a','#3f6e8c','#d9a441','#4f7a4a','#7a4b6e','#c8643c','#2f4a3f','#e0c9a6','#5b6fa8','#9b2f24'];
  while(x<W){const w=R01(10,26),h=R01(H*.6,H*.95);g.fillStyle=rnd(cols);g.fillRect(x,H-h,w,h);g.fillStyle='rgba(255,240,210,.5)';g.fillRect(x+2,H-h+R01(8,20),w-4,3);g.fillRect(x+2,H-R01(12,24),w-4,2);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+w-2,H-h,2,h);x+=w+R01(0,2)}}),[1,1])}
function shelf6(S,x,y,z,w,h,ry=0){const G=new THREE.Group();const wood=M6('#7a5434');const n=Math.round(h/.38);
  bx6(G,w,h,.05,wood,0,h/2,-.16,false);for(const s of[-1,1])bx6(G,.05,h,.36,wood,s*w/2,h/2,0,true);
  for(let i=0;i<=n;i++){bx6(G,w,.035,.36,wood,0,i*h/n,0,true);if(i<n){const b=new THREE.Mesh(new THREE.PlaneGeometry(w-.08,h/n-.05),new THREE.MeshStandardMaterial({map:bookTex6(),roughness:.9}));b.position.set(0,i*h/n+(h/n)/2,.1);G.add(b)}}
  G.position.set(x,y,z);G.rotation.y=ry;S.add(G);return G}
function win6(S,x,y,z,w,h,ry,glow='#ffcf9a'){const G=new THREE.Group();const fr=M6('#f4efe6');
  const gl=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex(canvas(256,256,(g,W,H)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#6f8fc2');gr.addColorStop(.6,glow);gr.addColorStop(1,'#e59a6a');g.fillStyle=gr;g.fillRect(0,0,W,H);
    g.fillStyle='rgba(40,50,40,.55)';for(let i=0;i<9;i++){const tx=R01(0,W),th=R01(H*.3,H*.6);g.beginPath();g.moveTo(tx-30,H);g.lineTo(tx,H-th);g.lineTo(tx+30,H);g.fill()}}))}));
  G.add(gl);for(const [w_,h_,xx,yy] of[[w+.08,.06,0,h/2],[w+.08,.06,0,-h/2],[.06,h,-w/2,0],[.06,h,w/2,0],[.04,h,0,0],[w,.04,0,0]])bx6(G,w_,h_,.06,fr,xx,yy,.01,false);
  G.position.set(x,y,z);G.rotation.y=ry;S.add(G);return G}
async function placeGLB6(S,f,{x=0,y=0,z=0,ry=0,h,w},fallback){const g=await optGLB6(f);if(!g){const fb=fallback&&fallback();if(fb){fb.position.set(x,y,z);fb.rotation.y=ry;S.add(fb)}return fb}
  const inner=g.scene;fitModel(inner,h?{h}:{w});const m=new THREE.Group();m.add(inner);m.position.set(x,y,z);m.rotation.y=ry;m.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material){o.material.roughness=Math.max(o.material.roughness??.6,.5)}}});S.add(m);m.userData.glb=g;return m}
function putSiiliIn(S,x=0,z=0,ry=0){SIILI_CLIP.length=0;S.add(siili);siili.position.set(x,0,z);siili.rotation.y=ry;yawTarget=null}
async function goScene(S,build,camP,camL,music='home'){build();setMusic(music);await fadeTo(S);cam.position.copy(camP);camLook.copy(camL)}
function deskFallback(){const G=new THREE.Group();const top=new THREE.MeshStandardMaterial({map:tex(woodTex2('#e2c9a0','#b8946a'),[1,1]),roughness:.55});const leg=M6('#9cc5a8',{metalness:.3,roughness:.5});bx6(G,.62,.03,.46,top,0,.73,0);for(const sx of[-1,1])for(const sz of[-1,1])bx6(G,.03,.72,.03,leg,sx*.28,.36,sz*.2);bx6(G,.56,.12,.38,M6('#d9c39c'),0,.64,0);
  const ch=new THREE.Group();bx6(ch,.36,.03,.34,top,0,.44,0);bx6(ch,.36,.26,.03,top,0,.6,-.17);for(const sx of[-1,1])for(const sz of[-1,1])bx6(ch,.025,.44,.025,leg,sx*.16,.22,sz*.15);ch.position.z=.38;G.add(ch);return G}


/* ---------- details that make the rooms feel lived in ---------- */
function plant6(S,x,y,z,s=1){const G=new THREE.Group();const pot=new THREE.Mesh(new THREE.CylinderGeometry(.09,.07,.14,20),M6('#c0674a'));pot.position.y=.07;G.add(pot);const soil=new THREE.Mesh(new THREE.CircleGeometry(.085,20),M6('#3a2a20'));soil.rotation.x=-Math.PI/2;soil.position.y=.135;G.add(soil);
  for(let i=0;i<9;i++){const l=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M6(rnd(['#4f8a46','#5f9a4e','#3f7a3e']),{roughness:.7}));const a=i/9*Math.PI*2;l.scale.set(.5,1.6,.25);l.position.set(Math.cos(a)*.05,.2+R01(0,.06),Math.sin(a)*.05);l.rotation.set(Math.sin(a)*.5,a,Math.cos(a)*.5);G.add(l)}
  G.scale.setScalar(s);G.position.set(x,y,z);G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G);return G}
function clock6(S,x,y,z,ry=0,r=.22){const f=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.04,40),new THREE.MeshStandardMaterial({roughness:.6,map:tex(canvas(256,256,(g,W,H)=>{g.fillStyle='#fbf6ec';g.fillRect(0,0,W,H);g.fillStyle='#3a2a20';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.fillRect(W/2+Math.cos(a)*100-4,H/2+Math.sin(a)*100-4,8,8)}
  g.lineWidth=8;g.strokeStyle='#3a2a20';g.beginPath();g.moveTo(W/2,H/2);g.lineTo(W/2+50,H/2-30);g.stroke();g.lineWidth=5;g.beginPath();g.moveTo(W/2,H/2);g.lineTo(W/2-10,H/2+80);g.stroke()}))}));f.rotation.x=Math.PI/2;f.rotation.z=ry;f.position.set(x,y,z);S.add(f);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.02,10,40),M6('#3a2a20',{metalness:.4}));rim.position.set(x,y,z+.02*Math.cos(ry));rim.rotation.y=ry;S.add(rim)}
function beam6(S,from,to,w,col='#ffcf90',op=.13){const d=new THREE.Vector3().subVectors(to,from);const len=d.length();const g=new THREE.CylinderGeometry(w*.6,w,len,24,1,true);g.translate(0,-len/2,0);
  const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.copy(from);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),d.normalize());S.add(m);return m}
function motes6(S,cx,cy,cz,sx,sy,sz,n=160,col='#ffe2b0'){const g=new THREE.BufferGeometry();const p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=cx+R01(-sx,sx);p[i*3+1]=cy+R01(-sy,sy);p[i*3+2]=cz+R01(-sz,sz)}g.setAttribute('position',new THREE.BufferAttribute(p,3));
  const pts=new THREE.Points(g,new THREE.PointsMaterial({color:col,size:.012,transparent:true,opacity:.7,depthWrite:false,blending:THREE.AdditiveBlending}));S.add(pts);
  (function tick(now){requestAnimationFrame(tick);if(scene!==S)return;const a=g.attributes.position;for(let i=0;i<n;i++){a.array[i*3+1]+=Math.sin(now/1700+i)*.00025;a.array[i*3]+=Math.cos(now/2100+i*1.3)*.0002}a.needsUpdate=true})(0)}
function backpack6(S,x,y,z,c){const G=new THREE.Group();const b=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.16,6,14),M6(c,{roughness:.8}));b.scale.z=.55;G.add(b);const p=new THREE.Mesh(new THREE.CapsuleGeometry(.07,.05,6,12),M6(c,{roughness:.8}));p.scale.z=.4;p.position.set(0,-.08,.06);G.add(p);
  const s=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,6,16,Math.PI),M6('#3a2a20'));s.position.y=.2;G.add(s);G.position.set(x,y,z);G.rotation.y=Math.PI/2;G.traverse(o=>{if(o.isMesh)o.castShadow=true});S.add(G)}

/* ================= Kapitel 6 · Koulussa: klassrummet på kvällen ================= */
const clsS=new THREE.Scene();let clsBuilt=false,clsLamps=[],kioskG=null;
function buildClass(){if(clsBuilt)return;clsBuilt=true;const S=clsS;S.background=new THREE.Color('#2a1e1a');S.fog=new THREE.Fog('#3a2a22',5,14);
  lightRoom6(S,{sky:'#ffd2b0',ground:'#3a2820',hemi:.55,key:'#ffa860',keyI:3.4,keyPos:[-5,2.4,1.2],shadow:3});
  const Y=-.76;room6(S,{w:8,d:7,h:3,y0:Y,floor:new THREE.MeshStandardMaterial({map:tex(woodTex2('#b08a62','#7a5a3c'),[6,6]),roughness:.85}),wall:new THREE.MeshStandardMaterial({map:paintTex6(512,512,'#e9d3b4'),roughness:.95})});
  // the blackboard with today's lesson on it
  const bb=new THREE.Mesh(new THREE.PlaneGeometry(3.4,1.2),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(1024,360,(g,W,H)=>{g.fillStyle='#2f4a3f';g.fillRect(0,0,W,H);for(let i=0;i<400;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.04})`;g.fillRect(Math.random()*W,Math.random()*H,R01(20,90),R01(2,8))}
    g.fillStyle='#f4efe6';g.font='700 64px "Baloo 2", sans-serif';g.fillText('Hyvää huomenta!',60,110);g.font='600 50px "Baloo 2", sans-serif';g.fillText('Mikä tämä on?   Se on …',60,200);g.fillStyle='#ffd36b';g.fillText('appelsiini – apelsin',60,290)}))}));
  bb.position.set(0,Y+1.55,-4.93);S.add(bb);bx6(S,3.5,.05,.1,M6('#7a5434'),0,Y+.93,-4.9);
  // posters from the book: the map of Finland and KARHU – BJÖRN
  const poster=(x,draw)=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(.7,.9),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(280,360,(g,W,H)=>{g.fillStyle='#fbf6ec';g.fillRect(0,0,W,H);draw(g,W,H)}))}));p.position.set(x,Y+1.8,-4.94);S.add(p)};
  poster(-2.6,(g,W,H)=>{g.fillStyle='#2b2626';g.font='700 22px Nunito';g.fillText('SUOMI • FINLAND',36,40);g.beginPath();g.moveTo(140,60);g.bezierCurveTo(190,90,170,140,200,180);g.bezierCurveTo(230,240,210,300,160,330);g.bezierCurveTo(110,340,80,300,100,250);g.bezierCurveTo(60,200,120,150,110,110);g.closePath();g.fill()});
  poster(2.6,(g,W,H)=>{g.fillStyle='#2b2626';g.font='700 34px Nunito';g.fillText('KARHU',80,60);g.fillText('BJÖRN',80,100);g.fillStyle='#7a4f30';g.beginPath();g.ellipse(140,240,90,50,0,0,7);g.fill();g.beginPath();g.ellipse(215,205,38,32,0,0,7);g.fill();for(const lx of[80,110,170,200])g.fillRect(lx,270,20,50)});
  // bunting with Finnish flags
  {const n=14;for(let i=0;i<n;i++){const t=i/(n-1),x=-3.6+t*7.2,y=Y+2.75-Math.sin(t*Math.PI)*.35;const f=new THREE.Mesh(new THREE.PlaneGeometry(.22,.16),new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:tex(canvas(88,64,(g,W,H)=>{g.fillStyle='#fff';g.fillRect(0,0,W,H);g.fillStyle='#1f4fa3';g.fillRect(24,0,14,H);g.fillRect(0,25,W,14)}))}));f.position.set(x,y,-4.8);S.add(f)}}
  win6(S,-3.94,Y+1.6,-1.6,1.4,1.5,Math.PI/2);win6(S,-3.94,Y+1.6,.4,1.4,1.5,Math.PI/2);
  const glow=new THREE.PointLight('#ffb070',1.6,6,1.6);glow.position.set(-3.4,Y+1.6,-.6);S.add(glow);
  // ceiling lamps that Siili turns off at the end
  for(const [x,z] of[[-1.5,-2.5],[1.5,-2.5],[-1.5,.2],[1.5,.2]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.25,.32,.12,24),new THREE.MeshStandardMaterial({color:'#fff4dc',emissive:new THREE.Color('#ffe2a8'),emissiveIntensity:1.4}));l.position.set(x,Y+2.85,z);S.add(l);
    const pl=new THREE.PointLight('#ffe2b8',.9,5,1.6);pl.position.set(x,Y+2.6,z);S.add(pl);clsLamps.push([l,pl])}
  // Siili's own desk (he stands on it), and the rest of the class
  {const d=deskFallback();d.position.set(0,Y-.01,0);S.add(d);optGLB6('desk.glb').then(g=>{if(!g)return;const inner=g.scene.clone(true);fitModel(inner,{h:.846});const m=new THREE.Group();m.add(inner);m.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material){o.material.roughness=Math.max(o.material.roughness??.6,.55);o.material.metalness=0}}});m.position.set(0,Y+.02,0);m.rotation.y=Math.PI;const cut=[new THREE.Plane(new THREE.Vector3(0,0,1),.33)];m.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.clippingPlanes=cut;o.material.clipShadows=true}});S.remove(d);S.add(m)})}
  {const pos=[[-1.3,-.2],[1.3,-.2],[-1.3,-1.6],[0,-1.6],[1.3,-1.6],[-1.3,-3],[0,-3],[1.3,-3]];
   optGLB6('desk.glb').then(g=>{for(const [x,z] of pos){let m;if(g){const inner=g.scene.clone(true);fitModel(inner,{h:.846});m=new THREE.Group();m.add(inner);m.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material){o.material.roughness=Math.max(o.material.roughness??.6,.55);o.material.metalness=0}}})}else m=deskFallback();m.userData.deskM=true;m.position.set(x,Y+.02,z);S.add(m)}})}
  // a teacher's desk with an apple
  bx6(S,1.2,.05,.6,M6('#8a6440'),2.4,Y+.75,-4.1);bx6(S,1.1,.7,.5,M6('#7a5434'),2.4,Y+.37,-4.1);
  {const ap=new THREE.Mesh(new THREE.SphereGeometry(.05,16,12),M6('#c23a2b',{roughness:.4}));ap.position.set(2.2,Y+.83,-4.0);S.add(ap)}

  // lower wall panels and a picture rail, baseboards
  const pan=M6('#7f9a84',{roughness:.8}),rail=M6('#8a6440');bx6(S,8,1,.04,pan,0,Y+.5,-4.93,false);bx6(S,8,.05,.06,rail,0,Y+1.02,-4.92,false);bx6(S,.04,1,7,pan,-3.93,Y+.5,-1.5,false);bx6(S,.04,1,7,pan,3.93,Y+.5,-1.5,false);
  bx6(S,.06,.05,7,rail,-3.92,Y+1.02,-1.5,false);bx6(S,.06,.05,7,rail,3.92,Y+1.02,-1.5,false);
  // the alphabet strip above the board
  {const st_=new THREE.Mesh(new THREE.PlaneGeometry(6.4,.28),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(2048,90,(g,W,H)=>{g.fillStyle='#fbf2e2';g.fillRect(0,0,W,H);const L='A B C D E F G H I J K L M N O P R S T U V Y Ä Ö'.split(' ');const cols=['#c8352b','#2f62b8','#3f9a4a','#ee8a2c','#8a5ab8'];
    L.forEach((c,i)=>{g.fillStyle=cols[i%5];g.font='800 64px "Baloo 2", sans-serif';g.fillText(c+c.toLowerCase(),24+i*W/L.length,70)})}))}));st_.position.set(0,Y+2.45,-4.92);S.add(st_)}
  clock6(S,-2.2,Y+2.45,-4.9,0,.2);
  // window sills with plants, warm evening light falling in
  for(const z of[-1.6,.4]){bx6(S,.22,.04,1.5,M6('#f4efe6'),-3.84,Y+.84,z);plant6(S,-3.82,Y+.86,z-.4,.9);plant6(S,-3.82,Y+.86,z+.45,.7)}
  motes6(S,-1.6,Y+1.2,-.4,1.8,1,1.4);
  // coat hooks with backpacks on the right wall, and the door
  bx6(S,.05,.06,3,M6('#8a6440'),3.9,Y+1.45,-2.4);[['#e86a8a',-3.5],['#3f74b8',-2.9],['#f2c230',-2.3],['#4f9a4a',-1.7],['#ee8a2c',-1.1]].forEach(([c,z])=>backpack6(S,3.8,Y+1.25,z,c));
  bx6(S,.06,2.1,1,M6('#a0744a'),3.94,Y+1.05,.9,false);{const k=new THREE.Mesh(new THREE.SphereGeometry(.04,12,10),M6('#d9b86a',{metalness:.7,roughness:.3}));k.position.set(3.88,Y+1.05,.55);S.add(k)}
  // a bookshelf and a globe at the back
  shelf6(S,-3.0,Y,-4.55,1.1,1.5);{const gl=new THREE.Mesh(new THREE.SphereGeometry(.16,32,24),new THREE.MeshStandardMaterial({roughness:.5,map:tex(canvas(256,128,(g,W,H)=>{g.fillStyle='#4f86c0';g.fillRect(0,0,W,H);g.fillStyle='#8ac07a';for(let i=0;i<14;i++){g.beginPath();g.ellipse(R01(0,W),R01(20,H-20),R01(10,34),R01(8,22),R01(0,3),0,7);g.fill()}}))}));gl.position.set(-3.0,Y+1.72,-4.55);gl.rotation.z=.4;S.add(gl);bx6(S,.06,.06,.06,M6('#8a6440'),-3.0,Y+1.53,-4.55)}
  // paper drawings on the wall
  for(const [x,c] of[[2.05,'#ffd36b'],[2.6,'#9cc2ea'],[3.15,'#f2a6b8']]){const d=new THREE.Mesh(new THREE.PlaneGeometry(.38,.3),new THREE.MeshStandardMaterial({roughness:.95,map:tex(canvas(128,100,(g,W,H)=>{g.fillStyle='#fffaf0';g.fillRect(0,0,W,H);g.fillStyle=c;g.beginPath();g.arc(40,40,22,0,7);g.fill();g.fillStyle='#4f9a4a';g.fillRect(0,H-22,W,22);g.fillStyle='#c8643c';g.fillRect(70,40,30,36)}))}));d.position.set(x,Y+1.25,-4.91);d.rotation.z=R01(-.05,.05);S.add(d)}
  // pencil, eraser and a notebook on Siili's desk
  bx6(S,.16,.006,.012,M6('#f2c230'),-.16,.003,.12);bx6(S,.18,.008,.13,M6('#f4efe6'),.16,.004,.1);
}
const CLS_CAM=[new THREE.Vector3(-.05,.3,.78),new THREE.Vector3(.02,.1,-.3)];
async function toClass(){await goScene(clsS,buildClass,CLS_CAM[0],CLS_CAM[1]);putSiiliIn(clsS,0,0,0);clsLamps.forEach(([l,p])=>{l.material.emissiveIntensity=1.4;p.intensity=.9})}
const W6={appelsiini:'apelsin',banaani:'banan',kakku:'tårta',ketsuppi:'ketchup',kinkku:'skinka',kioski:'kiosk',kurkku:'gurka',lamppu:'lampa',lettu:'plätt',matto:'matta',paketti:'paket',pulla:'bulle',paaryna:'päron',raketti:'raket',sitruuna:'citron',sokeri:'socker',tomaatti:'tomat'};
const FI6={paaryna:'päärynä'};const fi6=k=>FI6[k]||k;
const ORDER6=['appelsiini','banaani','kakku','ketsuppi','kinkku','kioski','kurkku','lamppu','lettu','matto','paketti','pulla','paaryna','raketti','sitruuna','sokeri','tomaatti'];
const L6=k=>({line:'k6-'+String(12+ORDER6.indexOf(k)).padStart(2,'0'),react:'k6-'+String(29+ORDER6.indexOf(k)).padStart(2,'0'),word:'kw-'+fi6(k).replace('ä','a').replace('ä','a')});
const IMG6=k=>k==='kioski'?null:k;
async function sayWord6(k){const id='kw-'+fi6(k);if(has6(id))await say(id,{sub:false});else await say(L6(k).line,{sub:false})}
async function c6Intro(){await toClass();setMusic('search');play('sniff');await tr6('k6-00');play('present');await tr6('k6-01');
  play('happy');await tr6('k6-02');play('wave');await tr6('k6-03');play('think');await tr6('k6-04');play('point');await tr6('k6-05');
  // the words look like Swedish: hei/hej, oi/oj, hai/haj, poika/pojke
  play('present');await tr6('k6-11');
  for(const [f,s] of[['hei','hej'],['oi','oj'],['hai','haj'],['poika','pojke']]){showWord(f,s,1600);await sleep(1700)}
  await tr6('k6-46');ask('Vad betyder hai på svenska?');
  for(;;){const {o,b}=await choose6([{t:'haj',e:'🦈',ok:true},{t:'hej',e:'👋'},{t:'oj',e:'😮'}]);if(o.ok){clearCards();ask('');play('scared');await tr6('k6-47');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4);await say(rnd(OOPS))}
}
async function c6What(){if(scene!==clsS)await toClass();setMusic('search');
  const keys=shuffle(ORDER6.filter(k=>IMG6(k))).slice(0,8);let n=0;
  for(const k of keys){n++;showPic(k);play('present');await say(rnd(['k6-06','k6-07','k6-08']));
    if(n%2===0){const t=await typeIt([fi6(k)],'Skriv på finska vad det är!');hidePic();play('happy');await say(rnd(['k6-09','k6-10']));showWord(fi6(k),W6[k]);await tr6(L6(k).react);learn(fi6(k));addPaws(t?1:3);continue}
    ask('Mikä tämä on? Välj rätt ord.');let tries=0;
    for(;;){const opts=shuffle([k,...shuffle(ORDER6.filter(x=>x!==k)).slice(0,2)]).map(x=>({t:fi6(x),ok:x===k}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');hidePic();play('happy');await say(rnd(['k6-09','k6-10']));showWord(fi6(k),W6[k]);await tr6(L6(k).react);learn(fi6(k));addPaws(tries?1:3);break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await say(rnd(OOPS))}}
  // the other way round: Siili says the word, Saga picks the picture
  for(const k of shuffle(ORDER6.filter(k=>IMG6(k))).slice(0,4)){ask('Vilken bild säger Siili?');const rep=()=>sayWord6(k);await rep();const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=rep;
    for(;;){const opts=shuffle([k,...shuffle(ORDER6.filter(x=>x!==k&&IMG6(x))).slice(0,2)]).map(x=>({t:'',e:pic6(x,96),ok:x===k}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');hb.style.display='none';play('happy');showWord(fi6(k),W6[k]);addPaws(2);await praise();break}b.classList.add('wrong');sfx('wrong',.4);await rep()}}
  $('#hint').textContent='?'}
async function c6Baskets(){if(scene!==clsS)await toClass();play('present');await tr6('k6-48');await tr6('k6-49');
  const G={appelsiini:'h',banaani:'h',paaryna:'h',sitruuna:'h',tomaatti:'k',kurkku:'k',kakku:'j',pulla:'j',lettu:'j',kinkku:'x',raketti:'x',matto:'x',lamppu:'x'};
  const opts=[{t:'hedelmä',s:'frukt',e:'🍎',g:'h'},{t:'kasvis',s:'grönsak',e:'🥕',g:'k'},{t:'jälkiruoka',s:'efterrätt',e:'🍰',g:'j'},{t:'ingen korg',s:'passar inte',e:'❌',g:'x'}];
  const items=[...shuffle(Object.keys(G).filter(k=>G[k]!=='x')).slice(0,6),...shuffle(Object.keys(G).filter(k=>G[k]==='x')).slice(0,2)];
  let first=true;for(const k of shuffle(items)){showPic(k,fi6(k));if(first){await tr6('k6-50');first=false}else await say('k6-51');ask('Vilken korg?');let tries=0;
    for(;;){const {o,b}=await choose6(opts.map(x=>({...x,ok:x.g===G[k]})));if(o.ok){clearCards();ask('');hidePic();play('happy');
        if(k==='tomaatti')await tr6('k6-55');else if(G[k]==='x')await tr6(k==='raketti'?'k6-57':'k6-56');else await tr6({h:'k6-52',k:'k6-53',j:'k6-54'}[G[k]]);
        learn(fi6(k));addPaws(tries?1:3);break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await say(rnd(OOPS))}}
  for(const k of shuffle(['appelsiini','banaani','paaryna','sitruuna','tomaatti','kurkku','kakku','pulla','lettu']).slice(0,3)){showPic(k);const t=await typeIt([fi6(k),fi6(k).replace(/ä/g,'a')],'Skriv på finska: '+W6[k]);hidePic();showWord(fi6(k),W6[k]);addPaws(t?1:3);await praise()}}
async function c6Kiosk(){if(scene!==clsS)await toClass();
  if(!kioskG)kioskG=await placeGLB6(clsS,'kiosk.glb',{x:.2,y:0,z:-.16,ry:-.25,w:.3},()=>{const G=new THREE.Group();bx6(G,.32,.12,.12,M6('#c23a2b'),0,.06,0);bx6(G,.34,.012,.14,M6('#e8d6b4'),0,.125,0);
    const aw=new THREE.Mesh(new THREE.BoxGeometry(.36,.01,.16),new THREE.MeshStandardMaterial({map:tex(canvas(128,32,(g,W,H)=>{for(let i=0;i<8;i++){g.fillStyle=i%2?'#fff':'#c23a2b';g.fillRect(i*W/8,0,W/8,H)}}))}));aw.position.set(0,.26,0);G.add(aw);for(const s of[-1,1])bx6(G,.01,.14,.01,M6('#8a6440'),s*.16,.19,.06);return G});
  siili.position.set(-.12,0,.02);face(new THREE.Vector3(.2,0,-.18));play('happy');await tr6('k6-58');
  const ORD=[['pulla','k6-59'],['banaani','k6-60'],['appelsiini','k6-61'],['paaryna','k6-62'],['lettu','k6-63'],['kakku','k6-64'],['sitruuna','k6-65'],['tomaatti','k6-66'],['kurkku','k6-67'],['ketsuppi','k6-68'],['sokeri','k6-69']];
  let kn=0;for(const [k,id] of shuffle(ORD).slice(0,7)){face(cam.position);ask('Siili vill köpa något. Ge honom rätt sak!');const rep=()=>say(id,{sub:false});await rep();const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=rep;let tries=0;
    for(;;){const opts=shuffle([k,...shuffle(ORD.map(x=>x[0]).filter(x=>x!==k)).slice(0,3)]).map(x=>({t:'',e:pic6(x,92),ok:x===k}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');hb.style.display='none';play('happy');if(++kn%3===0){const t=await typeIt([fi6(k),fi6(k).replace(/ä/g,'a')],'Skriv på finska vad Siili köpte!');addPaws(t?1:2)}showWord(fi6(k),W6[k]);await tr6(rnd(['k6-70','k6-71','k6-72']));learn(fi6(k));addPaws(tries?1:3);break}
      b.classList.add('wrong');sfx('wrong',.4);tries++;play('shake');await tr6('k6-73');await rep()}}
  $('#hint').textContent='?';play('idle');await tr6('k6-74')}
async function c6Almost(){if(scene!==clsS)await toClass();if(kioskG)kioskG.visible=false;siili.position.set(0,0,0);face(cam.position);play('think');await tr6('k6-75');
  const LW=[['bussi','buss','k6-76'],['taksi','taxi','k6-77'],['posti','post','k6-78'],['pankki','bank','k6-79'],['kahvi','kaffe','k6-80'],['tee','te','k6-81'],['pizza','pizza','k6-82'],['kamera','kamera','k6-83']];
  for(const [f,s,id] of shuffle(LW).slice(0,6)){ask('Lyssna! Vilken bild är det?');await say(id,{sub:false});let tries=0;
    for(;;){const opts=shuffle([f,...shuffle(LW.map(x=>x[0]).filter(x=>x!==f)).slice(0,2)]).map(x=>({t:'',e:pic6(x,92),ok:x===f}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');play('happy');showWord(f,s);if(has6(id+'s'))await say(id+'s');learn(f);addPaws(tries?1:3);break}b.classList.add('wrong');sfx('wrong',.4);tries++;await say(id,{sub:false})}}
  for(const [f,s] of shuffle([['bussi','buss'],['taksi','taxi'],['posti','post'],['pankki','bank'],['kahvi','kaffe']]).slice(0,3)){showPic(f);const t=await typeIt([f],'Skriv på finska: '+s);hidePic();showWord(f,s);addPaws(t?1:3);await praise()}
  if(kioskG)kioskG.visible=true}
async function c6Teach(){if(scene!==clsS)await toClass();setMusic('home');
  showPic('appelsiini');play('present');await sayIf6('x6-52');ask('Är det en tomat?');
  await choose6([{t:'Ja',e:'👍'},{t:'Nej!',e:'🙅',ok:true}]).then(({o})=>clearCards());ask('');play('think');await sayIf6('k6-84');await sayIf6('x6-53');ask('Vad heter det på svenska?');
  for(;;){const {o,b}=await choose6(shuffle([{t:'apelsin',ok:true},{t:'citron'},{t:'päron'}]));if(o.ok){clearCards();ask('');play('happy');await sayIf6('x6-54');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}
  hidePic();showPic('kurkku');play('present');await sayIf6('x6-55');play('scared');await sayIf6('x6-56');ask('Är gurka ett fult ord?');
  await choose6([{t:'Ja, usch!',e:'😱'},{t:'Nej, det är en grönsak!',e:'🥒',ok:true}]);clearCards();ask('');hidePic();play('happy');await sayIf6('x6-57');addPaws(3);
  // evening
  setMusic('evening');play('wave');await tr6('k6-85');await tr6('k6-86');play('point');await tr6('k6-87');
  for(const [l,p] of clsLamps){l.material.emissiveIntensity=.05;p.intensity=0}sfx('door',.25);play('curl');await tr6('k6-88');ask('Hyvää yötä, luokka!');await sleep(1800);ask('');await sticker6(6)}
const PARTS6=[{n:'Koulussa',d:'Siili smyger in',f:c6Intro},{n:'Mikä tämä on?',d:'Orden som liknar svenska',f:c6What},{n:'Tre korgar',d:'Frukt, grönsak, efterrätt',f:c6Baskets},
  {n:'Siilin kioski',d:'Du säljer, Siili köper',f:c6Kiosk},{n:'Nästan svenska',d:'Gissa orden',f:c6Almost},{n:'Opeta Siiliä!',d:'Tomat eller apelsin?',f:c6Teach}];

/* ================= Kapitel 7 · Läksy: stadsbiblioteket ================= */
const libS=new THREE.Scene();let libBuilt=false,boardG=null;
function buildLib(){if(libBuilt)return;libBuilt=true;const S=libS;S.background=new THREE.Color('#2c221c');S.fog=new THREE.Fog('#3a2c22',3,10);
  lightRoom6(S,{sky:'#ffe2c0',ground:'#4a3426',hemi:.75,key:'#ffd2a0',keyI:1.6,keyPos:[3,5,4],shadow:2.5});
  const Y=-.78;room6(S,{w:7,d:6,h:3.2,y0:Y,floor:new THREE.MeshStandardMaterial({map:tex(woodTex2('#8a6440','#5d4128'),[6,6]),roughness:.85}),wall:new THREE.MeshStandardMaterial({map:paintTex6(512,512,'#cfd8c4'),roughness:.95})});
  // the reading table Siili stands on
  bx6(S,2.2,.06,1.1,new THREE.MeshStandardMaterial({map:tex(woodTex2('#a0744a','#6f4a2c'),[2,1]),roughness:.6}),0,-.03,-.1);for(const sx of[-1,1])for(const sz of[-1,1])bx6(S,.08,.72,.08,M6('#6f4a2c'),sx*1,Y+.36,-.1+sz*.45);
  // a green reading lamp
  {const G=new THREE.Group();bx6(G,.14,.015,.09,M6('#7a6440',{metalness:.6,roughness:.3}),0,.008,0);const st_=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.2,8),M6('#b89a5a',{metalness:.7,roughness:.3}));st_.position.y=.1;G.add(st_);
   const arm=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.09,8),M6('#b89a5a',{metalness:.7,roughness:.3}));arm.rotation.z=Math.PI/2;arm.position.set(.04,.2,0);G.add(arm);const sh=new THREE.Mesh(new THREE.CylinderGeometry(.025,.06,.05,24,1,true),new THREE.MeshStandardMaterial({color:'#2f6a4a',roughness:.4,side:THREE.DoubleSide}));sh.position.set(.085,.18,0);G.add(sh);const bl=new THREE.Mesh(new THREE.SphereGeometry(.014,12,8),new THREE.MeshStandardMaterial({color:'#fff',emissive:new THREE.Color('#ffd590'),emissiveIntensity:2}));bl.position.set(.085,.165,0);G.add(bl);G.position.set(-.42,0,-.32);S.add(G);
   const pl=new THREE.PointLight('#ffd08a',2.2,2.5,1.6);pl.position.set(-.34,.14,-.32);S.add(pl)}
  // stacks of books on the table
  const bk=[['#a8473a',.16],['#3f6e8c',.15],['#d9a441',.14],['#4f7a4a',.13]];for(const [x,z,r] of[[.42,-.3,.2],[-.6,.05,-.3]]){let y=0;for(const [c,w] of bk){const b=bx6(S,w,.03,w*.72,M6(c,{roughness:.7}),x,y+.015,z);b.rotation.y=r+R01(-.2,.2);y+=.03}}
  {const ob=bx6(S,.22,.006,.15,M6('#f4efe6'),.12,.003,.16);ob.rotation.y=-.2}
  // shelves all round
  for(let i=-2;i<=2;i++)shelf6(S,i*1.3,Y,-3.75,1.25,2.6);shelf6(S,-3.3,Y,-1.2,1.25,2.6,Math.PI/2);shelf6(S,-3.3,Y,.2,1.25,2.6,Math.PI/2);shelf6(S,3.3,Y,-1.2,1.25,2.6,-Math.PI/2);
  win6(S,3.42,Y+1.7,.6,1.1,1.3,-Math.PI/2,'#d9a0c8');
  // a rug and an armchair corner
  {const r=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.2),new THREE.MeshStandardMaterial({roughness:1,map:tex(canvas(256,180,(g,W,H)=>{g.fillStyle='#8a3a2e';g.fillRect(0,0,W,H);g.strokeStyle='#e0b070';g.lineWidth=8;g.strokeRect(14,14,W-28,H-28);g.strokeStyle='#2f4a5a';g.lineWidth=5;g.strokeRect(30,30,W-60,H-60)}))}));r.rotation.x=-Math.PI/2;r.position.set(0,Y+.005,-.1);r.receiveShadow=true;S.add(r)}

  // a library ladder, a globe on a stand, plants, paintings and pendant lamps
  {const L=new THREE.Group();const lm=M6('#6f4a2c');for(const s of[-1,1])bx6(L,.05,2.6,.05,lm,s*.22,1.3,0);for(let i=0;i<8;i++)bx6(L,.44,.03,.05,lm,0,.25+i*.3,0);L.position.set(-.7,Y,-3.45);L.rotation.x=-.18;S.add(L)}
  {const gl=new THREE.Mesh(new THREE.SphereGeometry(.22,32,24),new THREE.MeshStandardMaterial({roughness:.45,map:tex(canvas(256,128,(g,W,H)=>{g.fillStyle='#d9c08a';g.fillRect(0,0,W,H);g.fillStyle='#8a6a3a';for(let i=0;i<14;i++){g.beginPath();g.ellipse(R01(0,W),R01(20,H-20),R01(10,34),R01(8,22),R01(0,3),0,7);g.fill()}}))}));gl.position.set(2.4,Y+1.05,-2.4);gl.rotation.z=.4;S.add(gl);
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.25,.012,8,40),M6('#b89a5a',{metalness:.7,roughness:.3}));ring.position.copy(gl.position);ring.rotation.y=Math.PI/2;S.add(ring);const st_=new THREE.Mesh(new THREE.CylinderGeometry(.03,.12,.8,16),M6('#6f4a2c'));st_.position.set(2.4,Y+.4,-2.4);S.add(st_)}
  plant6(S,-2.6,Y,1.6,2.2);plant6(S,2.8,Y,1.8,1.8);
  for(const [x,c] of[[-1.2,'#c89a5a'],[1.2,'#7a9ab8']]){const f=new THREE.Group();bx6(f,.9,.65,.04,M6('#b89a5a',{metalness:.5,roughness:.4}),0,0,0,false);const pt=new THREE.Mesh(new THREE.PlaneGeometry(.8,.55),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(200,140,(g,W,H)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,c);gr.addColorStop(1,'#e8d6b4');g.fillStyle=gr;g.fillRect(0,0,W,H);g.fillStyle='rgba(60,80,60,.7)';g.beginPath();g.moveTo(0,H);g.lineTo(W*.3,H*.5);g.lineTo(W*.6,H*.8);g.lineTo(W,H*.4);g.lineTo(W,H);g.fill()}))}));pt.position.z=.025;f.add(pt);f.position.set(x,Y+2.75,-3.6);S.add(f)}
  for(const [x,z] of[[-.7,-.1],[.7,-.1]]){const cord=new THREE.Mesh(new THREE.CylinderGeometry(.004,.004,1.4,6),M6('#222'));cord.position.set(x,Y+3.2-.7,z);S.add(cord);const sh=new THREE.Mesh(new THREE.ConeGeometry(.2,.18,24,1,true),new THREE.MeshStandardMaterial({color:'#2f6a4a',roughness:.5,side:THREE.DoubleSide}));sh.position.set(x,Y+1.75,z);S.add(sh);
    const bulb=new THREE.Mesh(new THREE.SphereGeometry(.05,12,10),new THREE.MeshStandardMaterial({color:'#fff',emissive:new THREE.Color('#ffd590'),emissiveIntensity:2}));bulb.position.set(x,Y+1.68,z);S.add(bulb);const pl=new THREE.PointLight('#ffd08a',1.2,3.5,1.6);pl.position.set(x,Y+1.6,z);S.add(pl)}
  motes6(S,0,.5,-.4,1.4,.6,.8,120,'#ffe8c0');
  // a book cart
  {const c=new THREE.Group();bx6(c,.8,.04,.4,M6('#6f4a2c'),0,.35,0);bx6(c,.8,.04,.4,M6('#6f4a2c'),0,.7,0);for(const sx of[-1,1])bx6(c,.04,.75,.4,M6('#6f4a2c'),sx*.38,.37,0);const bt=new THREE.Mesh(new THREE.PlaneGeometry(.72,.3),new THREE.MeshStandardMaterial({map:bookTex6(),roughness:.9}));bt.position.set(0,.52,.0);c.add(bt);const bt2=bt.clone();bt2.position.y=.87;c.add(bt2);
   for(const sx of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.03,16),M6('#222'));w.rotation.x=Math.PI/2;w.position.set(sx*.32,.05,.18);c.add(w)}c.position.set(1.9,Y,.9);c.rotation.y=-.6;S.add(c)}
  for(const [x,z] of[[-2,1.2],[2.2,1.4]]){bx6(S,.8,.4,.7,M6('#5e7a6a'),x,Y+.2,z);bx6(S,.8,.5,.15,M6('#5e7a6a'),x,Y+.65,z-.3)}
  for(const [x,z] of[[-1.8,-2.6],[1.8,-2.6]]){const l=new THREE.PointLight('#ffcf90',1,4,1.8);l.position.set(x,Y+2.6,z);S.add(l);const m=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshStandardMaterial({color:'#fff1d0',emissive:new THREE.Color('#ffd590'),emissiveIntensity:1.6}));m.position.copy(l.position);S.add(m)}
}
const LIB_CAM=[new THREE.Vector3(.05,.32,.8),new THREE.Vector3(0,.09,-.3)];
async function toLib(){await goScene(libS,buildLib,LIB_CAM[0],LIB_CAM[1]);putSiiliIn(libS,0,0,0)}
const W7=[{fi:'läksy',sv:'läxa',img:'laksy'},{fi:'pallo',sv:'boll',img:'pallo'},{fi:'kello',sv:'klocka',img:'kello'},{fi:'grilli',sv:'grill',img:'grilli'},{fi:'kannu',sv:'kanna',img:'kannu'},{fi:'taksi',sv:'taxi',img:'taksi2'}];
async function c7Help(){await toLib();setMusic('search');play('scared');await tr6('k7-00');play('shake');await tr6('k7-01');play('sad');await tr6('k7-02');play('present');await tr6('k7-03');
  ask('Vad säger du till Siili?');for(;;){const {o,b}=await choose6(shuffle([{t:'Odota, minä autan!',s:'Vänta, jag hjälper!',ok:true},{t:'Hyvää yötä!',s:'God natt!'},{t:'Hai!',s:'Haj!'}]));if(o.ok){clearCards();ask('');learn('Odota, minä autan!');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4);await say(rnd(OOPS))}
  play('happy');await tr6('k7-04');play('think');await tr6('k7-05');play('jump');await tr6('k7-06');play('happy');await tr6('k7-07')}
async function c7Mina(){if(scene!==libS)await toLib();play('present');await tr6('k7-08');await tr6('k7-09');
  for(const [id,w] of[['k7-10','autan'],['k7-11','osaan'],['k7-12','tiedän'],['k7-13','lasken'],['k7-14','pelaan']]){showWord('minä '+w,'',1700);play(rnd(['nod','present','happy']));await tr6(id)}
  play('jump');await tr6('k7-15');
  const ST=[['k7-16','odota','odotan','jag väntar'],['k7-17','osaa','osaan','jag kan'],['k7-18','tiedä','tiedän','jag vet'],['k7-19','auta','autan','jag hjälper'],['k7-20','ole','olen','jag är']];
  for(const [id,stem,full,sv] of shuffle(ST)){play('think');await tr6(id);ask('Vilken bokstav fattas? minä '+stem+'_');
    for(;;){const {o,b}=await choose6(shuffle([{t:'n',ok:true},{t:'a'},{t:'t'}]));if(o.ok){clearCards();ask('');play('happy');showWord('minä '+full,sv);await tr6(full==='odotan'?'k7-23':'k7-22');learn('minä '+full);addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4);await say(rnd(OOPS))}}
  // like the homework on p. 34: write it in Finnish
  for(const [sv,fi] of shuffle([['Jag kan.','minä osaan'],['Jag hjälper.','minä autan'],['Jag vet.','minä tiedän']])){const t=await typeIt([fi],'Skriv på finska: '+sv);play('happy');showWord(fi,sv);addPaws(t?1:3);await tr6(rnd(['k7-24','k7-24','k7-22']))}}
async function c7Words(){if(scene!==libS)await toLib();play('present');await tr6('k7-26');
  // boll: Siili guesses bolli
  showPic('pallo','boll');play('think');await tr6('k7-33');ask('Har Siili rätt?');
  await choose6([{t:'Oikein!',s:'rätt',e:'✔️'},{t:'Ei ihan oikein',s:'inte helt rätt',e:'🤔',ok:true}]);clearCards();ask('');play('nod');await tr6('k7-34');hidePic();play('happy');await tr6('k7-35');learn('pallo');addPaws(3);
  // grill
  showPic('grilli','grill');play('present');await tr6('k7-36');ask('Hur blir grill på finska?');
  for(;;){const {o,b}=await choose6(shuffle([{t:'grilli',ok:true},{t:'krilli'},{t:'grillo'}]));if(o.ok){clearCards();ask('');hidePic();play('happy');await tr6('k7-37');learn('grilli');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}
  // klocka: Siili guesses klocki
  showPic('kello','klocka');play('think');await tr6('k7-38');ask('Har Siili rätt?');
  await choose6([{t:'Oikein!',e:'✔️'},{t:'No, melkein …',e:'🤏',ok:true}]);clearCards();ask('');play('nod');await tr6('k7-39');play('happy');await tr6('k7-40');hidePic();await tr6('k7-41');learn('kello');addPaws(3);
  // kanna, taxi
  play('present');await tr6('k7-42');showPic('kannu','kanna');ask('Hur blir kanna på finska?');
  for(;;){const {o,b}=await choose6(shuffle([{t:'kannu',ok:true},{t:'kanni'},{t:'ganna'}]));if(o.ok){clearCards();ask('');hidePic();play('happy');await tr6('k7-43');learn('kannu');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}
  showPic('taksi2','taxi');ask('Hur blir taxi på finska?');for(;;){const {o,b}=await choose6(shuffle([{t:'taksi',ok:true},{t:'taxi'},{t:'daksi'}]));if(o.ok){clearCards();ask('');hidePic();play('happy');await tr6('k7-44');learn('taksi');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}
  // Lisää: Saga guesses herself
  await tr6('k7-45');for(const [sv,fi,img] of shuffle([['bank','pankki','pankki'],['post','posti','posti'],['buss','bussi','bussi'],['kaffe','kahvi','kahvi']]).slice(0,3)){showPic(img,sv);
    for(;;){const {o,b}=await choose6(shuffle([{t:fi,ok:true},{t:fi.replace(/i$/,'o')},{t:sv}]));if(o.ok){clearCards();hidePic();play('happy');await tr6('k7-46');addPaws(2);break}b.classList.add('wrong');sfx('wrong',.4)}}
  // write them like the homework on p. 35
  for(const w of shuffle(W7).slice(0,4)){showPic(w.img);const t=await typeIt([w.fi,w.fi.replace('ä','a')],'Skriv på finska: '+w.sv);hidePic();play('happy');showWord(w.fi,w.sv);addPaws(t?1:3);await praise()}}
async function c7Search(){if(scene!==libS)await toLib();play('present');await tr6('k7-47');
  const words=['läksy','pallo','kello','grilli','kannu','taksi'];const N=8;let grid,place;
  for(let tries=0;tries<200;tries++){grid=Array.from({length:N},()=>Array(N).fill(''));place={};let ok=true;
    for(const w of words){let done=false;for(let k=0;k<200&&!done;k++){const dir=rnd([[0,1],[1,0]]);const r=Math.floor(Math.random()*(N-(dir[0]?w.length:0)+ (dir[0]?0:0)) ),c=Math.floor(Math.random()*(N-(dir[1]?w.length:0)));
        if(r+dir[0]*(w.length-1)>=N||c+dir[1]*(w.length-1)>=N)continue;let fit=true;for(let i=0;i<w.length;i++){const ch=grid[r+dir[0]*i][c+dir[1]*i];if(ch&&ch!==w[i].toUpperCase())fit=false}
        if(!fit)continue;const cells=[];for(let i=0;i<w.length;i++){grid[r+dir[0]*i][c+dir[1]*i]=w[i].toUpperCase();cells.push((r+dir[0]*i)*N+c+dir[1]*i)}place[w]=cells;done=true}if(!done){ok=false;break}}
    if(ok)break}
  const AB='AEIOUKLMNPRSTYHÄ';for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!grid[r][c])grid[r][c]=rnd(AB.split(''));
  const box_=$('#search6'),bd=box_.querySelector('.board');bd.innerHTML='<table>'+grid.map((row,r)=>'<tr>'+row.map((ch,c)=>`<td data-i="${r*N+c}">${ch}</td>`).join('')+'</tr>').join('')+'</table><div class="words">'+words.map(w=>`<span data-w="${w}">${w}</span>`).join('')+'</div>';
  box_.style.display='flex';camTo(new THREE.Vector3(.5,.28,.75),new THREE.Vector3(.3,.1,-.3),900);
  const found=new Set();let sel=[];
  const td=i=>bd.querySelector(`td[data-i="${i}"]`);
  for(const w of shuffle(words)){const id={'läksy':'k7-48','pallo':'k7-49','kello':'k7-50','grilli':'k7-51','kannu':'k7-52','taksi':'k7-53'}[w];play('think');await tr6(id);ask('Klicka på första och sista bokstaven i '+w.toUpperCase());
    if(AUTO){place[w].forEach(i=>td(i).classList.add('found'));found.add(w)}
    while(!found.has(w)){const i=await new Promise(r=>bd.querySelectorAll('td').forEach(t=>t.onclick=()=>r(+t.dataset.i)));
      sel.push(i);td(i).classList.add('sel');if(sel.length<2)continue;const [a,b]=sel;sel=[];bd.querySelectorAll('td.sel').forEach(t=>t.classList.remove('sel'));
      const P=place[w];if((a===P[0]&&b===P[P.length-1])||(b===P[0]&&a===P[P.length-1])){P.forEach(i=>td(i).classList.add('found'));found.add(w)}else{sfx('wrong',.4);ask('Inte där! Leta efter '+w.toUpperCase())}}
    bd.querySelector(`[data-w="${w}"]`).innerHTML=`<s>${w}</s>`;ask('');play('happy');await tr6('k7-54');learn(w);addPaws(2)}
  await sleep(600);box_.style.display='none';camTo(LIB_CAM[0],LIB_CAM[1],900);
  for(const w of shuffle(W7).slice(0,3)){showPic(w.img);const t=await typeIt([w.fi,w.fi.replace('ä','a')],'Skriv på finska: '+w.sv);hidePic();showWord(w.fi,w.sv);addPaws(t?1:3);await praise()}}
async function c7Game(){if(scene!==libS)await toLib();
  if(!boardG)boardG=await placeGLB6(libS,'boardgame.glb',{x:.3,y:0,z:-.05,w:.42},()=>{const G=new THREE.Group();bx6(G,.4,.012,.4,M6('#e8d6b4'),0,.006,0);const cols=['#c23a2b','#f2c230','#4f9a4a','#3f74b8'];
    for(let i=0;i<14;i++){const a=i/14*Math.PI*1.7,r=.16-i*.008;const c=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,.004,16),M6(cols[i%4]));c.position.set(Math.cos(a)*r,.014,Math.sin(a)*r);G.add(c)}return G});
  siili.position.set(-.18,0,.05);face(cam.position);
  // the dialogue from p. 33, with the gaps filled in
  play('present');await tr6('k7-58');ask('Vad svarar du?');for(;;){const {o,b}=await choose6(shuffle([{t:'Minä leikin.',s:'Jag leker.',ok:true},{t:'Minä odotan.',s:'Jag väntar.'},{t:'Hyvää huomenta!',s:'God morgon!'}]));if(o.ok){clearCards();ask('');addPaws(2);break}b.classList.add('wrong');sfx('wrong',.4)}
  await tr6('k7-59');play('happy');await tr6('k7-60');ask('Vad svarar du?');for(;;){const {o,b}=await choose6(shuffle([{t:'Hyvä idea!',s:'Bra idé!',ok:true},{t:'Anteeksi!',s:'Förlåt!'},{t:'Apua!',s:'Hjälp!'}]));if(o.ok){clearCards();ask('');addPaws(2);break}b.classList.add('wrong');sfx('wrong',.4)}
  await tr6('k7-61');await tr6('k7-62');
  // the race, shown as a clear track: answer right and your pawn moves; then Siili rolls the die
  const Q=[...W7.map(w=>({sv:w.sv,fi:w.fi})),...Object.keys(W6).slice(0,10).map(k=>({sv:W6[k],fi:fi6(k)})),{sv:'Jag hjälper.',fi:'Minä autan.'},{sv:'Jag kan.',fi:'Minä osaan.'},{sv:'Jag vet.',fi:'Minä tiedän.'},{sv:'nästan',fi:'melkein'},{sv:'rätt',fi:'oikein'},{sv:'Fint!',fi:'Hienoa!'},{sv:'Vänta!',fi:'Odota!'},{sv:'Hjälp!',fi:'Apua!'}];
  const GOAL=8;let me=0,him=0;const qs=shuffle(Q);let qi=0;
  const tr=$('#race6')||(()=>{const d=document.createElement('div');d.id='race6';(document.getElementById('ui')||document.body).append(d);const c=document.createElement('style');c.textContent=`
#race6{position:absolute;top:10px;left:50%;transform:translateX(-50%);background:var(--card);border-radius:22px;padding:10px 16px;box-shadow:var(--shadow);pointer-events:none;text-align:center;font:800 18px Nunito,sans-serif;display:none}
#race6 .row{display:flex;gap:6px;align-items:center;margin:4px 0}#race6 .row .who{width:44px;font-size:30px}#race6 .sq{width:min(7vw,58px);height:44px;border-radius:12px;background:#fff6e8;display:flex;align-items:center;justify-content:center;font-size:26px;position:relative}
#race6 .sq.goal{background:#ffd36b}#race6 .msg{margin-top:6px;font-size:20px;color:var(--rust);min-height:26px}#race6 .die{display:inline-block;width:40px;height:40px;border-radius:9px;background:#fff;border:3px solid #4a3426;font:800 26px 'Baloo 2';line-height:36px;margin-left:8px}`;document.head.append(c);return d})();
  const drawR=(msg,die)=>{const row=(who,pos)=>`<div class="row"><div class="who">${who}</div>`+Array.from({length:GOAL+1},(_,i)=>`<div class="sq ${i===GOAL?'goal':''}">${i===pos?who:(i===GOAL?'🏁':'')}</div>`).join('')+'</div>';
    tr.innerHTML=`<div>Först till 🏁 vinner</div>${row('💗',me)}${row('🦔',him)}<div class="msg">${msg||''}${die?`<span class="die">${die}</span>`:''}</div>`;tr.style.display='block'};
  drawR('Du börjar!');
  while(me<GOAL&&him<GOAL){await tr6('k7-63');const q=qs[qi++%qs.length];drawR('Din tur! Svara rätt så går 💗 två steg.');ask(`Vad är "${q.sv}" på finska?`);let tries=0;
    if(qi%3===0){const t=await typeIt([q.fi,q.fi.replace(/[!.?]/g,'')],`Skriv på finska: ${q.sv}`);tries=t;ask('')}
    else for(;;){const opts=shuffle([q,...shuffle(Q.filter(x=>x!==q)).slice(0,2)]).map(x=>({t:x.fi,ok:x===q}));const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');break}b.classList.add('wrong');sfx('wrong',.4);tries++}
    const d=tries?1:2;for(let k=0;k<d&&me<GOAL;k++){me++;drawR(`Rätt! 💗 går ${d} ${d>1?'steg':'steg'}.`);sfx('right',.3);await sleep(450)}addPaws(d);showWord(q.fi,q.sv,1500);await sleep(700);if(me>=GOAL)break;
    drawR('Siilis tur. Han kastar tärningen …');await tr6('k7-64');play('present');await tr6('k7-65');let roll=1;for(let k=0;k<7;k++){roll=1+Math.floor(Math.random()*6);drawR('Siili kastar …',roll);await sleep(110)}
    roll=Math.random()<.15?6:rnd([1,1,2,3]);drawR(roll===6?'En sexa! Siili går två steg.':'Siili går ett steg.',roll);if(roll===6){play('jump');await tr6('k7-66')}
    const st_=roll===6?2:1;for(let k=0;k<st_&&him<GOAL;k++){him++;drawR(roll===6?'En sexa! Siili går två steg.':'Siili går ett steg.',roll);await sleep(450)}await sleep(900)}
  drawR(me>=GOAL?'Du vann! 🎉':'Siili vann den här gången!');if(me>=GOAL){play('clap');await tr6('k7-68')}else{play('jump');await tr6('k7-67')}await sleep(1500);tr.style.display='none'}
async function c7Teach(){if(scene!==libS)await toLib();if(boardG)boardG.visible=false;siili.position.set(0,0,0);face(cam.position);setMusic('home');
  showPic('kello');play('present');await sayIf6('x7-42');ask('Vad heter det på svenska?');for(;;){const {o,b}=await choose6(shuffle([{t:'klocka',ok:true},{t:'kell'},{t:'kello'}]));if(o.ok){clearCards();ask('');break}b.classList.add('wrong');sfx('wrong',.4)}
  play('think');await sayIf6('x7-43');hidePic();showPic('pallo');play('present');await sayIf6('x7-44');ask('Vad heter det på svenska?');for(;;){const {o,b}=await choose6(shuffle([{t:'boll',ok:true},{t:'pall'},{t:'bulle'}]));if(o.ok){clearCards();ask('');break}b.classList.add('wrong');sfx('wrong',.4)}
  play('happy');await sayIf6('x7-45');hidePic();play('think');await sayIf6('x7-46');addPaws(3);
  setMusic('evening');play('jump');await tr6('k7-69');play('happy');await tr6('k7-70');await tr6('k7-71');play('wave');await tr6('k7-72');if(boardG)boardG.visible=true;await sticker6(7)}
const PARTS7=[{n:'Apua!',d:'Siili har läxa',f:c7Help},{n:'Minä osaan',d:'Alla slutar på N',f:c7Mina},{n:'Boll blir pallo',d:'Finska av svenska',f:c7Words},
  {n:'Etsi!',d:'Leta efter orden',f:c7Search},{n:'Pelataanko?',d:'Brädspelet',f:c7Game},{n:'Läksy on valmis',d:'Siili lär sig svenska',f:c7Teach}];

/* ================= Kapitel 8 · Minä teen: gymnastiksalen ================= */
const gymS=new THREE.Scene();let gymBuilt=false;
function buildGym(){if(gymBuilt)return;gymBuilt=true;const S=gymS;S.background=new THREE.Color('#d8d2c4');S.fog=new THREE.Fog('#d8d0c0',6,22);
  lightRoom6(S,{sky:'#f6f2ea',ground:'#a07a50',hemi:1.3,key:'#fff2dc',keyI:2.2,keyPos:[3,8,4],shadow:3});
  const floor=new THREE.MeshStandardMaterial({roughness:.72,map:tex(canvas(1024,1024,(g,W,H)=>{g.fillStyle='#d9a96c';g.fillRect(0,0,W,H);for(let y=0;y<H;y+=16){g.fillStyle=`rgba(120,70,30,${R01(.03,.12)})`;g.fillRect(0,y,W,1);for(let x=R01(0,200);x<W;x+=R01(120,260))g.fillRect(x,y,2,16)}
    g.strokeStyle='#2f6ac0';g.lineWidth=10;g.beginPath();g.arc(W/2,H/2,150,0,7);g.stroke();g.beginPath();g.moveTo(W/2,0);g.lineTo(W/2,H);g.stroke();g.strokeStyle='#c23a2b';g.strokeRect(40,40,W-80,H-80)}),[1,1])});
  room6(S,{w:16,d:12,h:6,y0:0,floor,wall:new THREE.MeshStandardMaterial({map:paintTex6(512,512,'#ece4d4'),roughness:.95})});
  // wall bars along the back wall
  const wb=M6('#c9a476',{roughness:.6});for(let i=0;i<10;i++){const x=-6+i*1.3;for(const s of[-1,1])bx6(S,.08,3,.08,wb,x+s*.5,1.5,-9.85);for(let k=0;k<14;k++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1,10),wb);r.rotation.z=Math.PI/2;r.position.set(x,.2+k*.2,-9.85);S.add(r)}}
  // benches, mats, a basket, balls
  for(const [x,z,r] of[[-2.6,-3.2,.2],[2.8,-4.2,-.3]]){const b=new THREE.Group();bx6(b,2.4,.06,.28,M6('#c9a476'),0,.32,0);bx6(b,2.3,.06,.1,M6('#b08a5a'),0,.06,0);for(const s of[-1,1])bx6(b,.08,.3,.28,M6('#b08a5a'),s*1,.16,0);b.position.set(x,0,z);b.rotation.y=r;S.add(b)}
  for(const [x,z,r] of[[-.9,-3.2,.1],[1.2,-4,-.2],[-3.4,-5,0]]){const m=bx6(S,1.8,.12,1,M6('#3f6ab0',{roughness:.7}),x,.06,z);m.rotation.y=r}
  {const hoop=new THREE.Group();bx6(hoop,1.8,1.05,.05,M6('#f4efe6'),0,3.05,0);const ring=new THREE.Mesh(new THREE.TorusGeometry(.23,.02,8,30),M6('#e06030',{metalness:.4}));ring.rotation.x=Math.PI/2;ring.position.set(0,2.6,.3);hoop.add(ring);hoop.position.set(5.5,0,-9.8);S.add(hoop)}
  for(const [x,z,c] of[[.6,-.6,'#c23a2b'],[-2.6,-2,'#f2c230'],[2.4,-1,'#3f74b8'],[-.5,-5,'#4f9a4a']]){const b=new THREE.Mesh(new THREE.SphereGeometry(.11,24,16),M6(c,{roughness:.5}));b.position.set(x,.11,z);b.castShadow=true;S.add(b)}
  for(let i=0;i<5;i++)win6(S,-6+i*3,4.6,-9.94,2.2,1.4,0,'#fff2cc');
  for(let i=0;i<6;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(1.4,.06,.3),new THREE.MeshStandardMaterial({color:'#fff',emissive:new THREE.Color('#fff4dc'),emissiveIntensity:1.2}));l.position.set(-5+i*2,5.95,-3);S.add(l)}

  // climbing ropes, a vaulting box, cones and hoops, a scoreboard, ceiling beams
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,5.4,8),M6('#d9c08a',{roughness:1}));r.position.set(-4.4+i*.6,3.3,-6.5);r.rotation.z=Math.sin(i)*.03;S.add(r)}
  {const vb=new THREE.Group();for(let i=0;i<5;i++){const w=1.1-i*.06;bx6(vb,w,.2,.55-i*.02,M6(i===4?'#a8473a':'#c9a476',{roughness:.6}),0,.1+i*.2,0)}vb.position.set(3.4,0,-5.2);vb.rotation.y=.3;S.add(vb)}
  for(const [x,z,c] of[[-1.2,-.6,'#ee8a2c'],[1.3,-.9,'#ee8a2c'],[-2.2,-3.2,'#f2c230'],[2.4,-3.6,'#f2c230']]){const k=new THREE.Mesh(new THREE.ConeGeometry(.08,.22,20),M6(c,{roughness:.5}));k.position.set(x,.11,z);k.castShadow=true;S.add(k)}
  for(const [x,z,c] of[[.9,-2.2,'#e86a8a'],[-1.6,-4.4,'#5ab0e0']]){const h=new THREE.Mesh(new THREE.TorusGeometry(.38,.025,10,48),M6(c,{roughness:.5}));h.rotation.x=-Math.PI/2;h.position.set(x,.025,z);S.add(h)}
  {const sb=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.8),new THREE.MeshStandardMaterial({emissive:new THREE.Color('#ffffff'),emissiveIntensity:.6,map:tex(canvas(320,160,(g,W,H)=>{g.fillStyle='#1a1a1a';g.fillRect(0,0,W,H);g.fillStyle='#ff5a3a';g.font='800 72px monospace';g.fillText('12',30,100);g.fillStyle='#ffd36b';g.fillText('10',190,100);g.font='700 22px Nunito';g.fillStyle='#fff';g.fillText('KOTI      VIERAS',40,145)}))}));sb.position.set(-5,4.4,-9.93);S.add(sb)}
  for(let i=0;i<7;i++)bx6(S,16,.25,.18,M6('#b89a6a'),0,5.85,-9+i*1.9,false);
  motes6(S,0,1.5,-3,3,1.4,3,200,'#fff2d8');
  const toy=new THREE.Group();for(let i=0;i<4;i++){const c=bx6(toy,.05,.05,.05,M6(['#c23a2b','#f2c230','#3f74b8','#4f9a4a'][i]),(i%2)*.052-.026,.025+Math.floor(i/2)*.05,0)}toy.position.set(.28,0,-.1);toy.visible=false;S.add(toy);gymS.userData.tower=toy}
const GYM_CAM=[new THREE.Vector3(-.1,.26,.85),new THREE.Vector3(0,.12,-.3)];
async function toGym(){await goScene(gymS,buildGym,GYM_CAM[0],GYM_CAM[1]);putSiiliIn(gymS,0,0,0)}
const V8={teen:{a:'present',sv:'gör',i:8+6,img:'teen'},luen:{a:'think',sv:'läser',img:'luen'},lasken:{a:'think',sv:'räknar',img:'lasken'},istun:{a:'sitstand',sv:'sitter',img:'istun'},laulan:{a:'talk2',sv:'sjunger',img:'laulan'},seison:{a:'idle',sv:'står',img:'seison'},
  nauran:{a:'happy',sv:'skrattar',img:'nauran'},itken:{a:'sad',sv:'gråter',img:'itken'},hypin:{a:'jump',sv:'hoppar',img:'hypin'},kirjoitan:{a:'present',sv:'skriver',img:'kirjoitan'},taputan:{a:'clap',sv:'klappar',img:'taputan'},vilkutan:{a:'wave',sv:'vinkar',img:'vilkutan'}};
const VK=Object.keys(V8);const vShort=k=>'k8-'+String(2+VK.indexOf(k)).padStart(2,'0'),vLong=k=>'k8-'+String(14+VK.indexOf(k)).padStart(2,'0');
async function doVerb(k,long){play(V8[k].a);if(k==='teen')gymS.userData.tower.visible=true;showPic(V8[k].img,'minä '+k);await tr6(long?vLong(k):vShort(k));hidePic();if(k==='istun'){await sleep(400)}play('idle',.4)}
async function c8Show(){await toGym();setMusic('home');play('wave');await tr6('k8-00');play('present');await tr6('k8-01');
  for(const k of VK){await doVerb(k,true);learn('minä '+k);await sleep(150)}play('present');await tr6('k8-26')}
async function c8Says(){if(scene!==gymS)await toGym();play('present');await tr6('k8-27');await tr6('k8-28');
  for(let r=0;r<8;r++){const k=rnd(VK);const right=Math.random()<.55;const shown=right?k:rnd(VK.filter(x=>x!==k&&V8[x].a!==V8[k].a));
    await say(vShort(k),{sub:false});play(V8[shown].a);showPic(V8[shown].img,'');await say('k8-29');ask('Gör Siili det han säger?');
    const {o}=await choose6([{t:'Oikein!',s:'rätt',e:'✔️',ok:right,v:true},{t:'Väärin!',s:'fel',e:'✖️',ok:!right,v:false}]);clearCards();ask('');hidePic();
    if(o.ok){addPaws(2);await tr6(right?'k8-30':'k8-32');if(!right)await tr6('k8-31')}else{sfx('wrong',.4);showWord('minä '+k,V8[k].sv);await say(rnd(OOPS))}play('idle',.4)
    if(r%3===2){showPic(V8[shown].img);const t=await typeIt(['minä '+shown,shown],'Vad gör Siili på bilden? Skriv på finska.');hidePic();showWord('minä '+shown,'jag '+V8[shown].sv);addPaws(t?1:3)}}}
async function c8Choose(){if(scene!==gymS)await toGym();play('present');await tr6('k8-34');
  for(let r=0;r<4;r++){ask('Vad ska Siili göra?');const opts=shuffle(VK).slice(0,3).map(k=>({t:'minä '+k,s:V8[k].sv,k,ok:true,free:true,e:pic6(V8[k].img,80)}));const {o}=await choose6(opts);clearCards();ask('');await tr6('k8-35');await doVerb(o.k,true);addPaws(1)}
  for(const k of shuffle(VK).slice(0,5)){play(V8[k].a);showPic(V8[k].img,'');await tr6('k8-33');ask('Vad gör Siili?');let tries=0;
    for(;;){const opts=shuffle([k,...shuffle(VK.filter(x=>x!==k)).slice(0,2)]).map(x=>({t:'minä '+x,ok:x===k}));const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');hidePic();await say(vShort(k));addPaws(tries?1:3);break}b.classList.add('wrong');sfx('wrong',.4);tries++}play('idle',.4)}
  // write like the crossword on p. 38
  for(const k of shuffle(['istun','seison','kirjoitan','luen','lasken','laulan']).slice(0,4)){const t=await typeIt(['minä '+k,k],'Skriv på finska: Jag '+V8[k].sv+'.');play(V8[k].a);showWord('minä '+k,'jag '+V8[k].sv);addPaws(t?1:3);await praise();play('idle',.4)}}
async function c8Bingo(){if(scene!==gymS)await toGym();play('happy');await tr6('k8-36');
  const cards=shuffle(VK).slice(0,9);const marked=new Set();const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const box_=$('#grid6'),bd=box_.querySelector('.board');const draw=(cur)=>{bd.innerHTML='<div style="font:800 24px Baloo 2;text-align:center">Bingo! Siili ropar på svenska</div><table>'+[0,1,2].map(r=>'<tr>'+[0,1,2].map(c=>{const i=r*3+c;return `<td data-i="${i}" class="${marked.has(i)?'me':''}" style="cursor:pointer;font-size:22px;height:70px">minä ${cards[i]}${marked.has(i)?'<span class=own>❌</span>':''}</td>`}).join('')+'</tr>').join('')+'</table>'+(cur?`<div style="text-align:center;font:800 28px Baloo 2;margin-top:8px;color:var(--rust)">Jag ${V8[cur].sv}!</div>`:'')};
  box_.style.display='flex';let bingo=false,calls=shuffle(VK),said38=false;
  for(const k of calls){draw(k);play(V8[k].a);
    if(cards.includes(k)){const i=cards.indexOf(k);if(!AUTO)await new Promise(r=>{bd.querySelectorAll('td').forEach(t=>t.onclick=()=>{if(+t.dataset.i===i)r();else{sfx('wrong',.4);t.style.opacity=.5;setTimeout(()=>t.style.opacity=1,400)}})});
      marked.add(i);sfx('right',.4);addPaws(1);draw();await say(vShort(k),{sub:false});
      if(lines.some(l=>l.every(j=>marked.has(j)))){bingo=true;break}if(!said38&&lines.some(l=>l.filter(j=>marked.has(j)).length===2)){said38=true;await tr6('k8-38')}}
    else{await sleep(1300)}}
  draw();play('jump');await tr6('k8-37');addPaws(5);await sleep(800);box_.style.display='none'}
async function c8Sina(){if(scene!==gymS)await toGym();play('present');
  for(const id of['k8-39','k8-40','k8-41','k8-42','k8-43','k8-44']){await tr6(id)}
  const R8={luen:'k8-46',laulan:'k8-47',hypin:'k8-48',nauran:'k8-49',taputan:'k8-50',vilkutan:'k8-51'};const SIN={luen:'luet',laulan:'laulat',hypin:'hypit',nauran:'naurat',taputan:'taputat',vilkutan:'vilkutat'};
  for(let r=0;r<3;r++){await tr6('k8-45');ask('Vad gör du? Välj!');const {o}=await choose6(shuffle(Object.keys(R8)).slice(0,3).map(k=>({t:'',e:pic6(V8[k].img,92),k,ok:true,free:true})));clearCards();ask('');play('happy');showWord('sinä '+SIN[o.k],'du '+V8[o.k].sv);await say(R8[o.k]);addPaws(2)}
  for(const k of shuffle(Object.keys(SIN)).slice(0,3)){showPic(V8[k].img);const t=await typeIt(['sinä '+SIN[k],SIN[k]],'Skriv på finska: Du '+V8[k].sv+'.');hidePic();showWord('sinä '+SIN[k],'du '+V8[k].sv);addPaws(t?1:3);await praise()}}
async function c8Teach(){if(scene!==gymS)await toGym();setMusic('home');play('happy');await sayIf6('x8-19');ask('Gråter Siili?');
  await choose6([{t:'Ja',e:'😢'},{t:'Nej, du skrattar!',e:'😂',ok:true}]);clearCards();ask('');play('think');await sayIf6('x8-20');await sayIf6('x8-21');play('happy');await sayIf6('x8-22');addPaws(3);
  setMusic('evening');play('sad');await tr6('k8-52');play('curl');await tr6('k8-53');play('think');await tr6('k8-54');await sleep(800);await sticker6(8)}
const PARTS8=[{n:'Minä teen',d:'Siili tränar',f:c8Show},{n:'Siili sanoo, Siili tekee',d:'Rätt eller fel?',f:c8Says},{n:'Valitse sinä!',d:'Bestäm vad Siili gör',f:c8Choose},
  {n:'Bingo!',d:'Siili ropar',f:c8Bingo},{n:'Sinä luet',d:'Du-formen',f:c8Sina},{n:'Jag gråter?',d:'Siili lär sig svenska',f:c8Teach}];

/* ================= Kapitel 9 · Onko banaani sininen?: parken i höstfärger ================= */
const parkS=new THREE.Scene();let parkBuilt=false,scarves=[],leaves=null;
const COL9={punainen:['#c8352b','röd'],keltainen:['#f2c230','gul'],sininen:['#2f62b8','blå'],valkoinen:['#f4f1ea','vit'],vihreä:['#3f9a4a','grön'],ruskea:['#7a4b2c','brun'],musta:['#23201e','svart'],harmaa:['#8c8c8c','grå'],liila:['#8a5ab8','lila'],oranssi:['#ee8a2c','orange']};
const CK=Object.keys(COL9);const cLine=k=>'k9-'+String(4+CK.indexOf(k)).padStart(2,'0');
function buildPark(){if(parkBuilt)return;parkBuilt=true;const S=parkS;S.background=outS.background;S.fog=new THREE.FogExp2('#e8cfb0',.03);
  lightRoom6(S,{sky:'#c9d8f0',ground:'#8a6a40',hemi:1.25,key:'#ffd2a0',keyI:3,keyPos:[-5,7,4],shadow:3});
  const grass=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({roughness:1,map:tex(canvas(512,512,(g,W,H)=>{g.fillStyle='#6f8a42';g.fillRect(0,0,W,H);for(let i=0;i<5000;i++){g.fillStyle=`rgba(${rnd(['40,70,20','150,160,60','200,120,40'])},${R01(.05,.25)})`;g.fillRect(Math.random()*W,Math.random()*H,2,R01(3,7))}}),[14,14])}));
  grass.rotation.x=-Math.PI/2;grass.position.y=-.14;grass.receiveShadow=true;S.add(grass);
  // the little stage Siili stands on
  bx6(S,1.3,.14,.7,new THREE.MeshStandardMaterial({map:tex(woodTex2('#a2805c','#6f5338'),[2,1]),roughness:.85}),0,-.07,-.1);
  // a gravel path, benches, lamp posts, autumn trees
  {const p=new THREE.Mesh(new THREE.PlaneGeometry(2,40),M6('#c9b08a',{roughness:1}));p.rotation.x=-Math.PI/2;p.rotation.z=.4;p.position.set(-2.5,-.135,-6);p.receiveShadow=true;S.add(p)}
  for(const [x,z,r] of[[-2.2,-2.6,.4],[2.6,-3.4,-.3]]){const b=new THREE.Group();for(let i=0;i<3;i++)bx6(b,1.4,.04,.1,M6('#7a5434'),0,.42,i*.12-.12);bx6(b,1.4,.3,.04,M6('#7a5434'),0,.65,-.2);for(const s of[-1,1])bx6(b,.06,.56,.4,M6('#2f3a34',{metalness:.5}),s*.6,.14,-.05);b.position.set(x,-.14,z);b.rotation.y=r;S.add(b)}
  const trunkM=M6('#5d4a3a'),leafC=['#d9a441','#c46a2e','#b8402a','#e0b84a','#9a6a2a'];
  for(let i=0;i<26;i++){const a=R01(0,Math.PI*2),r=R01(4,14);const x=Math.cos(a)*r,z=-Math.abs(Math.sin(a)*r)-2;if(Math.abs(x)<2&&z>-4)continue;const h=R01(2.5,5);const t=new THREE.Mesh(new THREE.CylinderGeometry(.12,.22,h,8),trunkM);t.position.set(x,h/2-.14,z);t.castShadow=true;S.add(t);
    for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(1,1.8),2),M6(rnd(leafC),{roughness:.9}));c.position.set(x+R01(-.6,.6),h+R01(-.3,.8),z+R01(-.6,.6));c.castShadow=true;S.add(c)}}

  // birches, lamp posts with warm light, flower beds with pumpkins, bunting on the stage
  for(let i=0;i<6;i++){const x=rnd([-1,1])*R01(2.2,5),z=-R01(2.5,7),h=R01(3,5);const t=new THREE.Mesh(new THREE.CylinderGeometry(.07,.11,h,10),new THREE.MeshStandardMaterial({roughness:.9,map:tex(canvas(64,256,(g,W,H)=>{g.fillStyle='#ece6da';g.fillRect(0,0,W,H);g.fillStyle='#2a2522';for(let k=0;k<26;k++)g.fillRect(R01(0,W),R01(0,H),R01(8,26),R01(2,5))}))}));t.position.set(x,h/2-.14,z);t.castShadow=true;S.add(t);
    for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(R01(.6,1),1),M6(rnd(['#f2c230','#e0b84a','#d9a441']),{roughness:.9}));c.position.set(x+R01(-.5,.5),h-.2+R01(-.3,.5),z+R01(-.5,.5));c.castShadow=true;S.add(c)}}
  for(const [x,z] of[[-1.4,-1.6],[1.6,-2]]){const G=new THREE.Group();const pm=M6('#2f3a34',{metalness:.5,roughness:.4});const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.045,2.4,12),pm);pole.position.y=1.2;G.add(pole);
    const lamp=new THREE.Mesh(new THREE.SphereGeometry(.13,20,16),new THREE.MeshStandardMaterial({color:'#fff2d0',emissive:new THREE.Color('#ffc070'),emissiveIntensity:1.8}));lamp.position.y=2.45;G.add(lamp);G.position.set(x,-.14,z);S.add(G);const pl=new THREE.PointLight('#ffc27a',1.2,4,1.8);pl.position.set(x,2.2,z);S.add(pl)}
  for(const [x,z] of[[-.95,-.25],[.95,-.3],[-.9,.25]]){const pk=new THREE.Mesh(new THREE.SphereGeometry(.07,20,14),M6('#e07a2a',{roughness:.6}));pk.scale.y=.75;pk.position.set(x,-.09,z);pk.castShadow=true;S.add(pk);const st_=new THREE.Mesh(new THREE.CylinderGeometry(.008,.01,.04,6),M6('#4f6a2a'));st_.position.set(x,-.03,z);S.add(st_)}
  for(let i=0;i<40;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.018,8,6),M6(rnd(['#c8352b','#f2c230','#8a5ab8','#f4f1ea']),{roughness:.7}));const side=rnd([-1,1]);f.position.set(side*R01(.75,1.4),-.11,R01(-.7,.4));S.add(f)}
  {const cols=['#c8352b','#f2c230','#2f62b8','#3f9a4a','#8a5ab8','#ee8a2c'];for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.6,8),M6('#a2805c'));p.position.set(s*.64,.3,-.42);S.add(p)}
   for(let i=0;i<11;i++){const t=i/10,x=-.62+t*1.24,y=.56-Math.sin(t*Math.PI)*.08;const f=new THREE.Mesh(new THREE.ConeGeometry(.03,.07,3),M6(cols[i%6]));f.rotation.x=Math.PI;f.position.set(x,y,-.42);S.add(f)}}
  {const sky=new THREE.Mesh(new THREE.SphereGeometry(40,32,16),new THREE.MeshBasicMaterial({map:outS.background,side:THREE.BackSide,fog:false}));}
  // leaves on the ground and falling
  const lg=new THREE.PlaneGeometry(.05,.035);const lm=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,roughness:.9,vertexColors:false,color:'#d08a3a'});
  const N=420;leaves=new THREE.InstancedMesh(lg,lm,N);const dm=new THREE.Object3D();const col=new THREE.Color();leaves.userData.p=[];
  for(let i=0;i<N;i++){const fall=i<60;const p={x:R01(-3,3),y:fall?R01(0,3):-.13,z:R01(-4,1.2),r:R01(0,6),s:R01(.6,1.4),fall,v:R01(.08,.18)};if(!fall&&Math.abs(p.x)<.65&&p.z>-.45&&p.z<.25)p.y=0.002;leaves.userData.p.push(p);col.set(rnd(leafC));leaves.setColorAt(i,col)}
  S.add(leaves);
  // a clothes rack with scarves (Saga colours them)
  const rack=new THREE.Group();const rm=M6('#a2805c');for(const s of[-1,1]){bx6(rack,.02,.42,.02,rm,s*.2,.21,0);bx6(rack,.1,.012,.06,rm,s*.2,.006,0)}const rail=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.44,8),rm);rail.rotation.z=Math.PI/2;rail.position.y=.41;rack.add(rail);
  const knit=tex(canvas(64,256,(g,W,H)=>{g.fillStyle='#fff';g.fillRect(0,0,W,H);g.strokeStyle='rgba(0,0,0,.12)';g.lineWidth=2;for(let y=0;y<H;y+=8){for(let x=0;x<W;x+=8){g.beginPath();g.moveTo(x,y);g.lineTo(x+4,y+6);g.lineTo(x+8,y);g.stroke()}}}),[1,1]);
  for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.06,.3,.012),new THREE.MeshStandardMaterial({map:knit,color:'#f4f1ea',roughness:.95}));m.position.set(-.16+i*.08,.26,.0);m.castShadow=true;rack.add(m);scarves.push(m)}
  rack.position.set(.36,0,-.24);rack.rotation.y=-.3;S.add(rack);
  (function tick(now){requestAnimationFrame(tick);if(scene!==parkS)return;const t=now/1000;leaves.userData.p.forEach((p,i)=>{if(p.fall){p.y-=p.v*.016;p.x+=Math.sin(t+i)*.002;if(p.y<-.13){p.y=3;p.x=R01(-3,3)}}dm.position.set(p.x,p.y,p.z);dm.rotation.set(p.fall?t*2+i:-Math.PI/2,p.r+(p.fall?t:0),0);dm.scale.setScalar(p.s);dm.updateMatrix();leaves.setMatrixAt(i,dm.matrix)});leaves.instanceMatrix.needsUpdate=true})(0)}
const PARK_CAM=[new THREE.Vector3(-.15,.3,.85),new THREE.Vector3(.05,.12,-.3)];
async function toPark(){await goScene(parkS,buildPark,PARK_CAM[0],PARK_CAM[1]);putSiiliIn(parkS,0,0,0)}
function scarfOn(k){$('#scarf6').style.display='block';}
async function c9Show(){await toPark();setMusic('home');play('wave');await tr6('k9-00');play('happy');await tr6('k9-01');play('present');await tr6('k9-02');play('think');await tr6('k9-03');
  const show=['punainen','keltainen','sininen','vihreä','liila'];for(let i=0;i<5;i++){scarves[i].material.color.set(COL9[show[i]][0]);play('present');await tr6('k9-'+String(14+i));showWord(show[i],COL9[show[i]][1],1600)}
  for(const k of['valkoinen','ruskea','musta','harmaa','oranssi']){showWord(k,COL9[k][1],1500);await say(cLine(k))}}
async function c9Colour(){if(scene!==parkS)await toPark();
  // colour the scarf like p. 42: Siili says a colour, Saga picks it
  const box_=$('#scarf6');box_.innerHTML='<svg viewBox="0 0 600 120" width="min(80vw,600px)"><g id="sg"></g></svg>';box_.style.display='block';const g_=box_.querySelector('#sg');
  for(let i=0;i<10;i++){const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',30+i*54);r.setAttribute('y',30+Math.sin(i*.8)*14);r.setAttribute('width',52);r.setAttribute('height',60);r.setAttribute('rx',8);r.setAttribute('fill','#fffaf2');r.setAttribute('stroke','#4a3426');r.setAttribute('stroke-width',3);g_.append(r)}
  const pal=$('#pal6');pal.innerHTML='';pal.style.display='flex';const order=shuffle(CK);
  for(const k of CK){const b=document.createElement('button');b.style.background=COL9[k][0];b.dataset.k=k;pal.append(b)}
  for(let i=0;i<10;i++){const k=order[i];ask('Vilken färg säger Siili?');if(i>0&&i%3===0)await say('k9-19');await say(cLine(k),{sub:false});let tries=0;
    for(;;){const pick=AUTO?k:await new Promise(r=>pal.querySelectorAll('button').forEach(b=>b.onclick=()=>r(b.dataset.k)));if(pick===k)break;sfx('wrong',.4);tries++;await say(cLine(k),{sub:false})}
    g_.children[i].setAttribute('fill',COL9[k][0]);scarves[i%5].material.color.set(COL9[k][0]);ask('');play('happy');showWord(k,COL9[k][1],1300);learn(k);addPaws(tries?1:2);await sleep(300)}
  pal.style.display='none';await praise();await sleep(800);box_.style.display='none';
  // write three colours
  for(const k of shuffle(CK).slice(0,6)){const t=await typeIt([k],'Skriv på finska: '+COL9[k][1]);showWord(k,COL9[k][1]);addPaws(t?1:3);await praise()}}
async function c9Onko(){if(scene!==parkS)await toPark();play('present');await tr6('k9-20');
  const Q=[['k9-22',true,'kurkku'],['k9-23',false,'banaani','k9-35'],['k9-24',false,'appelsiini','k9-36'],['k9-25',true,'tomaatti'],['k9-26',true,'sitruuna'],['k9-27',false,'appelsiini'],['k9-28',false,'banaani'],['k9-29',false,'paaryna'],['k9-30',false,'tomaatti'],['k9-31',true,'pulla'],['k9-32',false,null,'k9-37']];
  for(const [id,yes,img,react] of shuffle(Q).slice(0,8)){if(img)showPic(img);play('think');await say(id);ask('Vad svarar du?');let tries=0;
    for(;;){const {o,b}=await choose6([{t:'On.',s:'ja',e:'👍',ok:yes},{t:'Ei ole.',s:'nej',e:'👎',ok:!yes}]);if(o.ok){clearCards();ask('');hidePic();play(yes?'nod':'shake');await say(yes?'k9-33':'k9-34');if(react)await tr6(react);learn(yes?'on':'ei ole');addPaws(tries?1:3);break}b.classList.add('wrong');sfx('wrong',.4);tries++}}
  await tr6('k9-21')}
async function c9What(){if(scene!==parkS)await toPark();play('think');await tr6('k9-38');play('happy');await tr6('k9-39');
  const A=[['kissa','musta','k9-40','k9-49'],['koira','ruskea','k9-41','k9-50'],['hamsteri','oranssi','k9-42','k9-51'],['sammakko','vihreä','k9-43'],['ankka','keltainen','k9-44'],['mansikka','punainen','k9-45'],['kukka','liila','k9-46'],['lumiukko','valkoinen','k9-47']];
  let n=0;for(const [img,c,id,fun] of shuffle(A).slice(0,8)){n++;showPic(img);await say(id);
    if(n%3!==1){await say('k9-48');const t=await typeIt([c,c.replace('ä','a')],'Skriv färgen på finska!');hidePic();showWord(c,COL9[c][1]);addPaws(t?1:3)}
    else{ask('Minkävärinen? Välj det finska ordet.');for(;;){const opts=shuffle([c,...shuffle(CK.filter(x=>x!==c)).slice(0,3)]).map(x=>({t:x,ok:x===c}));const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');hidePic();showWord(c,COL9[c][1]);addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}}
    play('happy');if(fun)await tr6(fun);else await praise();learn(c)}}
async function c9More(){if(scene!==parkS)await toPark();
  for(const [id,yes,react] of[['k9-52',true],['k9-53',true],['k9-54',true],['k9-55',false,'k9-56'],['k9-57',true],['k9-58',false]]){play('think');await say(id);ask('On vai ei ole?');let tries=0;
    for(;;){const {o,b}=await choose6([{t:'On.',e:'👍',ok:yes},{t:'Ei ole.',e:'👎',ok:!yes}]);if(o.ok){clearCards();ask('');play(yes?'nod':'shake');await say(yes?'k9-33':'k9-34');if(react)await tr6(react);addPaws(tries?1:3);break}b.classList.add('wrong');sfx('wrong',.4);tries++}}
  for(const [id,a,b_,res] of[['k9-59','sininen','punainen','liila'],['k9-60','keltainen','sininen','vihreä'],['k9-61','punainen','keltainen','oranssi']]){
    clearTimeout(showWord.t);$('#word .fi').innerHTML=`<span style="color:${COL9[a][0]}">●</span> + <span style="color:${COL9[b_][0]}">●</span>`;$('#word .sv').textContent='';$('#word').classList.add('on');
    await say(id);ask('Vilken färg blir det? Svara på finska.');for(;;){const opts=shuffle([res,...shuffle(CK.filter(x=>x!==res&&x!==a&&x!==b_)).slice(0,2)]).map(x=>({t:x,ok:x===res}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');$('#word').classList.remove('on');play('jump');showWord(res,COL9[res][1]);await tr6('k9-62');addPaws(3);break}b.classList.add('wrong');sfx('wrong',.4)}}}
async function c9Show2(){if(scene!==parkS)await toPark();setMusic('home');
  scarves.forEach((s,i)=>s.material.color.set(i%2?'#f4f1ea':'#2f62b8'));play('present');await tr6('k9-63');play('think');await tr6('k9-64');ask('Vilken är din favoritfärg?');
  const {o}=await choose6(shuffle(CK).slice(0,4).map(k=>({t:k,s:COL9[k][1],free:true,e:`<div style="width:54px;height:54px;border-radius:50%;margin:0 auto;background:${COL9[k][0]}"></div>`,k,ok:true})));clearCards();ask('');st.fav=o.k;save();scarves[2].material.color.set(COL9[o.k][0]);play('happy');await tr6('k9-65');
  play('present');await sayIf6('x9-20');ask('Är Siili blå?');await choose6([{t:'Ja',e:'💙'},{t:'Nej, blöt!',e:'💧',ok:true}]);clearCards();ask('');play('think');await sayIf6('x9-21');await sayIf6('x9-22');play('happy');await sayIf6('x9-23');addPaws(3);
  play('happy');await tr6('k9-66');siili.position.set(-.4,0,-.1);await camTo(new THREE.Vector3(.3,.3,.9),new THREE.Vector3(0,.12,-.2),900);play('walk');
  await new Promise(r=>{const t0=performance.now();(function s(){const k=Math.min(1,(performance.now()-t0)/2600);siili.position.x=-.4+k*.8;face(new THREE.Vector3(1,0,-.1));if(k<1)requestAnimationFrame(s);else r()})()});
  face(cam.position);play('bow');await tr6('k9-67');play('clap');await tr6('k9-68');setMusic('evening');play('curl');await tr6('k9-69');await sticker6(9)}
const PARTS9=[{n:'Muotinäytös',d:'Halsdukar i alla färger',f:c9Show},{n:'Väritä!',d:'Färglägg halsduken',f:c9Colour},{n:'Onko …?',d:'On eller ei ole',f:c9Onko},
  {n:'Minkävärinen?',d:'Vilken färg?',f:c9What},{n:'Lisää!',d:'Huvudstäder och färgblandning',f:c9More},{n:'Lavalla',d:'Modevisningen',f:c9Show2}];

/* ================= Kapitel 10 · Nähdään huomenna!: kalaset i vardagsrummet ================= */
let partyBuilt=false,owlG=null,sqG=null,cakeG=null,giftG=null,bouqG=null,ballG=null;

async function spriteProp(img,h){const t=await new THREE.TextureLoader().loadAsync('img6/'+img+'.webp');t.colorSpace=THREE.SRGBColorSpace;const asp=t.image.width/t.image.height;
  const sp=new THREE.Mesh(new THREE.PlaneGeometry(h*asp,h),new THREE.MeshStandardMaterial({map:t,transparent:true,alphaTest:.35,roughness:.85,side:THREE.DoubleSide}));sp.position.y=h/2;sp.castShadow=true;const m=new THREE.Group();m.add(sp);m.userData.sprite=sp;m.userData.billboard=true;return m}
async function guest6(file,img,h){const g=await optGLB6(file);if(g){const inner=g.scene;fitModel(inner,{h});const m=new THREE.Group();m.add(inner);m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;for(const mt of[].concat(o.material))if(mt){mt.emissiveMap=null;mt.emissive?.set('#000');mt.roughness=Math.max(mt.roughness??.6,.6);mt.metalness=0}}});
    if(g.animations&&g.animations.length){const mx=new THREE.AnimationMixer(inner);m.userData.mixer=mx;m.userData.acts={};for(const c of g.animations){m.userData.acts[c.name.toLowerCase()]=mx.clipAction(c)}const idle=Object.keys(m.userData.acts).find(n=>/idle/.test(n))||Object.keys(m.userData.acts)[0];m.userData.acts[idle].play()}return m}
  const t=await new THREE.TextureLoader().loadAsync('img6/'+img+'.webp');t.colorSpace=THREE.SRGBColorSpace;const asp=t.image.width/t.image.height;
  const sp=new THREE.Mesh(new THREE.PlaneGeometry(h*asp,h),new THREE.MeshStandardMaterial({map:t,transparent:true,alphaTest:.4,roughness:.9,side:THREE.DoubleSide}));sp.position.y=h/2;sp.castShadow=true;const m=new THREE.Group();m.add(sp);m.userData.sprite=sp;return m}
function guestAnim(m,re){if(!m||!m.userData.acts)return false;const k=Object.keys(m.userData.acts).find(n=>re.test(n));if(!k)return false;const A=m.userData.acts[k];for(const a of Object.values(m.userData.acts))if(a!==A)a.fadeOut(.3);A.reset().fadeIn(.3).play();
  if(!/idle|walk|run|talk/.test(k)){A.setLoop(THREE.LoopOnce);A.clampWhenFinished=true;clearTimeout(m.userData.t);m.userData.t=setTimeout(()=>guestAnim(m,/idle/),A.getClip().duration*1000-200)}return true}
async function buildParty(){if(partyBuilt)return;partyBuilt=true;const S=homeS;const P=new THREE.Group();P.name='party';
  const cols=['#e86a8a','#f2c230','#5ab0e0','#8ad07a','#b58ae0'];
  for(let i=0;i<9;i++){const x=R01(-.48,.48),z=R01(-.55,-.35),y=R01(.42,.52);const b=new THREE.Mesh(new THREE.SphereGeometry(.035,20,16),M6(cols[i%5],{roughness:.25}));b.scale.y=1.18;b.position.set(x,y,z);P.add(b);
    const s=new THREE.Mesh(new THREE.CylinderGeometry(.0012,.0012,y,4),M6('#ddd'));s.position.set(x,y/2,z);P.add(s)}
  for(let i=0;i<13;i++){const t=i/12,x=-.48+t*.96,y=.53-Math.sin(t*Math.PI)*.04;const f=new THREE.Mesh(new THREE.ConeGeometry(.012,.03,3),M6(cols[i%5]));f.rotation.x=Math.PI;f.position.set(x,y,-.58);P.add(f)}
  S.add(P);P.visible=false;homeS.userData.party=P;
  owlG=await guest6('owl.glb','owl',.27);owlG.position.set(.32,0,.18);owlG.visible=false;S.add(owlG);
  sqG=await guest6('squirrel.glb','squirrel',.21);sqG.position.set(-.2,0,.3);sqG.visible=false;sqG.rotation.y=0;S.add(sqG);
  cakeG=await optGLB6('cake.glb')?await placeGLB6(S,'cake.glb',{x:.16,y:0,z:.02,h:.07}):null;if(!cakeG){cakeG=await spriteProp('cake',.085);cakeG.position.set(.17,0,.04);S.add(cakeG)}if(false)(()=>{const G=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.05,32),M6('#fff4ec'));c.position.y=.025;G.add(c);for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.007,10,8),M6('#d0302a'));const a=i/10*Math.PI*2;s.position.set(Math.cos(a)*.04,.053,Math.sin(a)*.04);G.add(s)}for(let i=0;i<5;i++){const k=new THREE.Mesh(new THREE.CylinderGeometry(.002,.002,.022,6),M6(cols[i]));const a=i/5*Math.PI*2;k.position.set(Math.cos(a)*.02,.062,Math.sin(a)*.02);G.add(k)}return G});cakeG.visible=false;
  giftG=await spriteProp('gifts',.11);giftG.position.set(-.13,0,-.08);S.add(giftG);if(false)(()=>{const G=new THREE.Group();bx6(G,.07,.05,.07,M6('#3f74b8'),0,.025,0);bx6(G,.055,.04,.055,M6('#f2c230'),0,.07,0);bx6(G,.04,.03,.04,M6('#e86a8a'),0,.105,0);return G});giftG.visible=false;
  bouqG=await spriteProp('bouquet',.08);bouqG.position.set(-.08,0,.3);S.add(bouqG);if(false)(()=>{const G=new THREE.Group();for(let i=0;i<7;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.01,10,8),M6('#f2c230'));f.position.set(R01(-.015,.015),.06+R01(0,.02),R01(-.015,.015));G.add(f)}const st_=new THREE.Mesh(new THREE.CylinderGeometry(.006,.004,.06,8),M6('#4f9a4a'));st_.position.y=.03;G.add(st_);return G});bouqG.visible=false;
  ballG=await spriteProp('football',.045);ballG.position.set(-.6,0,.1);S.add(ballG);if(false)(()=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.025,20,14),M6('#f4f4f4',{roughness:.5}));b.position.y=.025;const G=new THREE.Group();G.add(b);return G});ballG.visible=false;
  (function tick(){requestAnimationFrame(tick);for(const g of[owlG,sqG])if(g&&g.userData.mixer)g.userData.mixer.update(1/60);if(scene===homeS)for(const g of[cakeG,giftG,bouqG,ballG])if(g&&g.userData.billboard&&g.visible)g.rotation.y=Math.atan2(cam.position.x-g.position.x,cam.position.z-g.position.z);if(scene===homeS)for(const g of[owlG,sqG])if(g&&g.userData.sprite&&g.visible){g.lookAt(cam.position.x,g.position.y,cam.position.z);g.userData.sprite.position.y=g.userData.h0??(g.userData.h0=g.userData.sprite.position.y);g.userData.sprite.position.y+=Math.sin(performance.now()/300+g.position.x*9)*.002}})()}
async function toParty(){await toHome();await buildParty();homeS.userData.party.visible=true;homeCam='follow'}
function hop6(g,ms=500){const y0=g.position.y,t0=performance.now();return new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/ms);g.position.y=y0+Math.sin(k*Math.PI)*.05;if(k<1)requestAnimationFrame(s);else{g.position.y=y0;r()}})()})}
async function enter6(g,x,z){const sx=.95,sz=z+.05;g.position.set(sx,0,sz);g.visible=true;sfx('door',.35);const sprite=!!g.userData.sprite;
  const dist=Math.hypot(x-sx,z-sz),ms=dist/.16*1000;const yaw=Math.atan2(x-sx,z-sz);if(!sprite)g.rotation.y=yaw;
  if(!guestAnim(g,/walk/))guestAnim(g,/run/);const t0=performance.now();
  await new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t0)/ms);const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;g.position.x=sx+(x-sx)*Math.min(1,e);g.position.z=sz+(z-sz)*Math.min(1,e);
    if(sprite)g.userData.sprite.position.y=g.userData.sprite.geometry.parameters.height/2+Math.abs(Math.sin(k*ms/160))*.012;if(k<1)requestAnimationFrame(s);else r()})()});
  guestAnim(g,/idle/);if(!sprite){const y0=g.rotation.y,y1=Math.atan2(cam.position.x-x,cam.position.z-z),t1=performance.now();await new Promise(r=>{(function s(){const k=Math.min(1,(performance.now()-t1)/600);g.rotation.y=y0+(y1-y0)*k;if(k<1)requestAnimationFrame(s);else r()})()})}}
async function pick10(q,opts){ask(q);let tries=0;for(;;){const {o,b}=await choose6(shuffle(opts));if(o.ok){clearCards();ask('');learn(o.t);addPaws(tries?1:3);return o}b.classList.add('wrong');sfx('wrong',.4);tries++;await say(rnd(OOPS))}}
async function c10Arrive(){await toParty();setMusic('home');play('jump');await tr6('k10-00');play('happy');await tr6('k10-01');
  sfx('door',.4);play('scared');await tr6('k10-02');await tr6('k10-03');
  await pick10('Vad säger Siili när någon kommer?',[{t:'Tervetuloa! Tule sisään!',s:'Välkommen! Kom in!',ok:true},{t:'Näkemiin!',s:'Adjö!'},{t:'Anteeksi!',s:'Förlåt!'}]);play('wave');await tr6('k10-04');
  await enter6(sqG,-.2,.3);await hop6(sqG);await say('q-00');
  await pick10('Orava frågar hur Siili mår. Vad svarar Siili?',[{t:'Hyvää, kiitos!',s:'Bra, tack!',ok:true},{t:'Onnea!',s:'Grattis!'},{t:'Ei se mitään.',s:'Det gör inget.'}]);play('happy');await tr6('k10-08');
  bouqG.visible=true;await say('q-01');await pick10('Orava ger Siili blommor. Vad säger Siili?',[{t:'Oi kiitos!',s:'Åh, tack!',ok:true},{t:'Anteeksi!',s:'Förlåt!'},{t:'Huomenta!',s:'God morgon!'}]);play('happy');await tr6('k10-09');
  await say('q-02');await pick10('Orava säger grattis. Vad svarar Siili?',[{t:'Kiitos paljon!',s:'Tack så mycket!',ok:true},{t:'Kiva tavata!',s:'Roligt att träffas!'},{t:'Sopii!',s:'Passar!'}]);await tr6('k10-10')}
async function c10Owl(){if(!homeS.userData.party?.visible){await toParty();sqG.visible=bouqG.visible=true}
  sfx('door',.4);await enter6(owlG,.32,.18);await say('o-00');
  await pick10('Ugglan, Siilis lärare, kommer. Vad säger Siili?',[{t:'Päivää!',s:'God dag!',ok:true},{t:'Hyvää yötä!',s:'God natt!'},{t:'Anteeksi!',s:'Förlåt!'}]);play('wave');await tr6('k10-05');
  await say('o-01');await pick10('Ugglan frågar: Mitä kuuluu?',[{t:'Hyvää, kiitos!',s:'Bra, tack!',ok:true},{t:'Tervetuloa!',s:'Välkommen!'},{t:'Näkemiin!',s:'Adjö!'}]);await tr6('k10-08');
  await say('o-02');await say('o-03');giftG.visible=true;play('present');await tr6('k10-18');play('jump');await tr6('k10-19');
  // the guests meet
  await say('q-03');guestAnim(owlG,/wave|nod/);await say('o-07');
  await pick10('Mato tittar fram! Vad säger Siili?',[{t:'Pitkästä aikaa, Mato!',s:'Länge sedan, Mato!',ok:true},{t:'Heippa ope!',s:'Hejdå, fröken!'},{t:'Ole hyvä!',s:'Varsågod!'}]);play('happy');await tr6('k10-15')}
async function c10Cake(){if(!homeS.userData.party?.visible){await toParty();for(const g of[sqG,owlG,bouqG,giftG])g.visible=true}
  cakeG.visible=true;play('happy');await tr6('k10-20');await tr6('k10-21');play('clap');guestAnim(owlG,/clap/);guestAnim(sqG,/jump|danc/);await say('k10-22');addPaws(3);
  await say('q-05');const o=await pick10('Orava vill ha tårta. Vad säger Siili när han ger henne en bit?',[{t:'Tässä, ole hyvä!',s:'Här, varsågod!',ok:true},{t:'Anteeksi!',s:'Förlåt!'},{t:'Kiitos!',s:'Tack!'}]);play('present');await tr6('k10-11');await say('q-07')}
async function c10Oops(){if(!homeS.userData.party?.visible){await toParty();for(const g of[sqG,owlG,bouqG,giftG,cakeG])g.visible=true}
  ballG.visible=true;ballG.position.set(-.1,0,.1);play('jump');
  await new Promise(r=>{const t0=performance.now(),p0=ballG.position.clone(),p1=owlG.position.clone().add(new THREE.Vector3(0,.22,0));(function s(){const k=Math.min(1,(performance.now()-t0)/700);ballG.position.lerpVectors(p0,p1,k);ballG.position.y+=Math.sin(k*Math.PI)*.12;if(k<1)requestAnimationFrame(s);else r()})()});
  guestAnim(owlG,/hit|react/);await say('o-04');ballG.position.set(.25,0,.3);play('scared');await tr6('k10-23');
  await pick10('Bollen träffade fröken! Vad säger Siili?',[{t:'Anteeksi, ope!',s:'Förlåt, fröken!',ok:true},{t:'Onnea!',s:'Grattis!'},{t:'Tervetuloa!',s:'Välkommen!'}]);play('sad');await tr6('k10-24');await say('o-05');
  // the cake falls
  await say('q-04');cakeG.rotation.z=1.4;cakeG.position.y=-.01;play('scared');await tr6('k10-25');
  await pick10('Tårtan ramlade! Vad säger Siili till Orava?',[{t:'Ei se mitään.',s:'Det gör inget.',ok:true},{t:'Kiitos paljon!',s:'Tack så mycket!'},{t:'Päivää!',s:'God dag!'}]);play('happy');await tr6('k10-26');
  await say('o-06');await pick10('Ugglan frågar: Voinko auttaa? (Kan jag hjälpa?) Vad svarar Siili?',[{t:'Sopii!',s:'Passar bra!',ok:true},{t:'Anteeksi!',s:'Förlåt!'},{t:'Hyvää yötä!',s:'God natt!'}]);await tr6('k10-16');await say('q-06');
  cakeG.rotation.z=0;cakeG.position.y=0}
async function c10Phrases(){if(!homeS.userData.party?.visible){await toParty();for(const g of[sqG,owlG])g.visible=true}
  const P=[['God dag!','Päivää!','k10-05'],['Hur mår du?','Mitä kuuluu?','k10-07'],['Bra, tack!','Hyvää, kiitos!','k10-08'],['Vi ses i morgon!','Nähdään huomenna!','k10-31'],['Välkommen!','Tervetuloa!','k10-04'],['Kom in!','Tule sisään!','k10-04'],['Varsågod!','Ole hyvä!','k10-11'],
    ['Förlåt!','Anteeksi!','k10-24'],['Det gör inget.','Ei se mitään.',null],['Grattis!','Onnea!','q-02'],['Tack så mycket!','Kiitos paljon!','k10-10'],['God morgon!','Huomenta!','k10-06'],['Hejdå!','Heippa!','k10-30'],['Roligt att träffas!','Kiva tavata!','k10-13']];
  let n=0;for(const [sv,fi,id] of shuffle(P).slice(0,10)){n++;
    if(n%2===0){const acc=[fi,fi.replace(/[!.,]/g,'')];const t=await typeIt(acc,'Skriv på finska: '+sv);showWord(fi,sv);addPaws(t?1:3);if(id)await say(id);else await praise();continue}
    ask(`Vad är "${sv}" på finska?`);let tries=0;for(;;){const opts=shuffle([[sv,fi],...shuffle(P.filter(x=>x[1]!==fi)).slice(0,2)]).map(x=>({t:x[1],ok:x[1]===fi}));const {o,b}=await choose6(opts);
      if(o.ok){clearCards();ask('');showWord(fi,sv);learn(fi);addPaws(tries?1:3);if(id)await say(id);else await praise();break}b.classList.add('wrong');sfx('wrong',.4);tries++}}}
async function c10Bye(){if(!homeS.userData.party?.visible){await toParty();for(const g of[sqG,owlG,giftG,bouqG])g.visible=true}
  setMusic('evening');play('sad');await tr6('k10-29');
  guestAnim(owlG,/wave/);await say('o-09');await pick10('Ugglan går hem. Vad säger Siili?',[{t:'Heippa ope!',s:'Hejdå, fröken!',ok:true},{t:'Tervetuloa!',s:'Välkommen!'},{t:'Onnea!',s:'Grattis!'}]);play('wave');await tr6('k10-12');await say('o-10');await tr6('k10-31');owlG.visible=false;sfx('door',.3);
  await say('q-08');await pick10('Orava säger hejdå. Vad svarar Siili?',[{t:'Heippa! Oli kivaa!',s:'Hejdå! Det var roligt!',ok:true},{t:'Mitä kuuluu?',s:'Hur mår du?'},{t:'Anteeksi!',s:'Förlåt!'}]);play('wave');await tr6('k10-30');await say('q-09');await tr6('k10-33');sqG.visible=false;sfx('door',.3);
  play('present');await sayIf6('x10-13');play('happy');await sayIf6('x10-14');await sayIf6('x10-15');await sayIf6('x10-16');await sayIf6('x10-17');
  ask('Siili sa fel på ett ställe. "Tack för att ni kommde" – hur ska det vara?');await choose6(shuffle([{t:'Tack för att ni kom!',ok:true},{t:'Tack för att ni kommer!'},{t:'Tack för att ni komma!'}]));clearCards();ask('');play('nod');addPaws(3);
  await tr6('k10-35');play('curl');await tr6('k10-36');ask('Hyvää yötä, Siili!');await sleep(1500);ask('');homeS.userData.party.visible=false;for(const g of[cakeG,giftG,bouqG,ballG])if(g)g.visible=false;homeCam='follow';await sticker6(10)}
const PARTS10=[{n:'Gästerna kommer',d:'Tervetuloa!',f:c10Arrive},{n:'Heippa ope!',d:'Ugglan kommer',f:c10Owl},{n:'Paljon onnea!',d:'Tårtan',f:c10Cake},
  {n:'Anteeksi!',d:'Olyckor på kalaset',f:c10Oops},{n:'Vad säger man?',d:'Artiga fraser',f:c10Phrases},{n:'Nähdään huomenna!',d:'Hejdå och ett tal',f:c10Bye}];

/* ================= Provrepetitionen: tärningsspelet från sidan 49 ================= */
const RQ=[['lätt fråga','helppo kysymys'],['Tack.','Kiitos.'],['Roligt att träffas!','Kiva tavata!'],['grå','harmaa'],['Apelsinen är orange.','Appelsiini on oranssi.'],['nästan','melkein'],
  ['Vi ses i morgon!','Nähdään huomenna!'],['Vilken färg?','Minkävärinen?'],['Hur många?','Kuinka monta?'],['blå','sininen'],['röd','punainen'],['vit','valkoinen'],
  ['Grattis!','Onnea!'],['svart','musta'],['Hur mår du?','Mitä kuuluu?'],['Bra, tack!','Hyvää, kiitos!'],['Tack detsamma!','Kiitos samoin!'],['Vänta!','Odota!'],
  ['God dag!','Päivää!'],['brun','ruskea'],['Förlåt.','Anteeksi.'],['Det gör inget.','Ei se mitään.'],['Jag hjälper.','Minä autan.'],['Fint!','Hienoa!'],
  ['Välkommen!','Tervetuloa!'],['Jag kan.','Minä osaan.'],['Vad är det här?','Mikä tämä on?'],['Det här är en grill.','Tämä on grilli.'],['Gurkan är grön.','Kurkku on vihreä.'],['Det är en klocka.','Se on kello.'],
  ['Varsågod!','Ole hyvä!'],['Tack så mycket!','Kiitos paljon!'],['Jag vet.','Minä tiedän.'],['God morgon!','Hyvää huomenta!'],['Citronen är gul.','Sitruuna on keltainen.'],['Tomaten är röd.','Tomaatti on punainen.']];
function cluster6(own,who){const seen=new Set();let best=0;for(let i=0;i<36;i++){if(own[i]!==who||seen.has(i))continue;let n=0;const q=[i];seen.add(i);while(q.length){const j=q.pop();n++;const r=Math.floor(j/6),c=j%6;
  for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){const r2=r+dr,c2=c+dc,k=r2*6+c2;if(r2<0||r2>5||c2<0||c2>5||seen.has(k)||own[k]!==who)continue;seen.add(k);q.push(k)}}best=Math.max(best,n)}return best}
async function cRepeat(){await toClass();setMusic('search');play('happy');await tr6('kR-00');await tr6('kR-01');
  const own=Array(36).fill(null);const box_=$('#grid6'),bd=box_.querySelector('.board');const dieC=['#f2c230','#3f74b8'];
  const draw=(cur,d1,d2,msg='')=>{bd.innerHTML='<table><tr><td class="c"></td>'+[1,2,3,4,5,6].map(c=>`<td class="h">${c}</td>`).join('')+'</tr>'+[0,1,2,3,4,5].map(r=>`<tr><td class="h v">${r+1}</td>`+[0,1,2,3,4,5].map(c=>{const i=r*6+c;return `<td class="${own[i]==='S'?'me':own[i]==='H'?'si':''} ${cur===i?'cur':''}">${RQ[i][0]}${own[i]?`<span class=own>${own[i]==='S'?'💗':'🦔'}</span>`:''}</td>`}).join('')+'</tr>').join('')+'</table>'+
    `<div class="dice"><div class="die" style="background:${dieC[0]}">${d1||'?'}</div><div class="die" style="background:${dieC[1]}">${d2||'?'}</div><button class="big" id="roll6" style="margin:0">Kasta!</button></div><div class="score">Du: ${cluster6(own,'S')} i rad · Siili: ${cluster6(own,'H')} i rad · Först till 6 som rör vid varandra${msg?' · '+msg:''}</div>`};
  box_.style.display='flex';draw();await tr6('kR-02');
  const roll=()=>new Promise(r=>{if(AUTO){r();return}$('#roll6').onclick=r});let turn='S',guard=0;
  while(cluster6(own,'S')<6&&cluster6(own,'H')<6&&guard++<120){
    if(turn==='S'){draw();await roll();let d1,d2,i;for(let k=0;k<10;k++){d1=1+Math.floor(Math.random()*6);d2=1+Math.floor(Math.random()*6);i=(d2-1)*6+d1-1;if(!own[i])break}
      if(own[i]){const free=[...Array(36).keys()].filter(j=>!own[j]);i=rnd(free);d1=i%6+1;d2=Math.floor(i/6)+1}
      draw(i,d1,d2);await sleep(500);const [sv,fi]=RQ[i];const single=fi.split(' ').length<=3;box_.style.display='none';
      let ok;if(single&&Math.random()<.75){await say(rnd(['kR-05','kR-04']));const t=await typeIt([fi,fi.replace(/[!.?,]/g,'')],'Skriv på finska: '+sv);ok=true;showWord(fi,sv);addPaws(t?1:3);if(t)await tr6('kR-07');else await praise()}
      else{await say('kR-03');ask(`"${sv}" på finska?`);let tries=0;for(;;){const opts=shuffle([RQ[i],...shuffle(RQ.filter(x=>x!==RQ[i])).slice(0,3)]).map(x=>({t:x[1],ok:x===RQ[i]}));const {o,b}=await choose6(opts);if(o.ok){clearCards();ask('');break}b.classList.add('wrong');sfx('wrong',.4);tries++}showWord(fi,sv);addPaws(tries?1:3);ok=true;if(!tries)await praise()}
      if(ok)own[i]='S';box_.style.display='flex';turn='H'}
    else{draw(null,null,null,'Siili kastar …');await sleep(900);const free=[...Array(36).keys()].filter(j=>!own[j]);if(!free.length)break;const i=rnd(free);draw(i,i%6+1,Math.floor(i/6)+1,'Siili kastar …');await sleep(1100);
      if(Math.random()<.7){own[i]='H';play('happy')}else{play('shake')}turn='S'}}
  draw();if(cluster6(own,'S')>=6){play('jump');await tr6('kR-08');await tr6('kR-09')}else{play('happy');await tr6('kR-06')}
  await sleep(600);box_.style.display='none';play('wave');await tr6('kR-10');addPaws(10)}
async function cRepeatWrite(){await toClass();play('present');await tr6('kR-00');
  const pool=[...ORDER6.map(k=>[W6[k],fi6(k)]),...W7.map(w=>[w.sv,w.fi]),...VK.map(k=>['jag '+V8[k].sv,'minä '+k]),...CK.map(k=>[COL9[k][1],k]),['Hjälp!','Apua!'],['Vänta!','Odota!'],['rätt','oikein'],['nästan','melkein'],['Fint!','Hienoa!'],['Förlåt!','Anteeksi!'],['Varsågod!','Ole hyvä!'],['Vi ses i morgon!','Nähdään huomenna!'],['Välkommen!','Tervetuloa!'],['Det gör inget.','Ei se mitään.']];
  let right=0;const L=shuffle(pool).slice(0,15);for(const [sv,fi] of L){await say(rnd(['kR-05','kR-04','kR-03']),{sub:false});const t=await typeIt([fi,fi.replace(/[!.?,]/g,'')],'Skriv på finska: '+sv);showWord(fi,sv);if(!t)right++;addPaws(t?1:3);if(!t)await praise();else await tr6('kR-06')}
  showWord(right+' / 15','rätt på första försöket',3500);await sleep(1200);play(right>=9?'jump':'happy');await tr6(right>=9?'kR-09':'kR-06');await tr6('kR-10')}
const PARTSR=[{n:'Tärningsspelet',d:'Som på sidan 49',f:cRepeat},{n:'Skrivprovet',d:'Skriv femton ord på finska',f:cRepeatWrite}];
/* ---------- more test practice (2026-10-26): dictation, sentence building, fill the gap, your hard words ---------- */
const DICT=()=>[...ORDER6.map(k=>['kw-'+fi6(k),fi6(k),W6[k]]),...W7.map((w,i)=>['k7-'+String(27+i).padStart(2,'0'),w.fi,w.sv]),
  ...VK.map(k=>[vShort(k),'minä '+k,'jag '+V8[k].sv]),...CK.map(k=>[cLine(k),k,COL9[k][1]]),
  ['k10-05','Päivää!','God dag!'],['k10-07','Mitä kuuluu?','Hur mår du?'],['k10-08','Hyvää, kiitos!','Bra, tack!'],['k10-31','Nähdään huomenna!','Vi ses i morgon!'],['k10-13','Kiva tavata!','Roligt att träffas!'],
  ['k10-33','Näkemiin!','Adjö!'],['k10-16','Sopii!','Det passar!'],['k6-06','Mikä tämä on?','Vad är det här?'],['k6-09','Niin on!','Så är det!'],['k7-06','Minä tiedän!','Jag vet!'],['k7-07','Minä osaan monta sanaa!','Jag kan många ord!'],
  ['k7-01','Apua! Apua!','Hjälp! Hjälp!'],['k7-46','Sinä arvasit!','Du gissade rätt!'],['k9-23','Onko banaani sininen?','Är bananen blå?'],['k9-22','Onko kurkku vihreä?','Är gurkan grön?'],['k9-34','Ei ole!','Nej!']].filter(x=>has6(x[0]));
async function rDictation(){await toClass();play('present');await tr6('kR-00');ask('Lyssna och skriv det Siili säger – på finska!');await sleep(1800);ask('');
  let right=0;const L=shuffle(DICT()).slice(0,14);
  for(const [id,fi,sv] of L){const rep=()=>say(id,{sub:false});await rep();const hb=$('#hint');hb.style.display='block';hb.textContent='🔊';hb.onclick=rep;
    const t=await typeIt([fi,fi.replace(/[!?.,]/g,'')],'Vad säger Siili? Skriv det på finska. (🔊 = lyssna igen)');hb.style.display='none';hb.textContent='?';
    showWord(fi,sv,2000);if(!t){right++;addPaws(3);await praise()}else{addPaws(1);await say(rnd(['kR-07','kR-06']))}}
  showWord(right+' / '+L.length,'rätt direkt',3500);await sleep(1500);await tr6(right>=L.length-3?'kR-09':'kR-06')}
const SENT=[['Minä osaan monta sanaa.','Jag kan många ord.','k7-07'],['Mikä tämä on?','Vad är det här?','k6-06'],['Se ei ole ihan oikein.','Det är inte helt rätt.','k7-34'],['Onko banaani sininen?','Är bananen blå?','k9-23'],
  ['Sitruuna on keltainen.','Citronen är gul.',null],['Nähdään huomenna!','Vi ses i morgon!','k10-31'],['Tässä, ole hyvä!','Här, varsågod!','k10-11'],['Nyt on sinun vuorosi.','Nu är det din tur.','k7-63'],
  ['Minä luen kirjaa.','Jag läser en bok.','k8-15'],['Kurkku on vihreä ja pitkä.','Gurkan är grön och lång.','k6-35'],['Hyvää huomenta kaikille!','God morgon allihop!','k6-03'],['Tämä on hyvä peli.','Det här är ett bra spel.',null],
  ['Minä istun tuolilla.','Jag sitter på en stol.','k8-17'],['Ei ole, se on oranssi.','Nej, den är orange.','k9-36'],['Mitä sinä teet?','Vad gör du?','k7-58'],['Hyvää, kiitos!','Bra, tack!','k10-08']];
async function rSentences(){await toLib();play('present');ask('Bygg meningen på finska! Klicka på orden i rätt ordning.');await sleep(1500);
  for(const [fi,sv,id] of shuffle(SENT).slice(0,10)){const words=fi.replace(/[.!?,]/g,'').split(' ');const extra=rnd(['ja','on','minä','se','ei','sinä','olen','hyvä'].filter(w=>!words.includes(w)));
    const box_=$('#search6'),bd=box_.querySelector('.board');let built=[];let tries=0;
    const draw=()=>{bd.innerHTML=`<div style="font:800 22px Nunito;margin-bottom:8px">${sv}</div><div style="min-height:54px;font:800 32px 'Baloo 2';color:var(--rust);border-bottom:3px dashed #e0c9a6;margin-bottom:12px">${built.map(i=>pool[i]).join(' ')||'&nbsp;'}</div>`+
      `<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">${pool.map((w,i)=>`<button data-i="${i}" ${built.includes(i)?'disabled':''} style="all:unset;cursor:pointer;padding:8px 14px;border-radius:12px;background:${built.includes(i)?'#eee':'#ffd36b'};font:800 26px 'Baloo 2';opacity:${built.includes(i)?.35:1}">${w}</button>`).join('')}</div>`+
      `<div style="margin-top:10px"><button id="undo6" style="all:unset;cursor:pointer;padding:6px 12px;border-radius:10px;background:#f6e6cf;font:800 16px Nunito">↩ Ångra</button></div>`};
    const pool=shuffle([...words,extra]);box_.style.display='flex';draw();
    await new Promise(done=>{const click=e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='undo6'){built.pop();draw();return}const i=+b.dataset.i;if(built.includes(i))return;built.push(i);draw();
        if(built.length===words.length){const got=built.map(i=>pool[i]).join(' ');if(got.toLowerCase()===words.join(' ').toLowerCase()){bd.removeEventListener('click',click);done()}else{tries++;sfx('wrong',.4);setTimeout(()=>{built=[];draw()},700)}}};
      bd.addEventListener('click',click);if(AUTO){bd.removeEventListener('click',click);done()}});
    box_.style.display='none';play('happy');showWord(fi,sv,2200);addPaws(tries?1:3);if(id&&has6(id))await say(id,{sub:false});else await praise()}}
const GAPS=[['Minä ___ monta sanaa.','osaan','kan'],['Se ei ole ihan ___.','oikein','rätt'],['Onko kurkku ___?','vihreä','grön'],['Sitruuna on ___.','keltainen','gul'],['Nähdään ___!','huomenna','i morgon'],
  ['Tässä, ole ___!','hyvä','god (varsågod)'],['Ei se ___.','mitään','inget'],['Mitä ___?','kuuluu','hur mår du'],['Hyvää ___ kaikille!','huomenta','morgon'],['Mikä ___ on?','tämä','det här'],['Nyt on sinun ___.','vuorosi','tur'],
  ['Minä ___ kirjaa.','luen','läser'],['Minä ___ tuolilla.','istun','sitter'],['Minä ___. Hyppy, hyppy!','hypin','hoppar'],['Kiitos ___!','paljon','så mycket'],['___, minä autan!','Odota','Vänta'],
  ['Appelsiini on ___.','oranssi','orange'],['Banaani on ___.','keltainen','gul'],['Tomaatti on ___.','punainen','röd'],['Hyvää, ___!','kiitos','tack'],['___ tavata!','Kiva','Roligt'],['Minä ___ (jag vet).','tiedän','vet']];
async function rGaps(){await toPark();play('think');ask('Vilket ord fattas? Skriv det på finska.');await sleep(1500);ask('');
  for(const [s_,w,hint] of shuffle(GAPS).slice(0,12)){const t=await typeIt([w,w.toLowerCase()],s_.replace('___','______')+'   ('+hint+')');showWord(s_.replace('___',w),'',2200);addPaws(t?1:3);if(!t)await praise();else await tr6('kR-07')}}
async function rHard(){await toClass();const M=Object.entries(st.miss||{}).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  const all=[...DICT().map(x=>[x[1],x[2],x[0]]),...RQ.map(x=>[x[1],x[0],null])];const find=fi=>all.find(x=>fold(x[0])===fold(fi));
  let L=M.map(find).filter(Boolean);const fill=shuffle(all.filter(x=>!L.includes(x)));while(L.length<10)L.push(fill.pop());L=L.slice(0,12);
  play('present');ask(M.length?`Dina svåra ord – ${M.length} st som du fick försöka igen på.`:'Inga svåra ord än – här är en blandning!');await sleep(2200);ask('');
  for(const [fi,sv,id] of L){const t=await typeIt([fi,fi.replace(/[!?.,]/g,'')],'Skriv på finska: '+sv);showWord(fi,sv,2000);if(id&&has6(id))await say(id,{sub:false});addPaws(t?1:3);if(!t)await praise()}
  const left=Object.keys(st.miss||{}).length;showWord(left?left+' svåra ord kvar':'Inga svåra ord kvar!','',3000);await sleep(1200);await tr6(left?'kR-06':'kR-09')}
PARTSR.push({n:'Hör och skriv',d:'Siili säger, du skriver',f:rDictation},{n:'Bygg meningen',d:'Ord i rätt ordning',f:rSentences},{n:'Vilket ord fattas?',d:'Fyll i luckan',f:rGaps},{n:'Dina svåra ord',d:'Ord du fick öva extra på',f:rHard});

CHS.push({n:'6 · Koulussa',h:'Koulussa',sub:'Kapitel 6 · Klassrummet på kvällen',P:PARTS6,key:'done6'},{n:'7 · Läksy',h:'Läksy',sub:'Kapitel 7 · Stadsbiblioteket',P:PARTS7,key:'done7'},
  {n:'8 · Minä teen',h:'Minä teen',sub:'Kapitel 8 · Gymnastiksalen',P:PARTS8,key:'done8'},{n:'9 · Färger',h:'Onko banaani sininen?',sub:'Kapitel 9 · Parken i höstfärger',P:PARTS9,key:'done9'},
  {n:'10 · Nähdään!',h:'Nähdään huomenna!',sub:'Kapitel 10 · Siilis kalas',P:PARTS10,key:'done10'},{n:'⭐ Provet',h:'Inför provet',sub:'Repetition av kapitel 6–10',P:PARTSR,key:'doneR'});
for(const k of['done6','done7','done8','done9','done10','doneR'])st[k]??=[];
CHS[0].n='1 · Jee!';CHS[1].n='2 · O ja U';
if(AUTO){st.snd=false;say0=(id)=>{if(!LINES[id])console.warn('MISSING LINE',id);return Promise.resolve()};window.__run=async(ch,i)=>{await ready;try{setQuality(QSTEPS.length-1)}catch(e){}curCh=ch;$('#menu').classList.add('hidden');$('#start')?.classList.add('hidden');try{await PARTS_OF(ch)[i].f();return 'ok'}catch(e){console.error('PART FAIL',ch,i,e.stack);return 'fail '+e.message}};}
function PARTS_OF(ch){return CHS[ch].P}
if(AUTO)window.__box=()=>{const r=[];clsS.traverse(o=>{if(o.userData?.deskM){const b=new THREE.Box3().setFromObject(o);r.push([...b.min.toArray(),...b.max.toArray()].map(v=>+v.toFixed(2)))}});return r};
if(AUTO)window.__view=async(n,q=0)=>{await ready;setQuality(q);$('#menu').classList.add('hidden');$('#start')?.classList.add('hidden');const T={cls:toClass,lib:toLib,gym:toGym,park:toPark,party:toParty,play:toPlay,apple:toApple};await T[n]();if(n==='party'){for(const g of[sqG,owlG,cakeG,giftG,bouqG])if(g)g.visible=true}if(n==='park')scarves.forEach((m,i)=>m.material.color.set(['#c8352b','#f2c230','#2f62b8','#3f9a4a','#8a5ab8'][i]));if(n==='lib'&&!boardG)boardG=await placeGLB6(libS,'boardgame.glb',{x:.3,y:0,z:-.05,w:.42},()=>null);play('idle');return 'ok'};
