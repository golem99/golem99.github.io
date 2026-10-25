const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY||process.env.https_proxy,bypass:'localhost,127.0.0.1'},args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const p=await b.newPage({viewport:{width:+(process.env.VW||320),height:+(process.env.VH||180)},ignoreHTTPSErrors:true});const errs=[];
 p.on('console',m=>{const t=m.text();if(/MISSING|FAIL|Error|error/.test(t)&&!/favicon|404/.test(t))errs.push(t.slice(0,300))});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 await p.goto('http://localhost:8765/appar/siili/?robot',{waitUntil:'domcontentloaded',timeout:120000});
 const parts=JSON.parse(process.argv[2]||'[[2,0]]');
 for(const [ch,i] of parts){const t0=Date.now();const r=await p.evaluate(([c,j])=>window.__run(c,j),[ch,i]);console.log('part',ch,i,r,((Date.now()-t0)/1000).toFixed(0)+'s');
   try{await p.screenshot({path:`/home/claude/siili-work/shot-${ch}-${i}.jpg`,quality:70,timeout:60000})}catch(e){console.log('noshot')}}
 console.log('ERRORS',errs.length);console.log([...new Set(errs)].join('\n'));await b.close()})();
