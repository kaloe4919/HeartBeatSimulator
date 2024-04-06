[_tb_system_call storage=system/_reaction_burden_medium.ks]

*reaction_burden_medium_event

[tb_start_tyrano_code]
;turn on event flags
[start_reaction_event]
[_tb_end_tyrano_code]

[tb_fuki_start  ]
[jump  storage="reaction_burden_medium.ks"  target="*from_touch_chest_event"  cond="f.waitSceneName=='touch_chest'"  ]
[jump  storage="reaction_burden_medium.ks"  target="*from_touch_chest_compress_event"  cond="f.waitSceneName=='touch_chest_compress'"  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "1",
isAsync: "true",
});
[endscript]

[live2d_expression  name="Kyoka"  expression="Painful3"  ]
[wait  time="500"  ]
[tb_eval  exp="f.random=Math.floor(Math.random()*(4-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="4"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction1"  cond="f.random==1"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction2"  cond="f.random==2"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction3"  cond="f.random==3"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction4"  cond="f.random==4"  ]
*random_reaction1

[tb_start_text mode=1 ]
#
やば……心臓ちょっと変かも……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_end"  ]
*random_reaction2

[tb_start_text mode=1 ]
#
心臓、変な動きしてる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_end"  ]
*random_reaction3

[tb_start_text mode=1 ]
#
また変な動きしてる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_end"  ]
*random_reaction4

[tb_start_text mode=1 ]
#
心臓、ちょっと無理させすぎたかな……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_end"  ]
*random_reaction_end

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "0",
isAsync: "true",
});
[endscript]

[jump  storage="touch.ks"  target="*touch_wait"  cond="f.waitSceneName=='touch'"  ]
[jump  storage="scene1.ks"  target="*scene1_wait"  ]
*from_touch_chest_event

[live2d_expression  name="Kyoka"  expression="Painful3"  ]
[tb_eval  exp="f.random=Math.floor(Math.random()*(4-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="4"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction1_touch_chest"  cond="f.random==1"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction2_touch_chest"  cond="f.random==2"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction3_touch_chest"  cond="f.random==3"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction4_touch_chest"  cond="f.random==4"  ]
*random_reaction1_touch_chest

[tb_start_text mode=1 ]
#
やば……心臓ちょっと変かも……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_end"  ]
*random_reaction2_touch_chest

[tb_start_text mode=1 ]
#
心臓、変な動きしてる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_end"  ]
*random_reaction3_touch_chest

[tb_start_text mode=1 ]
#
また変な動きしてる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_end"  ]
*random_reaction4_touch_chest

[tb_start_text mode=1 ]
#
心臓、変な動きしてるの先生にバレちゃってる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_end"  ]
*random_reaction_touch_chest_end

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="touch_chest.ks"  target="*touch_chest_wait"  ]
*from_touch_chest_compress_event

[live2d_expression  name="Kyoka"  expression="Painful7"  ]
[tb_eval  exp="f.random=Math.floor(Math.random()*(4-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="4"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction1_touch_chest_compress"  cond="f.random==1"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction2_touch_chest_compress"  cond="f.random==2"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction3_touch_chest_compress"  cond="f.random==3"  ]
[jump  storage="reaction_burden_medium.ks"  target="*random_reaction4_touch_chest_compress"  cond="f.random==4"  ]
*random_reaction1_touch_chest_compress

[tb_start_text mode=1 ]
#
やば……心臓ちょっと変……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_compress_end"  ]
*random_reaction2_touch_chest_compress

[tb_start_text mode=1 ]
#
心臓、変な動きしてる……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_compress_end"  ]
*random_reaction3_touch_chest_compress

[tb_start_text mode=1 ]
#
心臓、ちょっと苦しい……っ。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_compress_end"  ]
*random_reaction4_touch_chest_compress

[tb_start_text mode=1 ]
#
くっ、まだ平気……。[p]
[_tb_end_text]

[jump  storage="reaction_burden_medium.ks"  target="*random_reaction_touch_chest_compress_end"  ]
*random_reaction_touch_chest_compress_end

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="touch_chest_compress.ks"  target="*touch_chest_compress_wait"  ]
