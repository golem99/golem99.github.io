import bpy, math
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_src.blend')
sc=bpy.context.scene
cam=bpy.data.objects.new('cam',bpy.data.cameras.new('c')); sc.collection.objects.link(cam); sc.camera=cam
cam.data.type='ORTHO'; cam.data.ortho_scale=0.4; cam.location=(0,-2,0.75); cam.rotation_euler=(math.radians(90),0,0)
w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[1].default_value=1.0
l=bpy.data.objects.new('l',bpy.data.lights.new('l','SUN')); l.data.energy=3; l.rotation_euler=(math.radians(80),0,0); sc.collection.objects.link(l)
sc.render.engine='BLENDER_EEVEE'; sc.render.resolution_x=800; sc.render.resolution_y=800
sc.render.filepath='/home/claude/siili-work/r/face.png'; bpy.ops.render.render(write_still=True)
