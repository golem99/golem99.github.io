import sys
p=sys.argv[1];s=open(p).read();js=open(sys.argv[2]).read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a));s=s.replace(a,b)
R("/* ---------- loop ---------- */",js+"\n/* ---------- loop ---------- */")
R("st.done??=[];","st.done??=[]; st.done2??=[];")
# chapter-aware menu
i=s.index("function renderMenu(){");j=s.index("let running=false;",i)
s=s[:i]+"""function renderMenu(){const C=CHS[curCh];$('#menu h1').textContent=C.h;$('#menu h2').textContent=C.sub;
  let tabs=$('#chtabs');if(!tabs){tabs=document.createElement('div');tabs.id='chtabs';$('#doors').before(tabs)}
  tabs.innerHTML='';CHS.forEach((c,j)=>{const b=document.createElement('button');b.className='chtab'+(j===curCh?' on':'');b.textContent=c.n;b.onclick=()=>{curCh=j;st.ch=j;save();renderMenu()};tabs.append(b)});
  const done=st[C.key];const d=$('#doors');d.innerHTML='';C.P.forEach((p,i)=>{const open=i===0||done.includes(i-1)||done.includes(i);const b=document.createElement('button');b.className='door'+(done.includes(i)?' done':'')+(open?'':' locked');
  b.innerHTML=`<div class="n">${i+1}</div><div><b>${p.n}</b></div><div class="d">${p.d}</div>`;if(open)b.onclick=()=>{$('#menu').classList.add('hidden');runPart(i)};d.append(b)})}
"""+s[j:]
R("$('#part').textContent=`· ${i+1}. ${PARTS[i].n}`;try{await PARTS[i].f()}","const PP=CHS[curCh].P,DK=CHS[curCh].key;$('#part').textContent=`· ${i+1}. ${PP[i].n}`;try{await PP[i].f()}")
R("  if(!st.done.includes(i)){st.done.push(i);save()}\n  sfx('fanfare',.5);$('#doneT').textContent=`${PARTS[i].n} – klart!`;","  if(!st[DK].includes(i)){st[DK].push(i);save()}\n  sfx('fanfare',.5);$('#doneT').textContent=`${PP[i].n} – klart!`;")
R("const nn=scene===outS?","const nn=scene===harbS?.04:scene===outS?")
R("for(const S_ of[homeS,outS])","buildHarbor();for(const S_ of[homeS,outS,harbS])")
R(".door{all:unset;",".chtabs,#chtabs{display:flex;gap:8px;justify-content:center;margin:0 0 12px}.chtab{all:unset;cursor:pointer;padding:8px 14px;border-radius:999px;background:#f6e6cf;font:800 15px Nunito,sans-serif}.chtab.on{background:#c8643c;color:#fff8ec}\n.door{all:unset;")
# remember the chosen chapter

R("let curCh=0;","let curCh=st.ch??((st.done||[]).length>=6?1:0);")
open(p,'w').write(s)
