;=========キャラクター事前定義情報 
;京香
[chara_new  name="京香"  jname="京香"  storage="chara/1/black_transparent.png"  ]
[fuki_chara  left="-60"  top="20"  sippo="right"  sippo_left="30"  sippo_top="40"  sippo_width="12"  sippo_height="20"  select_fix_width="false"  max_width="300"  color="0x000000"  opacity="150"  border_size="3"  border_color="0x000000"  radius="15"  font_color="0xffffff"  font_size="20"  name="京香"  ]
;先生
[fuki_chara  left="100"  top="260"  sippo="right"  sippo_left="30"  sippo_top="40"  sippo_width="12"  sippo_height="20"  select_fix_width="false"  max_width="300"  fix_width="300"  color="0x000000"  opacity="150"  border_size="3"  border_color="0x000000"  radius="15"  font_color="0xffffff"  font_size="20"  name="others"  ]

;=========変数宣言部分 
[iscript] 
f['random']=0; 
f['baseHeartRate']=''; 
f['heartRate']=''; 
f['prevHeartRate']=''; 
f['heartRateMin']=''; 
f['heartRateMax']=''; 
f['atrialHeartRate']=''; 
f['burden']=''; 
f['stress']=''; 
f['pressure']=''; 
f['saNodeBurden']=''; 
f['avNodeBurden']=''; 
f['ventricleBurden']=''; 
f['deviceDamage']=''; 
f['isActiveDevice']=''; 
f['isPVC']=''; 
f['isVT']=''; 
f['countVT']=''; 
f['isAsyncAtrial']=''; 
f['onTalkEvent']=''; 
f['ecgQueType']=''; 
f['isEcgAddedQue']=''; 
f['rrQueType']=''; 
f['isRrAddedQue']=''; 
f['ecgChartData']=''; 
f['ecgChartLayout']=''; 
f['rrChartData']=''; 
f['rrChartLayout']=''; 
f['beatVol']=''; 
f['respiratoryRate']=''; 
f['prevRespiratoryRate']=''; 
f['currentExpression']=''; 
f['onCompressEvent']=''; 
f['onReactionEvent']=''; 
f['isDuringCoolTime']=''; 
[endscript] 
