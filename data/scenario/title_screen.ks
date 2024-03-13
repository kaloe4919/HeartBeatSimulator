[_tb_system_call storage=system/_title_screen.ks]

[hidemenubutton]

[tb_clear_images]

[tb_keyconfig  flag="0"  ]
[tb_hide_message_window  ]
[bg  storage="lab1.png"  ]
*title

[glink  color="btn_20_black"  text="シミュレーション開始"  x="75"  y="370"  size="20"  target="*start"  width=""  height=""  _clickable_img=""  ]
[glink  color="btn_20_black"  text="つづきから(WIP)"  x="75"  y="470"  size="20"  target="*load"  width=""  height=""  _clickable_img=""  ]
[s  ]
*start

[cm  ]
[tb_keyconfig  flag="1"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*load

[cm  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
