import numpy as np
from PIL import Image
S={1:np.asarray(Image.open('/mnt/user-data/uploads/Math Monsters/Meshy_AI_hedgehog_expressions_sheet_1.png').convert('RGB')).astype(np.float32),
   2:np.asarray(Image.open('/mnt/user-data/uploads/Math Monsters/Meshy_AI_hedgehog_expressions_sheet_2.png').convert('RGB')).astype(np.float32)}
F={'s1f1':(1,(71.5,482),(151,482),(108.5,508.5)),'s1f2':(1,(276,479),(351,477),(312,507)),'s1f3':(1,(473,479),(550,479),(512,502)),
   's1f5':(1,(891,477),(962,469),(927,507)),'s2f1':(2,(72,490),(148,490),(110,515)),'s2f3':(2,(474,484),(550,484),(512,508)),
   's2f4':(2,(676,513),(750,513),(712,537)),'s2f5':(2,(875,512),(950,512),(914,531))}
MOUTH=[('O','s1f2'),('A','s2f1'),('laugh','s1f3'),('E','s2f3'),('sad','s2f4'),('hmm','s1f5')]
EYES=[('closed','s1f1'),('happy','s1f3'),('wow','s1f2'),('curious','s1f5'),('sad','s2f4'),('sleepy','s2f5')]
FUR_M=np.array([212,196,186.]);FUR_E=np.array([220,212,206.])
def sample(img,xs,ys):
    h,w,_=img.shape;x0=np.clip(np.floor(xs).astype(int),0,w-2);y0=np.clip(np.floor(ys).astype(int),0,h-2);fx=(xs-x0)[...,None];fy=(ys-y0)[...,None]
    return img[y0,x0]*(1-fx)*(1-fy)+img[y0,x0+1]*fx*(1-fy)+img[y0+1,x0]*(1-fx)*fy+img[y0+1,x0+1]*fx*fy
def smooth(a,b,x): t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)
def cell(face,box,cw,ch,mfeat,sfeat_fn,maskfn,fur,k=.86):
    sh,el,er,mo=F[face];img=S[sh];s=k*.228/np.hypot(er[0]-el[0],er[1]-el[1])
    fx,fy=sfeat_fn(el,er,mo);mx,mz=mfeat
    x0,x1,z0,z1=box;X,Z=np.meshgrid(np.linspace(x0,x1,cw),np.linspace(z1,z0,ch))
    rgb=sample(img,fx+(X-mx)/s,fy-(Z-mz)/s)
    a=maskfn(X,Z)
    lum=rgb@[.299,.587,.114];ring=(a>.3)&(a<.9)&(lum>140)
    gain=fur/np.median(rgb[ring],axis=0) if ring.sum()>20 else np.ones(3)
    rgb=np.clip(rgb*gain,0,255)
    return np.dstack([rgb,a*255]).astype(np.uint8)
MB=(-.15,.15,.595,.705)
def mmask(X,Z):
    e=np.sqrt((X/.15)**2+((Z-.64)/.06)**2);a=1-smooth(.72,1.0,e)
    n=np.sqrt((X/.052)**2+((Z-.705)/.034)**2);return a*smooth(.85,1.25,n)
cells=[cell(f,MB,512,188,(0,.705),lambda el,er,mo:mo,mmask,FUR_M) for _,f in MOUTH]
Image.fromarray(np.hstack(cells)).save('face-mouth.png')
for side,box,ctr,pick in [('eye_r',(-.184,-.044,.727,.857),(-.114,.792),lambda el,er,mo:el),('eye_l',(.044,.184,.727,.857),(.114,.79),lambda el,er,mo:er)]:
    def emask(X,Z,c=ctr): e=np.sqrt(((X-c[0])/.07)**2+((Z-c[1])/.064)**2);return 1-smooth(.78,1.0,e)
    cells=[cell(f,box,256,238,ctr,pick,emask,FUR_E,k=.82) for _,f in EYES]
    Image.fromarray(np.hstack(cells)).save(f'face-{side}.png')
print('mouth states',[m for m,_ in MOUTH]);print('eye states',[e for e,_ in EYES])
