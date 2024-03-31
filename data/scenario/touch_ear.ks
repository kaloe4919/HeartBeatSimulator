[_tb_system_call storage=system/_touch_ear.ks]

*touch_ear_event

[tb_start_tyrano_code]
;turn on event flags
[start_talk_event]
[_tb_end_tyrano_code]

[tb_eval  exp="f.random=Math.floor(Math.random()*(2-1+1)+1)"  name="random"  cmd="="  op="r"  val="1"  val_2="2"  ]
[jump  storage="touch_ear.ks"  target="*touch_ear_event1"  cond="f.random==1"  ]
[jump  storage="touch_ear.ks"  target="*touch_ear_event2"  cond="f.random==2"  ]
[s  ]
*touch_ear_event1

[tb_fuki_start  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchEar",
no: "0",
isAsync: "true",
});
[endscript]

[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
limit: "100",
limitForce: "true",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#京香
ちょっ、くすぐったいって！[p]
[_tb_end_text]

[tb_fuki_stop  ]
[wait  time="200"  ]
[jump  storage="touch_wait.ks"  target="*touch_wait"  ]
*touch_ear_event2

[tb_fuki_start  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchEar",
no: "0",
isAsync: "true",
});
[endscript]

[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "20",
operator: "+",
limit: "100",
limitForce: "true",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#京香
そこは耳っ！[p]
[_tb_end_text]

[tb_fuki_stop  ]
[wait  time="200"  ]
[jump  storage="touch_wait.ks"  target="*touch_wait"  ]
