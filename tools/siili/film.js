/* ---------- the intro as a film (2026-10-24) ----------
   If intro.mp4 is in the folder, the flight over Kristinestad plays as a film (it starts at once on "Börja",
   while the game loads behind it) and fades into the live scene at the stairs. Without the file, or if the
   film can't play, the live flight runs as before. ?film runs the live flight at full quality with nothing
   on screen, for recording the film. */
const FILM_SRC='intro.mp4';let filmP=null;
function startFilm(){if(filmP)return filmP;filmP=new Promise(done=>{
  const v=document.createElement('video');v.src=FILM_SRC;v.muted=true;v.playsInline=true;v.preload='auto';
  Object.assign(v.style,{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:40,background:'#2a211b',transition:'opacity .8s'});
  const title=document.createElement('div');title.innerHTML='<div style="font:800 min(14vw,160px) Baloo\\ 2,sans-serif;color:#fff6e8;text-shadow:0 6px 0 #c8643c,0 0 40px rgba(0,0,0,.35)">Siili</div><div style="font:700 26px Baloo\\ 2;color:#fff6e8;text-shadow:0 2px 8px rgba(0,0,0,.6)">Kapitel 1 · Jee!</div>';
  Object.assign(title.style,{position:'fixed',left:0,right:0,top:'22%',textAlign:'center',opacity:0,transition:'opacity 1.2s, transform 1.2s',transform:'scale(.9)',zIndex:41,pointerEvents:'none'});
  const skip=document.createElement('button');skip.textContent='Hoppa över ›';
  Object.assign(skip.style,{position:'fixed',right:'20px',bottom:'24px',zIndex:42,font:'800 16px Nunito',background:'rgba(255,246,232,.85)',border:0,borderRadius:'999px',padding:'10px 18px',cursor:'pointer'});
  let over=false;const end=async ok=>{if(over)return;over=true;skip.remove();title.style.opacity=0;
    if(ok){await ready.catch(()=>{});useScene(outS);cam.position.set(64.95,.3,40.75);camLook.set(64.6,.08,41.73);await sleep(120);v.style.opacity=0;await sleep(800)}
    v.remove();title.remove();done(ok)};
  v.onerror=()=>end(false);v.onended=()=>end(true);skip.onclick=()=>{flyCancel=true;end(true)};
  v.addEventListener('playing',()=>{setTimeout(()=>{title.style.opacity=1;title.style.transform='scale(1)'},1500);setTimeout(()=>{title.style.opacity=0},9000)},{once:true});
  document.body.append(v,title,skip);v.play().catch(()=>end(false));
  // the "Hoppa över" in the live intro also ends the film
  (function watch(){if(over)return;if(flyCancel)return end(true);requestAnimationFrame(watch)})()});
  return filmP}
