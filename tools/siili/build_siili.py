import bpy, bmesh, numpy as np, math
from PIL import Image, ImageDraw
bpy.ops.wm.open_mainfile(filepath='/home/claude/siili-work/siili_src.blend')
body=[o for o in bpy.data.objects if o.type=='MESH'][0]; arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
me=body.data; mw=body.matrix_world
img=me.materials[0].node_tree.nodes['Image Texture'].image if 'Image Texture' in me.materials[0].node_tree.nodes else [i for i in bpy.data.images if i.size[0]>0][0]
W,H=img.size; px=np.array(img.pixels[:],dtype=np.float32).reshape(H,W,4)  # bottom-up rows
uv=me.uv_layers.active.data
gi={g.name:g.index for g in body.vertex_groups}
def wt(v,names): return sum(g.weight for g in v.groups if body.vertex_groups[g.group].name in names)
armg={'mixamorig:LeftArm','mixamorig:LeftForeArm','mixamorig:RightArm','mixamorig:RightForeArm'}
backM=Image.new('L',(W,H),0); armM=Image.new('L',(W,H),0); db=ImageDraw.Draw(backM); da=ImageDraw.Draw(armM)
nb=na=0
for p in me.polygons:
    n=(mw.to_3x3()@p.normal).normalized(); c=mw@p.center
    pts=[(uv[li].uv[0]*W,(1-uv[li].uv[1])*H) for li in p.loop_indices]
    if (c.y>0.02 or n.y>0.2) and c.z>0.3: db.polygon(pts,fill=255); nb+=1
    elif n.y<-0.3 and sum(wt(me.vertices[v],armg) for v in p.vertices)/len(p.vertices)>0.5: da.polygon(pts,fill=255); na+=1
print('faces back',nb,'arm',na)
bm=np.array(backM)[::-1]>0; am=np.array(armM)[::-1]>0
rgb=px[...,:3]; lum=rgb@np.array([.299,.587,.114],dtype=np.float32)
# back: light flecks between the quills become dark chocolate brown, keeping a little texture
dark=np.array([.20,.11,.06],dtype=np.float32)
sel=bm&(lum>.38)
k=np.clip((lum[sel]-.38)/.3,0,1)[:,None]
rgb[sel]=rgb[sel]*(1-k*.85)+dark*(k*.85)*(.8+.4*lum[sel][:,None])
# arms: brown specks on the cream fur become cream
cream=np.median(rgb[am&(lum>.6)],axis=0) if (am&(lum>.6)).any() else np.array([.85,.78,.7])
small=Image.fromarray((np.clip(lum,0,1)*255).astype(np.uint8)).resize((W//4,H//4))
from PIL import ImageFilter
med=np.array(small.filter(ImageFilter.MedianFilter(7)).resize((W,H)),dtype=np.float32)/255
sa=am&(lum<.5)&(med>.58)
rgb[sa]=cream*(.92+.16*np.random.rand(sa.sum(),1)).astype(np.float32)
print('back px',sel.sum(),'arm px',sa.sum(),'cream',cream)
px[...,:3]=rgb; img.pixels.foreach_set(px.ravel()); img.update()
# sample the face fur colour around the mouth for the decal
print('FACE')
# --- decals: mouth and eyes, cut as thin copies of the face surface with their own UVs ---
def decal(name,test,box):
    bpy.ops.object.select_all(action='DESELECT'); bpy.context.view_layer.objects.active=body; body.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT'); bme=bmesh.from_edit_mesh(me); bme.faces.ensure_lookup_table()
    for v in bme.verts: v.select=False
    for e in bme.edges: e.select=False
    cnt=0; M3=mw.to_3x3()
    for f in bme.faces:
        c=mw@f.calc_center_median(); n=(M3@f.normal).normalized()
        f.select= n.y<-0.3 and c.y<-0.3 and test(c); cnt+=f.select
    bme.select_flush(True); bmesh.update_edit_mesh(me); bpy.ops.object.mode_set(mode='OBJECT'); bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.duplicate(); bpy.ops.mesh.separate(type='SELECTED'); bpy.ops.object.mode_set(mode='OBJECT')
    d=[o for o in bpy.context.selected_objects if o!=body][0]; d.name=name; d.data.name=name
    x0,x1,z0,z1=box; dw=d.matrix_world
    for v in d.data.vertices:
        w=dw@v.co; v.co=dw.inverted()@(w+ (dw.to_3x3()@v.normal).normalized()*0.005)
    u=d.data.uv_layers.active.data
    for poly in d.data.polygons:
        for li in poly.loop_indices:
            w=dw@d.data.vertices[d.data.loops[li].vertex_index].co
            u[li].uv=((w.x-x0)/(x1-x0),(w.z-z0)/(z1-z0))
    m=bpy.data.materials.new(name); m.use_nodes=True; m.blend_method='BLEND'; m.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value=0.0; d.data.materials.clear(); d.data.materials.append(m)
    print('decal',name,cnt,'faces'); return d
mouth=decal('mouth',lambda c: -.15<c.x<.15 and .595<c.z<.705 and not (abs(c.x)<.05 and c.z>.672),(-.15,.15,.595,.705))
eyeR=decal('eye_r',lambda c: -.184<c.x<-.044 and .727<c.z<.857,(-.184,-.044,.727,.857))
eyeL=decal('eye_l',lambda c: .044<c.x<.184 and .727<c.z<.857,(.044,.184,.727,.857))
# decimate the body
bpy.ops.object.select_all(action='DESELECT'); bpy.context.view_layer.objects.active=body; body.select_set(True)
dm=body.modifiers.new('dec','DECIMATE'); dm.ratio=0.36
while body.modifiers.find('dec')>0: bpy.ops.object.modifier_move_up(modifier='dec')
bpy.ops.object.modifier_apply(modifier='dec')
img.scale(2048,2048)
names={'Idle_9':'idle','Walking':'walk','Running':'run','Look_Around_Dumbfounded':'sniff','Victory_Cheer':'happy','Agree_Gesture':'nod','Shrug':'shake','Wave_One_Hand':'wave','Idle_8':'scared','Confused_Scratch':'think','Regular_Jump':'jump','Clapping_Run':'clap','Formal_Bow':'bow','Half_Squat_with_Thumb_Up':'thumbs','Hand_on_Hip_Gesture':'point','Listening_Gesture':'listen','Talk_with_Hands_Open':'talk','Talk_with_Left_Hand_Raised':'talk2','Talk_with_Right_Hand_Open':'present','Sit_to_Stand_Transition_M':'sitstand'}
for a in bpy.data.actions:
    for k,v in names.items():
        if a.name.startswith(k): a.name=v
bpy.ops.wm.save_as_mainfile(filepath='/home/claude/siili-work/siili_built.blend')
bpy.ops.export_scene.gltf(filepath='/home/claude/siili-work/siili-biped.glb',export_format='GLB',export_image_format='JPEG',export_jpeg_quality=85,export_animation_mode='ACTIONS')
print('done')
