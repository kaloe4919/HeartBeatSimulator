[_tb_system_call storage=system/_touch_chest.ks]

*touch_chest_event

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Angry1_Cheek"  ]
[tb_start_text mode=1 ]
#京香
先生？どこ触ろうとしてるの？[p]
[_tb_end_text]

[tb_fuki_stop  ]
[glink  color="btn_20_black"  storage="touch_chest.ks"  size="20"  text="鼓動を直接感じたい"  x="100"  y="180"  width="240"  height=""  _clickable_img=""  target="*touch_chest_event1"  ]
[s  ]
*touch_chest_event1

[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
やっぱりそういうと思った……。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Face",
no: "2",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#京香
せ、先生だけ特別だからね……。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[glink  color="btn_20_black"  storage="touch_chest.ks"  size="20"  text="じゃあ触るね"  x="100"  y="180"  width="240"  height=""  _clickable_img=""  target="*touch_chest_event2"  ]
[s  ]
*touch_chest_event2

[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
う、うん……。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchChest",
no: "0",
isAsync: "true",
});
[endscript]

[iscript]
TYRANO.kag.ftag.master_tag.set_base_heart_rate.start({
value: "120",
isAsync: "true",
});
[endscript]

[tb_start_tyrano_code]
[set_visible_touch_chest_event_menu visible="true"]
[_tb_end_tyrano_code]

[s  ]
