var breathStatus = TYRANO.kag.hbsim.variables.breathStatus;
var prevResiratoryRate = 15;

function sleep(milliseconds) {
  if (milliseconds < 200) {
    milliseconds = 200;
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function playActorBreathMotion() {
  var playResiratoryRate = breathStatus.resiratoryRate;
  var motionConfig = {
    name: "Kyoka",
    mtn: "Breath",
    no: "0",
    isAsync: "true",
    resiratoryRate: playResiratoryRate.toString(),
    intervalRate: "0.2",
  };

  if (playResiratoryRate <= 20) {
    motionConfig.no = "0";
  } else if (playResiratoryRate <= 25) {
    motionConfig.no = "1";
  } else if (playResiratoryRate <= 30) {
    motionConfig.no = "2";
  } else if (playResiratoryRate <= 35) {
    motionConfig.no = "3";
  } else if (playResiratoryRate <= 40) {
    motionConfig.no = "4";
  }

  TYRANO.kag.ftag.master_tag.live2d_breath_motion.start(motionConfig);
}

async function breathNormal() {
  playActorBreathMotion();
  await sleep(Math.floor((60 / breathStatus.resiratoryRate) * 1000));
}

async function breath() {
  var isDefinedRr = true;
  while (isDefinedRr) {
    console.log("breath");
    // Update ResiratoryRate from heartRate
    var heartRate = TYRANO.kag.hbsim.variables.heartStatus.heartRate;
    breathStatus.resiratoryRate = Math.round((heartRate / 65) * 15);

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update RR Display
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1190,
      y: 157,
      vertical: "false",
      text: `RR: ${breathStatus.resiratoryRate}`,
      size: "20",
      hexColor: "#42e0f5",
      bold: "bold",
      align: "left",
      name: "RR",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });

    await breathNormal();

    prevResiratoryRate = breathStatus.resiratoryRate;
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
