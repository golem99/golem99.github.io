import bpy, numpy as np
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_src.blend')
body=[o for o in bpy.data.objects if o.type=='MESH'][0]; me=body.data; mw=body.matrix_world
img=[i for i in bpy.data.images if i.size[0]>0][0]; W,H=img.size; px=np.array(img.pixels[:],dtype=np.float32).reshape(H,W,4)
uv=me.uv_layers.active.data
def avg(test):
    cs=[]
    for p in me.polygons:
        c=mw@p.center
        if test(c):
            for li in p.loop_indices:
                u,v=uv[li].uv; cs.append(px[int(v*(H-1)),int(u*(W-1)),:3])
    a=np.array(cs); return np.median(a,axis=0), len(cs)
print('fur_mouth',avg(lambda c: -.13<c.x<.13 and .66<c.z<.69 and abs(c.x)>.06 and c.y<-.3))
print('fur_eye',avg(lambda c: -.17<c.x<-.06 and .845<c.z<.86 and c.y<-.3))
print('cheek',avg(lambda c: .13<c.x<.18 and .68<c.z<.72 and c.y<-.3))
