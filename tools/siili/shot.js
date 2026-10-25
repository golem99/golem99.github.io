const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'},args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:960,height:540},ignoreHTTPSErrors:true});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8765/appar/siili/?robot',{waitUntil:'domcontentloaded',timeout:120000});
 for(const n of (process.argv[2]||'cls,lib,gym,park,party').split(',')){const r=await p.evaluate(([n,q])=>window.__view(n,q),[n,+(process.env.Q||0)]).catch(e=>'ERR '+e.message);
   await p.evaluate(()=>{document.querySelectorAll('#ui > *:not(canvas)').forEach(e=>e.style.visibility='hidden')});await p.waitForTimeout(25000);
   try{await p.screenshot({path:`/home/claude/siili-work/view-${n}.jpg`,quality:85,timeout:240000});console.log(n,r)}catch(e){console.log(n,'noshot')}}
 console.log(errs.join('\n'));await b.close()})();
