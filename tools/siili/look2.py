import bpy, math, sys
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_built.blend')

sc=bpy.context.scene
mesh=bpy.data.objects[[o.name for o in sc.objects if o.type=='MESH' and o.name not in ('mouth','eye_r','eye_l')][0]]; arm=[o for o in sc.objects if o.type=='ARMATURE'][0]
import mathutils
bb=[mesh.matrix_world@mathutils.Vector(c) for c in mesh.bound_box]; mn=mathutils.Vector([min(v[i] for v in bb) for i in range(3)]); mx=mathutils.Vector([max(v[i] for v in bb) for i in range(3)])
ctr=(mn+mx)/2; h=mx.z-mn.z; print('size',mx-mn)
cam=bpy.data.objects.new('cam',bpy.data.cameras.new('c')); sc.collection.objects.link(cam); sc.camera=cam; cam.data.lens=60
w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[0].default_value=(.25,.25,.28,1); w.node_tree.nodes['Background'].inputs[1].default_value=1.0
for e,rot in [(3,(50,0,30)),(1.2,(60,0,200))]:
    l=bpy.data.objects.new('l',bpy.data.lights.new('l','SUN')); l.data.energy=e; l.rotation_euler=[math.radians(a) for a in rot]; sc.collection.objects.link(l)
sc.render.engine='BLENDER_EEVEE'
sc.render.resolution_x=640; sc.render.resolution_y=720
def shot(name,yaw,action=None,frame=1):
    if action:
        arm.animation_data.action=bpy.data.actions[action]; sc.frame_set(frame)
    d=h*2.6; cam.location=ctr+mathutils.Vector((math.sin(yaw)*d,-math.cos(yaw)*d,h*.15))
    dirv=ctr-cam.location; cam.rotation_euler=dirv.to_track_quat('-Z','Y').to_euler()
    sc.render.filepath='/home/claude/siili-work/r/b_'+name+'.png'; bpy.ops.render.render(write_still=True)
print([a.name for a in bpy.data.actions][:30])
acts=[a.name for a in bpy.data.actions]
shot('front',0,'idle',1); shot('back',math.pi,'idle',1); shot('side',math.pi/2,'idle',1); shot('q',2.4,'idle',1)
raise SystemExit
idle=[a for a in acts if 'Idle_9' in a][0]
shot('front',0,idle,1); shot('back',math.pi,idle,1); shot('side',math.pi/2,idle,1)
wave=[a for a in acts if 'Wave' in a][0]; shot('wave',0.4,wave,30)
talk=[a for a in acts if 'Hands_Open' in a][0]; shot('talk',0.3,talk,40)
