[_tb_system_call storage=system/_touch_head.ks]

*touch_head_event

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
[_tb_end_tyrano_code]

[tb_eval  exp="f.random=Math.floor(Math.random()*(2-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="2"  ]
[jump  storage="touch_head.ks"  target="*touch_head_event1"  cond="f.random==1"  ]
[jump  storage="touch_head.ks"  target="*touch_head_event2"  cond="f.random==2"  ]
[s  ]
*touch_head_event1

[tb_fuki_start  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchHead",
no: "0",
isAsync: "true",
});
[endscript]

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
#京香
えへへ……。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[wait  time="200"  ]
[jump  storage="touch.ks"  target="*touch_wait"  ]
*touch_head_event2

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchHead",
no: "1",
isAsync: "true",
});
[endscript]

[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
limit: "90",
limitForce: "true",
isAsync: "true",
});
[endscript]

[wait  time="2000"  ]
[jump  storage="touch.ks"  target="*touch_wait"  ]
