[_tb_system_call storage=system/_touch_wait.ks]

*touch_wait

[tb_start_tyrano_code]
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

[s  ]
*touch_stomach

[s  ]
