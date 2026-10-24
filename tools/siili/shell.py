import bpy, bmesh, math
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
[bpy.data.objects.remove(o) for o in list(bpy.data.objects) if o.name.startswith('quill_shell')]
body=[o for o in bpy.data.objects if o.type=='MESH' and o.name not in ('mouth','eye_r','eye_l')][0]; arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
print('body',body.name,'parent',body.parent and body.parent.name)
bpy.ops.object.select_all(action='DESELECT'); bpy.context.view_layer.objects.active=body; body.select_set(True)
bpy.ops.object.duplicate(); sh=bpy.context.active_object; sh.name='quill_shell'
for m in list(sh.modifiers):
    if m.type!='ARMATURE': sh.modifiers.remove(m)
arm_mod=[m for m in sh.modifiers if m.type=='ARMATURE']
for m in arm_mod: sh.modifiers.remove(m)
sh.vertex_groups.clear()
# close the holes: voxel remesh (in object scale, mesh is in cm-ish units *0.01)
rm=sh.modifiers.new('rm','REMESH'); rm.mode='VOXEL'; rm.voxel_size=1.6  # local units (object scale .01) -> 1.6cm
bpy.ops.object.modifier_apply(modifier='rm')
print('remeshed faces',len(sh.data.polygons))
# keep the back half only (behind the face and belly), above the feet
mw=sh.matrix_world
bm=bmesh.new(); bm.from_mesh(sh.data)
dele=[f for f in bm.faces if not ((mw@f.calc_center_median()).y>0.02 and (mw@f.calc_center_median()).z>0.22)]
bmesh.ops.delete(bm,geom=dele,context='FACES'); bm.to_mesh(sh.data); bm.free()
# pull it a little inward so it sits under the quills
for v in sh.data.vertices: v.co=v.co-v.normal*3.6
dec=sh.modifiers.new('d','DECIMATE'); dec.ratio=0.25; bpy.ops.object.modifier_apply(modifier='d')
print('shell faces',len(sh.data.polygons))
mat=bpy.data.materials.new('shell_dark'); mat.use_nodes=True; b=mat.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value=(.16,.085,.045,1); b.inputs['Roughness'].default_value=1
sh.data.materials.clear(); sh.data.materials.append(mat)
# skin weights from the body
dt=sh.modifiers.new('dt','DATA_TRANSFER'); dt.object=body; dt.use_vert_data=True; dt.data_types_verts={'VGROUP_WEIGHTS'}; dt.vert_mapping='POLYINTERP_NEAREST'
bpy.ops.object.datalayout_transfer(modifier='dt'); bpy.ops.object.modifier_apply(modifier='dt')
am=sh.modifiers.new('Armature','ARMATURE'); am.object=arm
print('groups',len(sh.vertex_groups))
bpy.ops.wm.save_as_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
bpy.ops.export_scene.gltf(filepath='/home/claude/siili-work/siili-biped.glb',export_format='GLB',export_image_format='JPEG',export_jpeg_quality=85,export_animation_mode='ACTIONS')
print('done')
