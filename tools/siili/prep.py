import bpy, sys
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath='/mnt/user-data/uploads/Math Monsters/Meshy_AI_hedgehog_quad_rigged_All_Animations.glb')
mesh=[o for o in bpy.data.objects if o.type=='MESH'][0]; arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
print('bones',[b.name for b in arm.data.bones])
bpy.context.view_layer.objects.active=mesh; mesh.select_set(True)
d=mesh.modifiers.new('dec','DECIMATE'); d.ratio=0.36
while mesh.modifiers.find('dec')>0: bpy.ops.object.modifier_move_up(modifier='dec')
bpy.ops.object.modifier_apply(modifier='dec')
print('tris', sum(len(p.vertices)-2 for p in mesh.data.polygons))
for img in bpy.data.images:
    if img.size[0]>2048: img.scale(2048,2048)
names={'Idle_9':'idle','Walking':'walk','Running':'run','Look_Around_Dumbfounded':'sniff','Victory_Cheer':'happy','Agree_Gesture':'nod','Shrug':'shake','Wave_One_Hand':'wave','Idle_8':'scared','Confused_Scratch':'think','Regular_Jump':'jump','Clapping_Run':'clap','Formal_Bow':'bow','Half_Squat_with_Thumb_Up':'thumbs','Hand_on_Hip_Gesture':'point','Listening_Gesture':'listen','Talk_with_Hands_Open':'talk','Talk_with_Left_Hand_Raised':'talk2','Talk_with_Right_Hand_Open':'present','Sit_to_Stand_Transition_M':'sitstand'}
for a in bpy.data.actions:
    for k,v in names.items():
        if a.name.startswith(k): a.name=v
print('actions',[a.name for a in bpy.data.actions])
bpy.ops.export_scene.gltf(filepath='/home/claude/siili-work/siili-biped.glb',export_format='GLB',export_image_format='JPEG',export_jpeg_quality=85,export_animation_mode='ACTIONS',export_apply=False)
