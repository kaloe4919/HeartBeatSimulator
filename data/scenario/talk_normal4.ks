[_tb_system_call storage=system/_talk_normal4.ks]

*talk_normal4

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
;hide buttons
[set_visible_control_menu visible="false"]
[set_visible_debug_buttons visible="false"]
[_tb_end_tyrano_code]

[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
先生、なんかおすすめのゲームとかないの？[p]
[_tb_end_text]

[tb_fuki_stop  ]
[glink  color="btn_20_black"  storage="talk_normal4.ks"  size="20"  x="100"  y="180"  width="240"  height=""  text="これは？（RPG）"  _clickable_img=""  target="*talk_normal4_1"  ]
[glink  color="btn_20_black"  storage="talk_normal4.ks"  size="20"  x="100"  y="260"  width="240"  height=""  text="これは？（格闘）"  _clickable_img=""  target="*talk_normal4_2"  ]
[glink  color="btn_20_black"  storage="talk_normal4.ks"  size="20"  x="100"  y="340"  width="240"  height=""  text="これは？（BL）"  _clickable_img=""  target="*talk_normal4_3"  ]
[s  ]
*talk_normal4_1

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Smile1"  ]
[tb_start_text mode=1 ]
#京香
あー、そのゲームね、先生もやってたんだ。[p]
今度フレ送っといてよ。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="scene1.ks"  target="*scene1_wait"  ]
*talk_normal4_2

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Smile2"  ]
[tb_start_text mode=1 ]
#京香
先生ってそういうゲーム好きだよね。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Smile1"  ]
[tb_start_text mode=1 ]
#京香
まあ、やったことないし、ちょっと触ってみるのもありかなー。[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[jump  storage="scene1.ks"  target="*scene1_wait"  ]
*talk_normal4_3

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Surprised1_Sweat"  ]
[tb_start_text mode=1 ]
#京香
なっ！？[p]
[_tb_end_text]

[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
isAsync: "true",
});
[endscript]

[live2d_expression  name="Kyoka"  expression="Angry2_Cheek"  ]
[tb_start_text mode=1 ]
#京香
え、えっちなのはダメって自分で言ってたくせに！[p]
ま、まったく……。[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*scene1_wait"  ]
