var prevRespiratoryRate = 15;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function playActorBreathMotion() {
  var playRespiratoryRate =
    TYRANO.kag.hbsim.variables.breathStatus.respiratoryRate;
  var motionConfig = {
    name: "Kyoka",
    mtn: "Breath",
    no: "0",
    isAsync: "true",
    respiratoryRate: playRespiratoryRate.toString(),
    intervalRate: "0.2",
  };

  if (playRespiratoryRate <= 20) {
    motionConfig.no = "0";
  } else if (playRespiratoryRate <= 25) {
    motionConfig.no = "1";
  } else if (playRespiratoryRate <= 30) {
    motionConfig.no = "2";
  } else if (playRespiratoryRate <= 35) {
    motionConfig.no = "3";
  } else if (playRespiratoryRate <= 40) {
    motionConfig.no = "4";
  }

  TYRANO.kag.ftag.master_tag.live2d_breath_motion.start(motionConfig);
}

async function breathNormal() {
  var breathStatus = TYRANO.kag.hbsim.variables.breathStatus;
  // Set values for vital monitor
  TYRANO.kag.hbsim.variables.breathStatus.current = {
    type: "Normal",
    isAddedQue: false,
  };

  playActorBreathMotion();
  await sleep(Math.floor((60 / breathStatus.respiratoryRate) * 1000));
}

async function breath() {
  var breathStatus = TYRANO.kag.hbsim.variables.breathStatus;
  var isDefinedRr = true;
  while (isDefinedRr) {
    console.log("breath");
    // Update RespiratoryRate from heartRate
    var heartRate = TYRANO.kag.hbsim.variables.heartStatus.heartRate;
    breathStatus.respiratoryRate = Math.round((heartRate / 65) * 15);

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update RR Display
    TYRANO.kag.ftag.master_tag.update_rr.start();

    await breathNormal();

    prevRespiratoryRate = breathStatus.respiratoryRate;
  }
}

TYRANO.kag.ftag.master_tag.breath_start = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    breath();

    this.kag.ftag.nextOrder();
  },
};
