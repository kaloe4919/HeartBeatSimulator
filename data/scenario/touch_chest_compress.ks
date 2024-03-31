[_tb_system_call storage=system/_touch_chest_compress.ks]

*touch_chest_compress_event

[tb_start_tyrano_code]
[set_visible_touch_chest_event_menu visible="false"]
;turn on event flags
[start_talk_event]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
;disabled eye blink
[live2d_switch_eye_blink isEnable="false" isAsync="true"]
[_tb_end_tyrano_code]

[tb_fuki_start  ]
[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchChestCompress",
no: "0",
isAsync: "true",
});
[endscript]

[wait  time="1000"  ]
[iscript]
TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
value: "30",
operator: "-",
isAsync: "true",
});
TYRANO.kag.ftag.master_tag.set_base_heart_rate.start({
value: "90",
isAsync: "true",
});
[endscript]

[tb_start_text mode=1 ]
#京香
くっ……。[p]
平気……そのまま続けて。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[tb_start_tyrano_code]
[set_visible_compress_event_menu visible="true"]
;turn off event flags
[end_talk_event]
[_tb_end_tyrano_code]

[s  ]
*stop_touch_chest_compress

[tb_start_tyrano_code]
[set_visible_compress_event_menu visible="false"]
;enabled eye blink
[live2d_switch_eye_blink isEnable="true" isAsync="true"]
;turn on event flags
[start_talk_event]
[_tb_end_tyrano_code]

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "TouchChestCompress",
no: "1",
isAsync: "true",
});
[endscript]

[wait  time="1000"  ]
[tb_fuki_start  ]
[tb_start_text mode=1 ]
#京香
はぁ……っ。はぁ……っ。[p]
[_tb_end_text]

[tb_fuki_stop  ]
[jump  storage="touch_chest.ks"  target="*touch_chest_wait"  ]
