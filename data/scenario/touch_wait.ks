[_tb_system_call storage=system/_touch_wait.ks]

*touch_wait

[iscript]
;init expression
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
[_tb_end_tyrano_code]

[s  ]
*touch_head

[jump  storage="touch_head.ks"  target="*touch_head_event"  ]
[s  ]
*touch_ear

[jump  storage="touch_ear.ks"  target="*touch_ear_event"  ]
[s  ]
*touch_neck

[s  ]
*touch_chest

[jump  storage="touch_chest.ks"  target="*touch_chest_event"  ]
[s  ]
*touch_stomach

[s  ]
