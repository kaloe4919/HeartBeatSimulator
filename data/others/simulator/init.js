// !! variables must be synchronized with TyranoBuilder
// !! variables names must be defined in TyranoBuilder

var f = TYRANO.kag.stat.f;
TYRANO.kag.hbsim = {};
var defaultVariables = {
  // Chart Variables (vital monitor) -------
  // ecg monitor variables
  ecgChartData: null,
  ecgChartLayout: null,
  // heart beat wave type ("Normal", "PVC", "VT", etc...)
  ecgQueType: "Normal",
  isEcgAddedQue: true,
  // rr monitor variables
  rrChartData: null,
  rrChartLayout: null,
  // respiratory wave type
  rrQueType: "Normal",
  isRrAddedQue: true,

  // Simulation Variables -------
  // heartRate recovers to this rate
  baseHeartRate: 65,
  heartRate: 65,
  prevHeartRate: 65,
  heartRateMin: 60,
  heartRateMax: 70,
  respiratoryRate: 15,
  prevRespiratoryRate: 15,
  // used to control atrial motion, sync with heart rate
  // arrhythmias cause differences in ventricular and atrial heart rates (VT, AF, etc)
  atrialHeartRate: 65,
  // variable increase by rapid changes in heart rate
  burden: 10,
  // variable increase by changes in emotions
  stress: 0,
  // variable increase by compression or hacking
  pressure: 0,
  // high value cause to Atrial Fibrillation(AF)
  saNodeBurden: 5,
  // high value cause to AV nodal reentrant tachycardia(SVT) and AV block
  avNodeBurden: 5,
  // high value cause to Premature Ventricular Contractions(PVC) and Ventricular Tachycardia(VT)
  ventricleBurden: 5,
  // variable increase by compression or hacking or etc
  // high value cause to device malfunction
  deviceDamage: 0,
  seChannel: 0,

  // Manually Changeable Variables -------
  isAsyncAtrial: false,
  isPVC: false,
  isVT: false,
  countVT: 0,
  isActiveDevice: true,
  beatVol: 75,
  breathVol: 75,
  musicVol: 75,
  seVol: 75,
  isPlayBeatAlways: true, // TODO: set false
  isPlayBreathAlways: true, // TODO: set false
  isShowEcg: true,
  isShowHeart: true,
  isShowDebug: true, // TODO: set false
  customRecoveryHeartRate: 100,
  customIncreaseBurden: 100,
  customRecoveryBurden: 100,
  customIncreaseVentricleBurden: 100,
  customRecoveryVentricleBurden: 100,
  customIncreaseSANodeBurden: 100,
  customRecoverySANodeBurden: 100,
  customIncreaseAVNodeBurden: 100,
  customRecoveryAVNodeBurden: 100,
  customIncreaseDeviceDamage: 100,
  currentExpression: "Normal",

  // On Event Flags -------
  onTalkEvent: false,
  onReactionEvent: false,
  onHeartBeatEvent: false,
  isDuringCoolTime: false,
  // scene name of where reaction event occurred
  waitSceneName: "scene1",
};

f.ecgChartData = defaultVariables.ecgChartData;
f.ecgChartLayout = defaultVariables.ecgChartLayout;
f.ecgQueType = defaultVariables.ecgQueType;
f.isEcgAddedQue = defaultVariables.isEcgAddedQue;
f.rrChartData = defaultVariables.rrChartData;
f.rrChartLayout = defaultVariables.rrChartLayout;
f.rrQueType = defaultVariables.rrQueType;
f.isRrAddedQue = defaultVariables.isRrAddedQue;

f.baseHeartRate = defaultVariables.baseHeartRate;
f.heartRate = defaultVariables.heartRate;
f.prevHeartRate = defaultVariables.prevHeartRate;
f.heartRateMin = defaultVariables.heartRateMin;
f.heartRateMax = defaultVariables.heartRateMax;
f.atrialHeartRate = defaultVariables.atrialHeartRate;
f.isAsyncAtrial = defaultVariables.isAsyncAtrial;
f.respiratoryRate = defaultVariables.respiratoryRate;
f.prevRespiratoryRate = defaultVariables.prevRespiratoryRate;

f.burden = defaultVariables.burden;
f.stress = defaultVariables.stress;
f.pressure = defaultVariables.pressure;
f.saNodeBurden = defaultVariables.saNodeBurden;
f.avNodeBurden = defaultVariables.avNodeBurden;
f.ventricleBurden = defaultVariables.ventricleBurden;
f.deviceDamage = defaultVariables.deviceDamage;
f.seVol = defaultVariables.seVol;

f.isPVC = defaultVariables.isPVC;
f.isVT = defaultVariables.isVT;
f.countVT = defaultVariables.countVT;
f.isActiveDevice = defaultVariables.isActiveDevice;

f.beatVol = defaultVariables.beatVol;
f.breathVol = defaultVariables.breathVol;
f.musicVol = defaultVariables.musicVol;
f.seChannel = defaultVariables.seChannel;
f.isPlayBeatAlways = defaultVariables.isPlayBeatAlways;
f.isPlayBreathAlways = defaultVariables.isPlayBreathAlways;
f.isShowEcg = defaultVariables.isShowEcg;
f.isShowHeart = defaultVariables.isShowHeart;
f.isShowDebug = defaultVariables.isShowDebug;
f.customRecoveryHeartRate = defaultVariables.customRecoveryHeartRate;
f.customIncreaseBurden = defaultVariables.customIncreaseBurden;
f.customRecoveryBurden = defaultVariables.customRecoveryBurden;
f.customIncreaseVentricleBurden =
  defaultVariables.customIncreaseVentricleBurden;
f.customRecoveryVentricleBurden =
  defaultVariables.customRecoveryVentricleBurden;
f.customIncreaseSANodeBurden = defaultVariables.customIncreaseSANodeBurden;
f.customRecoverySANodeBurden = defaultVariables.customRecoverySANodeBurden;
f.customIncreaseAVNodeBurden = defaultVariables.customIncreaseAVNodeBurden;
f.customRecoveryAVNodeBurden = defaultVariables.customRecoveryAVNodeBurden;
f.customIncreaseDeviceDamage = defaultVariables.customIncreaseDeviceDamage;
f.currentExpression = defaultVariables.currentExpression;

f.onTalkEvent = defaultVariables.onTalkEvent;
f.onReactionEvent = defaultVariables.onReactionEvent;
f.onHeartBeatEvent = defaultVariables.onHeartBeatEvent;
f.isDuringCoolTime = defaultVariables.isDuringCoolTime;

f.waitSceneName = defaultVariables.waitSceneName;
