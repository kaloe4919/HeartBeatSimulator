[_tb_system_call storage=system/_talk_normal2.ks]

*talk_normal2

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
;hide buttons
[set_visible_control_menu visible="false"]
[set_visible_debug_buttons visible="false"]
[_tb_end_tyrano_code]

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Angry1"  ]
[tb_start_text mode=1 ]
#京香
先生……、また私のカバンの中勝手に見たでしょ？[p]
[_tb_end_text]

[tb_fuki_stop  ]
[glink  color="btn_20_black"  storage="talk_normal2.ks"  size="20"  x="100"  y="180"  width="240"  height=""  text="うーん、見た"  _clickable_img=""  target="*talk_normal2_1"  ]
[glink  color="btn_20_black"  storage="talk_normal2.ks"  size="20"  x="100"  y="260"  width="240"  height=""  text="うーん、見てない"  _clickable_img=""  target="*talk_normal2_2"  ]
[s  ]
*talk_normal2_1

[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
ちょっと一発かますからそこに座りなさい。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[glink  color="btn_20_black"  storage="talk_normal2.ks"  size="20"  x="100"  y="180"  width="240"  height=""  text="逃げる"  _clickable_img=""  target="*talk_normal2_1_1"  ]
[s  ]
*talk_normal2_1_1

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Surprised1"  ]
[tb_start_text mode=1 ]
#京香
あ、ちょっと待ちなさいっ！[p]
[_tb_end_text]

[tb_start_tyrano_code]
;fade out
[set_heart_se_vol vol=0]
[image layer=1 x=0 y=0 width=1280 height=720 storage="color/black.jpg" name="black"]
[anim name=black opacity=0 time=0]
[anim name=black opacity=255 time=1000 effect="easeOutExpo"]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[mtext layer=2 x=0 y=280 width=1280 align="center" size=30 time=3000 text="しばらくラボの中を全力で逃げ回った。"]

[_tb_end_tyrano_code]

[wait  time="3000"  ]
[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "60",
operator: "+",
isAsync: "true",
});
[endscript]

[tb_start_tyrano_code]
;fade in
[set_heart_se_vol vol=75]
[free layer=1 name=black time=1000]
[_tb_end_tyrano_code]

[live2d_expression  name="Kyoka"  expression="Painful4"  ]
[tb_start_text mode=1 ]
#京香
はーっ、はーっ……。[p]
なんで、そんなに逃げるの早いの……っ、ゴキブリかっ。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Painful3"  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "1",
isAsync: "true",
});
[endscript]

[wait  time="500"  ]
[tb_start_text mode=1 ]
#
（久しぶりに走ったから、心臓やば……。）[p]
[_tb_end_text]

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Hand",
no: "0",
isAsync: "true",
});
[endscript]

[wait  time="500"  ]
[jump  storage="scene1.ks"  target="*scene1_wait"  ]
*talk_normal2_2

[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
ホントかなぁ……。[p]
あやしい……。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="scene1.ks"  target="*scene1_wait"  ]
