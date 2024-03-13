[_tb_system_call storage=system/_talk_normal1.ks]

*talk_normal1

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
;hide buttons
[set_visible_control_buttons visible="false"]
[set_visible_debug_buttons visible="false"]
[_tb_end_tyrano_code]

[live2d_expression  name="Kyoka"  expression="Shy1"  ]
[tb_start_text mode=1 ]
#京香
その、先生はいつも私の心音聴いてるでしょ……。[p]
だから、その、たまには私が先生のを聴かないとアンフェアというか……。[p]
[_tb_end_text]

[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  text="聴診器を貸してあげる"  x="100"  y="100"  width="240"  height=""  _clickable_img=""  target="*talk_normal1_1"  ]
[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  x="100"  y="180"  width="240"  height=""  text="直接聴かせてあげる"  _clickable_img=""  target="*talk_normal1_2"  ]
[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  target="*talk_normal1_3"  text="だーめ"  x="100"  y="260"  width="240"  height=""  _clickable_img=""  ]
[s  ]
*talk_normal1_1

[tb_start_tyrano_code]
;fade out
[layopt layer=message0 visible=false]
[image layer=1 x=0 y=0 width=1280 height=720 storage="color/black.jpg" name="black"]
[anim name=black opacity=0 time=0]
[anim name=black opacity=255 time=1000 effect="easeOutExpo"]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[mtext layer=2 x=0 y=280 width=1280 align="center" size=30 time=2000 text="聴診器で心音を聴かせてあげた。"]

[_tb_end_tyrano_code]

[wait  time="4000"  ]
[tb_start_tyrano_code]
;fade in
[free layer=1 name=black time=1000]
[layopt layer=message0 visible=true]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[calculate_heartRate value="25" operator="+" limit="90"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#京香
なんか、やっぱり私の心音とちょっと違うね……。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#
（先生の心音聞いちゃった……。）[p]
[_tb_end_text]

[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  width="240"  text="もっと聴いてもいいよ"  x="100"  y="100"  height=""  _clickable_img=""  target="*talk_normal1_1_1"  ]
[s  ]
*talk_normal1_1_1

[live2d_expression  name="Kyoka"  expression="Shy2"  ]
[tb_start_text mode=1 ]
#京香
べ、別に聴きたくて聴いたわけじゃないからっ……。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[tb_start_text mode=1 ]
#京香
まあ、これでおあいこね。[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*stand_by"  ]
*talk_normal1_2

[live2d_expression  name="Kyoka"  expression="Surprised1"  ]
[tb_start_text mode=1 ]
#京香
え？[p]
[_tb_end_text]

[live2d_mod  name="Kyoka"  x="-0.15"  y="0.1"  scale="1.5"  ]
[tb_start_tyrano_code]
[calculate_heartRate value="30" operator="+" limit="130"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#京香
うわっ、ちょっと……！[p]
[_tb_end_text]

[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  width="240"  text="どう？聴こえる？"  x="100"  y="100"  height=""  _clickable_img=""  target="*talk_normal1_2_1"  ]
[s  ]
*talk_normal1_2_1

[tb_start_tyrano_code]
[calculate_heartRate value="30" operator="+" limit="130"]
[_tb_end_tyrano_code]

[live2d_expression  name="Kyoka"  expression="Painful3"  ]
[tb_start_text mode=1 ]
#京香
き、聴こえるけど……っ！[p]
い、一旦離して！[p]
[_tb_end_text]

[live2d_mod  name="Kyoka"  x="-0.1"  y="-0.03"  scale="1.1"  ]
[live2d_expression  name="Kyoka"  expression="Painful2"  ]
[tb_start_tyrano_code]
[calculate_heartRate value="30" operator="+" limit="130" limitForce="true"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#京香
はぁっ、はぁっ……。[p]
[_tb_end_text]

[glink  color="btn_20_black"  storage="talk_normal1.ks"  size="20"  width="240"  x="100"  y="100"  text="大丈夫？"  height=""  _clickable_img=""  target="*talk_normal1_2_2"  ]
[s  ]
*talk_normal1_2_2

[live2d_expression  name="Kyoka"  expression="Shy1"  ]
[tb_start_text mode=1 ]
#京香
ま、まったく……。[p]
こっちにも心の準備ってものが……。[p]
大丈夫だから仕事に戻ってて。[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*stand_by"  ]
*talk_normal1_3

[live2d_expression  name="Kyoka"  expression="Angry1"  ]
[tb_start_text mode=1 ]
#京香
ふんっ、そう言うと思った。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="scene1.ks"  target="*stand_by"  cond=""  ]
