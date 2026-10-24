# Fill the black gaps between texture islands in Meshy models, so mipmaps don't bleed black dots into the surface.
import json,struct,sys,io,numpy as np
from PIL import Image, ImageFilter
def bleed(b):
    im=Image.open(io.BytesIO(b));mode=im.mode;rgb=np.asarray(im.convert('RGB')).astype(np.int16)
    empty=(rgb.sum(axis=2)<24)
    if empty.mean()<.002: return None,0
    cur=Image.fromarray(rgb.astype(np.uint8));m=empty.copy()
    for _ in range(12):
        big=np.asarray(cur.filter(ImageFilter.MaxFilter(3))).astype(np.int16)
        a=np.asarray(cur).astype(np.int16).copy();a[m]=big[m];cur=Image.fromarray(a.astype(np.uint8));m=m&(a.sum(axis=2)<24)
    out=io.BytesIO();cur.save(out,'JPEG',quality=90) if b[:4]!=b'\x89PNG' else cur.save(out,'PNG');return out.getvalue(),empty.mean()
for f in sys.argv[1:]:
    d=open(f,'rb').read();l=struct.unpack('<I',d[12:16])[0];j=json.loads(d[20:20+l]);bin0=28+l;blen=struct.unpack('<I',d[20+l:24+l])[0];B=d[bin0:bin0+blen]
    imgviews={im['bufferView'] for im in j.get('images',[]) if 'bufferView' in im};changed=0;parts=[];off=0
    for i,bv in enumerate(j['bufferViews']):
        chunk=B[bv.get('byteOffset',0):bv.get('byteOffset',0)+bv['byteLength']]
        if i in imgviews:
            nb,frac=bleed(chunk)
            if nb: chunk=nb;changed+=1;print(f,'view',i,'gaps %.1f%%'%(frac*100))
        pad=(-off)%4;parts.append(b'\0'*pad);off+=pad;bv['byteOffset']=off;bv['byteLength']=len(chunk);parts.append(chunk);off+=len(chunk)
    if not changed: print(f,'ok, nothing to fill');continue
    nbin=b''.join(parts);nbin+=b'\0'*((-len(nbin))%4);j['buffers'][0]['byteLength']=len(nbin)
    js=json.dumps(j,separators=(',',':')).encode();js+=b' '*((-len(js))%4)
    out=struct.pack('<III',0x46546C67,2,12+8+len(js)+8+len(nbin))+struct.pack('<II',len(js),0x4E4F534A)+js+struct.pack('<II',len(nbin),0x004E4942)+nbin
    open(f,'wb').write(out)
