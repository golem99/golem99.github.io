import bpy, math, sys
idx=int(sys.argv[-1]) if sys.argv[-1].isdigit() else 0
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
sc=bpy.context.scene
arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]; arm.animation_data.action=None
for pb in arm.pose.bones: pb.location=(0,0,0); pb.rotation_quaternion=(1,0,0,0); pb.rotation_euler=(0,0,0); pb.scale=(1,1,1)
for name,f in [('mouth','face-mouth.png'),('eye_r','face-eye_r.png'),('eye_l','face-eye_l.png')]:
    o=bpy.data.objects[name]; m=o.data.materials[0]; nt=m.node_tree; b=nt.nodes['Principled BSDF']
    im=nt.nodes.new('ShaderNodeTexImage'); im.image=bpy.data.images.load('/home/claude/siili-work/'+f)
    mp=nt.nodes.new('ShaderNodeMapping'); tc=nt.nodes.new('ShaderNodeTexCoord'); mp.inputs['Scale'].default_value=(1/6,1,1); mp.inputs['Location'].default_value=(idx/6,0,0)
    nt.links.new(tc.outputs['UV'],mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'],im.inputs['Vector']); nt.links.new(im.outputs['Color'],b.inputs['Base Color']); nt.links.new(im.outputs['Alpha'],b.inputs['Alpha'])
    m.blend_method='BLEND'
cam=bpy.data.objects.new('cam',bpy.data.cameras.new('c')); sc.collection.objects.link(cam); sc.camera=cam
cam.data.type='ORTHO'; cam.data.ortho_scale=0.4; cam.location=(0,-2,0.73); cam.rotation_euler=(math.radians(90),0,0)
w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[1].default_value=1.0
l=bpy.data.objects.new('l',bpy.data.lights.new('l','SUN')); l.data.energy=3; l.rotation_euler=(math.radians(80),0,0); sc.collection.objects.link(l)
sc.render.engine='BLENDER_EEVEE'; sc.render.resolution_x=500; sc.render.resolution_y=500
sc.render.filepath=f'/home/claude/siili-work/r/fc{idx}.png'; bpy.ops.render.render(write_still=True)
