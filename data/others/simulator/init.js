var defaultVariables = {
  // --- Chart Variables (vital monitor) ---
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
  // --- Sim Variables ---
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
  isAsyncAtrial: false,
  isPVC: false,
  isVT: false,
  countVT: 0,
  isActiveDevice: true,
  beatVol: 75,
};

TYRANO.kag.hbsim = {};

TYRANO.kag.stat.f.ecgChartData = defaultVariables.ecgChartData;
TYRANO.kag.stat.f.ecgChartLayout = defaultVariables.ecgChartLayout;
TYRANO.kag.stat.f.ecgQueType = defaultVariables.ecgQueType;
TYRANO.kag.stat.f.isEcgAddedQue = defaultVariables.isEcgAddedQue;
TYRANO.kag.stat.f.rrChartData = defaultVariables.rrChartData;
TYRANO.kag.stat.f.rrChartLayout = defaultVariables.rrChartLayout;
TYRANO.kag.stat.f.rrQueType = defaultVariables.rrQueType;
TYRANO.kag.stat.f.isRrAddedQue = defaultVariables.isRrAddedQue;

TYRANO.kag.stat.f.baseHeartRate = defaultVariables.baseHeartRate;
TYRANO.kag.stat.f.heartRate = defaultVariables.heartRate;
TYRANO.kag.stat.f.prevHeartRate = defaultVariables.prevHeartRate;
TYRANO.kag.stat.f.heartRateMin = defaultVariables.heartRateMin;
TYRANO.kag.stat.f.heartRateMax = defaultVariables.heartRateMax;
TYRANO.kag.stat.f.atrialHeartRate = defaultVariables.atrialHeartRate;
TYRANO.kag.stat.f.isAsyncAtrial = defaultVariables.isAsyncAtrial;
TYRANO.kag.stat.f.respiratoryRate = defaultVariables.respiratoryRate;
TYRANO.kag.stat.f.prevRespiratoryRate = defaultVariables.prevRespiratoryRate;

TYRANO.kag.stat.f.burden = defaultVariables.burden;
TYRANO.kag.stat.f.stress = defaultVariables.stress;
TYRANO.kag.stat.f.pressure = defaultVariables.pressure;
TYRANO.kag.stat.f.saNodeBurden = defaultVariables.saNodeBurden;
TYRANO.kag.stat.f.avNodeBurden = defaultVariables.avNodeBurden;
TYRANO.kag.stat.f.ventricleBurden = defaultVariables.ventricleBurden;
TYRANO.kag.stat.f.deviceDamage = defaultVariables.deviceDamage;
TYRANO.kag.stat.f.isActiveDevice = defaultVariables.isActiveDevice;

TYRANO.kag.stat.f.isPVC = defaultVariables.isPVC;
TYRANO.kag.stat.f.isVT = defaultVariables.isVT;
TYRANO.kag.stat.f.countVT = defaultVariables.countVT;

TYRANO.kag.stat.f.beatVol = defaultVariables.beatVol;
