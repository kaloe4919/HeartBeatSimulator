[_tb_system_call storage=system/_touch_wait.ks]

*touch_wait

[iscript]
TYRANO.kag.ftag.master_tag.live2d_motion.start({
name: "Kyoka",
mtn: "Face",
no: "0",
isAsync: "true",
});
[endscript]

[tb_start_tyrano_code]
[set_visible_touch_event_menu visible="true"]
[set_visible_touch_event_area visible="true"]
;turn off event flags
[end_talk_event]
[_tb_end_tyrano_code]

[s  ]
