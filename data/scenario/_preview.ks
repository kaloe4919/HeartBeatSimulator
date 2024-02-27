[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[live2d_new  model_id="Kyoka"  breath="true"  lip_time="100"  lip="true"  jname="京香"  ]
[wait  time="200"  ]
[live2d_new  model_id="heart3"  breath="false"  lip_time="100"  ]
[wait  time="200"  ]
[live2d_show  name="Kyoka"  x="-0.1"  y="-0.03"  scale="1.1"  ]
[live2d_show  name="heart3"  x="0.5"  y="-0.33"  scale="0.5"  ]
[tb_start_tyrano_code]
;init vital display
[layopt layer="0" visible="true"]
[ptext layer="0" name="HR" text="HR: --" size="26" bold="bold" x=1140 y=16]
[ptext layer="0" name="RR" text="RR: --" size="26" bold="bold" x=1140 y=58]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;start life cycle
[loadjs storage="circulatory/heartbeat.js"]
[loadjs storage="circulatory/breath.js"]
[heartbeat_start]
[breath_start]

[_tb_end_tyrano_code]

[bg  storage="lab1.png"  time="1000"  ]
[tb_start_tyrano_code]
;init comment display
[position layer="message0" left=20 top=20 width=360 height=680 marginr=20 color=black opacity=100 visible="true"]
[_tb_end_tyrano_code]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
#京香
こんにちは[p]
これは新しいプロジェクトです[p]
ドラッグ＆ドロップして要素を追加してください[p]
[_tb_end_text]

[tb_start_tyrano_code]
[heartbeat_set_heartRate heartRate="120"]
[_tb_end_tyrano_code]

[s  ]
