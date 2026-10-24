import bpy, bmesh, mathutils
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
for n in ('mouth','eye_r','eye_l'):
    o=bpy.data.objects.get(n)
    if o: bpy.data.objects.remove(o)
body=bpy.data.objects['char1']; arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
inv=body.matrix_world.inverted()
from mathutils.bvhtree import BVHTree
tm=body.data.copy(); tm.transform(body.matrix_world)
BVH=BVHTree.FromPolygons([v.co.copy() for v in tm.vertices],[tuple(p.vertices) for p in tm.polygons])
def make(name,box,nx,nz):
    x0,x1,z0,z1=box
    me=bpy.data.meshes.new(name); bm=bmesh.new(); uv=bm.loops.layers.uv.new('UVMap')
    vs=[[bm.verts.new(inv@mathutils.Vector((x0+(x1-x0)*i/nx,-0.6,z0+(z1-z0)*k/nz))) for i in range(nx+1)] for k in range(nz+1)]
    for k in range(nz):
        for i in range(nx):
            f=bm.faces.new((vs[k][i],vs[k][i+1],vs[k+1][i+1],vs[k+1][i]))
            for l,(ii,kk) in zip(f.loops,[(i,k),(i+1,k),(i+1,k+1),(i,k+1)]): l[uv].uv=(ii/nx,kk/nz)
    bm.to_mesh(me); bm.free()
    o=bpy.data.objects.new(name,me); bpy.context.scene.collection.objects.link(o); o.parent=body.parent; o.matrix_world=body.matrix_world.copy()
    # project each point onto the front of the face (first hit from the front), then lift it a little
    hits=0
    for v in me.vertices:
        w=o.matrix_world@v.co; loc,nrm,idx,dist=BVH.ray_cast(mathutils.Vector((w.x,-2.0,w.z)),mathutils.Vector((0,1,0)))
        if loc is not None and loc.y<-0.25: v.co=inv@(loc+nrm.normalized()*0.004); hits+=1
        else: v.co=inv@mathutils.Vector((w.x,-0.38,w.z))
    print(name,'hits',hits,len(me.vertices))
    bpy.context.view_layer.objects.active=o; o.select_set(True)
    dt=o.modifiers.new('dt','DATA_TRANSFER'); dt.object=body; dt.use_vert_data=True; dt.data_types_verts={'VGROUP_WEIGHTS'}; dt.vert_mapping='POLYINTERP_NEAREST'
    bpy.ops.object.datalayout_transfer(modifier='dt'); bpy.ops.object.modifier_apply(modifier='dt')
    o.modifiers.new('Armature','ARMATURE').object=arm
    m=bpy.data.materials.new(name); m.use_nodes=True; m.blend_method='BLEND'; m.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value=0.0; me.materials.append(m)
    o.select_set(False); ys=[(o.matrix_world@v.co).y for v in me.vertices]; print(name,'y range',min(ys),max(ys),'groups',len(o.vertex_groups))
make('mouth',(-.15,.15,.595,.705),36,14)
make('eye_r',(-.184,-.044,.727,.857),20,18)
make('eye_l',(.044,.184,.727,.857),20,18)
bpy.ops.wm.save_as_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
bpy.ops.export_scene.gltf(filepath='/home/claude/siili-work/siili-biped.glb',export_format='GLB',export_image_format='JPEG',export_jpeg_quality=85,export_animation_mode='ACTIONS')
print('done')
