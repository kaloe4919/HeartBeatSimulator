[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[live2d_new  model_id="Kyoka"  breath="true"  lip_time="100"  lip="true"  jname="京香"  ]
[wait  time="200"  ]
[live2d_new  model_id="heart3"  breath="false"  lip_time="100"  ]
[wait  time="200"  ]
[live2d_show  name="Kyoka"  x="-0.1"  y="-0.03"  scale="1.1"  ]
[live2d_show  name="heart3"  x="0.5"  y="-0.33"  scale="0.5"  ]
[bg  storage="lab1.png"  time="1000"  ]
[tb_start_tyrano_code]
;init sim
[loadjs storage="simulator/init.js"]
[loadjs storage="simulator/actor/expression.js"]
[loadjs storage="simulator/talk/eventHandler.js"]
[loadjs storage="simulator/ui/ecgPanel.js"]
[loadjs storage="simulator/ui/rrPanel.js"]
[loadjs storage="simulator/ui/actionPanel.js"]
[loadjs storage="simulator/ui/debugPanel.js"]
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
[show_rr]
[start_rr]
[ptext layer="0" name="HR" text="HR: --" size="20" hexColor="#78f542" bold="bold" x=1190 y=78]
[ptext layer="0" name="RR" text="RR: --" size="20" hexCoror="#42e0f5" bold="bold" x=1190 y=157]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init action panel
[talk_button color="btn_20_black" storage="scene1.ks" size="20" text="Talk" x="20" y="572" width="172" height="56" _clickable_img="" fix="true"]
[action_button color="btn_20_black" storage="scene1.ks" size="20" text="Action" x="200" y="572" width="172" height="56" _clickable_img="" fix="true"]
[hacking_button color="btn_20_black" storage="scene1.ks" size="20" text="Hacking" x="20" y="642" width="172" height="56" _clickable_img="" fix="true"]
[option_button color="btn_20_black" storage="scene1.ks" size="20" text="Option" x="200" y="642" width="172" height="56" _clickable_img="" fix="true"]

[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init comment panel
[position layer="message0" left=20 top=20 width=360 height=536 marginr=20 color=black opacity=100 visible="true"]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;init debug panel
[change_heart_rate_button color="btn_20_black" storage="scene1.ks" value="10" size="20" text="↑" x="1110" y="318" width="50" height="56" _clickable_img="" fix="true"]
[change_heart_rate_button color="btn_20_black" storage="scene1.ks" value="-10" size="20" text="↓" x="1110" y="390" width="50" height="56" _clickable_img="" fix="true"]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;start life cycle
[heartbeat_start]
[breath_start]

[_tb_end_tyrano_code]

[tb_show_message_window  ]
[tb_start_tyrano_code]
;hide buttons
[set_visible_control_buttons visible="false"]
[set_visible_debug_buttons visible="false"]
[_tb_end_tyrano_code]

[mask_off  time="1000"  effect="fadeOut"  ]
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
*stand_by

[tb_start_tyrano_code]
;turn off event flags
[end_talk_event]
;show buttons
[set_visible_control_buttons visible="true"]
[set_visible_debug_buttons visible="true"]
[_tb_end_tyrano_code]

[s  ]
