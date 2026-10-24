import bpy,bmesh
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_src.blend')
body=[o for o in bpy.data.objects if o.type=='MESH'][0]; me=body.data; mw=body.matrix_world
print('mw',mw)
c=0;cn=0
for p in me.polygons:
    w=mw@p.center
    if -.14<w.x<.14 and .632<w.z<.705:
        c+=1; n=mw.to_3x3()@p.normal
        if n.y<-.3: cn+=1
print('inbox',c,'front',cn)
ys=[ (mw@p.center) for p in me.polygons if -.02<(mw@p.center).x<.02]
print('sample z range', min(v.z for v in ys), max(v.z for v in ys), 'y',min(v.y for v in ys))
