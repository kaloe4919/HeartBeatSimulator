[_tb_system_call storage=system/_touch_neck.ks]

*touch_neck_event

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
[_tb_end_tyrano_code]

[tb_eval  exp="f.random=Math.floor(Math.random()*(2-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="2"  ]
[jump  storage="touch_neck.ks"  target="*touch_neck_event1"  cond="f.random==1"  ]
[jump  storage="touch_neck.ks"  target="*touch_neck_event2"  cond="f.random==2"  ]
[s  ]
*touch_neck_event1

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Shy2"  ]
[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
limit: "90",
limitForce: "true",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#
（うぅ……、脈測られてる……。）[p]
（平常心、平常心……。）[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[tb_fuki_stop  ]
[jump  storage="touch.ks"  target="*touch_wait"  ]
*touch_neck_event2

[tb_fuki_start  ]
[live2d_expression  name="Kyoka"  expression="Shy2"  ]
[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
limit: "90",
limitForce: "true",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#
（脈測られてる……。）[p]
（ドキドキしないようにしないと……。）[p]
[_tb_end_text]

[live2d_expression  name="Kyoka"  expression="Normal"  ]
[tb_fuki_stop  ]
[jump  storage="touch.ks"  target="*touch_wait"  ]
