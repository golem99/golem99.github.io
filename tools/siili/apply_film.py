import sys
p=sys.argv[1];s=open(p).read();js=open(sys.argv[2]).read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
R("let flyCancel=false;async function flyIn(){flyCancel=false;",
  js+"\nlet flyCancel=false;async function flyIn(){const ok=await startFilm().catch(()=>false);filmP=null;if(ok)return;return flyLive()}\nasync function flyLive(){flyCancel=false;")
# start the film straight away on "Börja" (while the game is still loading); ?film = live flight for recording
R("$('#go').onclick=async()=>{st.snd=true;save();$('#bSnd').textContent='🔊';await ready;",
  "$('#go').onclick=async()=>{st.snd=true;save();$('#bSnd').textContent='🔊';const qs_=new URLSearchParams(location.search);"
  "if(qs_.has('film')){$('#start').classList.add('hidden');await ready;window.__noAuto=true;setQuality(0);document.querySelectorAll('#ui,#menu,#loading').forEach(e=>e.style.display='none');useScene(outS);outS.remove(siili);await sleep(1500);await flyLive();return}"
  "if(!st.done.includes(0)||qs_.has('intro')){setMusic('theme',false);startFilm()}await ready;")
open(p,'w').write(s)
