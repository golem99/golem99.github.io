import bpy, bmesh, mathutils
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath='/mnt/user-data/uploads/Math Monsters/Meshy_AI_hedgehog_quad_rigged_All_Animations.glb')
mesh=[o for o in bpy.data.objects if o.type=='MESH'][0]; arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
arm.animation_data.action=None
for pb in arm.pose.bones: pb.location=(0,0,0); pb.rotation_quaternion=(1,0,0,0); pb.rotation_euler=(0,0,0); pb.scale=(1,1,1)
bpy.context.view_layer.update()
mw=mesh.matrix_world; vs=[mw@v.co for v in mesh.data.vertices]
mn=[min(v[i] for v in vs) for i in range(3)]; mx=[max(v[i] for v in vs) for i in range(3)]
print('bbox',mn,mx)
hf=arm.matrix_world@arm.data.bones['headfront'].head_local; hd=arm.matrix_world@arm.data.bones['mixamorig:Head'].head_local
print('headfront',hf,'head',hd)
# frontmost vertex in head region
head=[v for v in vs if v.z>hd.z]
print('front y min',min(v.y for v in head),'max',max(v.y for v in head))
nose=min(head,key=lambda v:v.y); print('nose (min y)',nose)
print('mats',[m.name for m in mesh.data.materials], 'uvs',[u.name for u in mesh.data.uv_layers], 'verts',len(vs),'polys',len(mesh.data.polygons))
img=[i for i in bpy.data.images if i.size[0]>0]; print([(i.name,i.size[:]) for i in img])
bpy.ops.wm.save_as_mainfile(filepath='/home/claude/siili-work/siili_src.blend')
