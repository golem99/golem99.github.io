import json,subprocess,numpy as np
from faster_whisper import WhisperModel
from rapidfuzz import fuzz
from align import norm
m=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=2)
L=json.load(open('lines6.json'));res={}
for k,v in L.items():
    raw=subprocess.run(['ffmpeg','-v','quiet','-i','out/'+k+'.mp3','-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout
    a=np.frombuffer(raw,np.int16).astype(np.float32)/32768
    lang='sv' if (k.endswith('s') or k.startswith('x')) else 'fi'
    segs,_=m.transcribe(a,language=lang,beam_size=1)
    t=' '.join(s.text for s in segs)
    sc=fuzz.ratio(' '.join(norm(t)),' '.join(norm(v['fi'])))
    res[k]=(sc,t)
json.dump(res,open('verify.json','w'),ensure_ascii=False)
for k,(sc,t) in sorted(res.items(),key=lambda x:x[1][0])[:40]:print(sc,k,'|',L[k]['fi'],'|',t)
