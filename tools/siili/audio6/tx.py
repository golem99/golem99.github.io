import glob,json,os
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=2)
for f in sorted(glob.glob('/mnt/user-data/uploads/Saga/Sagas App/*.mp3')):
    out=os.path.basename(f)[11:30]+('_'+('owl' if 'Ugglan' in f else 'sq' if 'Ekorren' in f else 'siili'))+'.json'
    if os.path.exists(out): continue
    import subprocess,numpy as np
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout
    a=np.frombuffer(raw,np.int16).astype(np.float32)/32768
    segs,info=m.transcribe(a,word_timestamps=True,vad_filter=False,beam_size=1)
    S=[{'s':s.start,'e':s.end,'t':s.text,'w':[(w.start,w.end,w.word) for w in s.words]} for s in segs]
    json.dump({'f':f,'lang':info.language,'segs':S},open(out,'w'),ensure_ascii=False)
    print(out,info.language,len(S),flush=True)
