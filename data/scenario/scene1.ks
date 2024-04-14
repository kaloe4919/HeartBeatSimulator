[_tb_system_call storage=system/_scene1.ks]

[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[live2d_new  model_id="Kyoka"  breath="true"  lip_time="100"  lip="true"  jname="京香"  ]
[wait  time="200"  ]
[live2d_new  model_id="heart3"  breath="false"  lip_time="100"  ]
[wait  time="200"  ]
[live2d_show  name="Kyoka"  x="-0.07"  y="-0.12"  scale="1"  ]
[live2d_show  name="heart3"  x="0.6"  y="-0.33"  scale="0.5"  ]
[tb_start_tyrano_code]
;set dummy character for fuki effect
[chara_show  name="京香"  time="0"  wait="false"  left="491"  top="238"  width="480"  height="480"  reflect="false"  storage="chara/1/black_transparent.png"  ]
[_tb_end_tyrano_code]

[bg  storage="lab1.png"  time="1000"  ]
[tb_start_tyrano_code]
;init sim
[loadjs storage="simulator/init.js"]
[loadjs storage="simulator/actor/expression.js"]
[loadjs storage="simulator/talk/eventHandler.js"]
[loadjs storage="simulator/talk/reaction/eventHandler.js"]
[loadjs storage="simulator/touch/eventHandler.js"]
[loadjs storage="simulator/ui/ecgPanel.js"]
[loadjs storage="simulator/ui/rrPanel.js"]
[loadjs storage="simulator/ui/optionMenu.js"]
[loadjs storage="simulator/ui/controlMenu.js"]
[loadjs storage="simulator/ui/actionMenu.js"]
[loadjs storage="simulator/ui/playMenu.js"]
[loadjs storage="simulator/ui/touchEventMenu.js"]
[loadjs storage="simulator/ui/touchEventArea.js"]
[loadjs storage="simulator/ui/debugPanel.js"]
[loadjs storage="simulator/circulatory/heartbeatUtil.js"]
[loadjs storage="simulator/circulatory/heartbeat.js"]
[loadjs storage="simulator/circulatory/breath.js"]
[configdelay speed=100]
[autostart]
[layopt layer="0" visible="true"]
[layopt layer="1" visible="true"]
[layopt layer="2" visible="true"]

[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init vital panel
[show_ecg]
[start_ecg]
[ptext layer="0" name="HR" text="HR: --" size="20" hexColor="#78f542" bold="bold" x=1090 y=58]
[ptext layer="0" name="RR" text="RR: --" size="20" hexCoror="#42e0f5" bold="bold" x=1190 y=58]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init control menu
[option_menu]
[option_open_menu x="20" y="106" width="120"]
[control_menu x="20" y="32" width="360"]
[action_menu x="20" y="164" width="360"]
[play_menu x="20" y="164" width="360"]
[touch_event_menu x="20" y="32" width="172"]
[touch_chest_event_menu x="20" y="32" width="172"]
[compress_event_menu x="20" y="32" width="172"]
[touch_event_area]
;init current mode label
[ptext layer="0" name="mode" text="" size="18" hexColor="#fff" bold="bold" x=20 y=100]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init comment panel
[position layer="message0" left=20 top=20 width=360 height=536 marginr=20 color=black opacity=100 visible="false"]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init debug panel
[change_heart_rate_button color="btn_20_black" storage="scene1.ks" value="10" operator="+" size="12" text="↑" x="1160" y="318" width="50" height="36" _clickable_img="" fix="true"]
[change_heart_rate_button color="btn_20_black" storage="scene1.ks" value="10" operator="-"  size="12" text="↓" x="1160" y="370" width="50" height="36" _clickable_img="" fix="true"]
[ptext layer="0" name="burden" text="burden: --" size="12" hexColor="#fff" x=1160 y=500]
[ptext layer="0" name="saNodeBurden" text="saBurden: --" size="12" hexColor="#fff" x=1160 y=520]
[ptext layer="0" name="avNodeBurden" text="avBurden: --" size="12" hexColor="#fff" x=1160 y=540]
[ptext layer="0" name="ventricleBurden" text="vBurden: --" size="12" hexColor="#fff" x=1160 y=560]
[ptext layer="0" name="stress" text="stress: --" size="12" hexColor="#fff" x=1160 y=580]
[ptext layer="0" name="pressure" text="pressure: --" size="12" hexColor="#fff" x=1160 y=600]
[ptext layer="0" name="deviceDmg" text="deviceDmg: --" size="12" hexColor="#fff" x=1160 y=620]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;start life cycle
[heartbeat_start]
[breath_start]

[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;hide buttons
[set_visible_control_menu visible="false"]
[set_visible_debug_buttons visible="false"]
[_tb_end_tyrano_code]

[mask_off  time="1000"  effect="fadeOut"  ]
[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
あ、先生だ。[p]
心臓の調子？[p]
まだちょっと変な動きする時あるけど……。[p]

[_tb_end_text]

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "1",
isAsync: "true",
});
[endscript]

[wait  time="500"  ]
[live2d_expression  name="Kyoka"  expression="LookDown1"  ]
[tb_start_text mode=1 ]
#京香
これのおかげで今のところ平気かな。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "0",
isAsync: "true",
});
[endscript]

[wait  time="500"  ]
*scene1_wait

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Face",
no: "0",
isAsync: "true",
});
[endscript]

[tb_fuki_stop  ]
[tb_start_tyrano_code]
;turn off event flags
[end_talk_event]
[end_reaction_event]
;scene name to return from a reaction event
[set_wait_scene_name sceneName="scene1"]
;show buttons
[set_visible_control_menu visible="true"]
[set_visible_debug_buttons visible="true"]
[_tb_end_tyrano_code]

[s  ]
