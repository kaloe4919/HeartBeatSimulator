function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function playActorBreathMotion() {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  var playRespiratoryRate = f.respiratoryRate;
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

  ftag.master_tag.live2d_breath_motion.start(motionConfig);
}

async function breathNormal() {
  var f = TYRANO.kag.stat.f;
  // Set values for vital monitor
  f.rrQueType = "Normal";
  f.isRrAddedQue = false;

  playActorBreathMotion();
  await sleep(Math.floor((60 / f.respiratoryRate) * 1000));
}

async function breath() {
  var isDefinedRr = true;
  while (isDefinedRr) {
    var f = TYRANO.kag.stat.f;
    var ftag = TYRANO.kag.ftag;
    var hbsim = TYRANO.kag.hbsim;

    console.log("breath");
    // Update RespiratoryRate from heartRate
    var heartRate = f.heartRate;
    f.respiratoryRate = Math.round((heartRate / 65) * 15);

    // Update expression
    hbsim.expression.update();

    // Update RR Display
    ftag.master_tag.update_rr.start();

    await breathNormal();

    f.prevRespiratoryRate = f.respiratoryRate;
  }
}

TYRANO.kag.ftag.master_tag.breath_start = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    breath();

    this.ftag.nextOrder();
  },
};
