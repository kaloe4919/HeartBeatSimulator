var breathStatus = TYRANO.kag.hbsim.variables.breath_status;
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
    if (prevResiratoryRate > 20) {
      // TODO: 表情制御は別ファイルに分離する
      console.log("Painful0");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Normal",
      });
    }
    motionConfig.no = "0";
  } else if (playResiratoryRate <= 25) {
    if (prevResiratoryRate > 30) {
      console.log("Painful0");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Normal",
      });
    }
    motionConfig.no = "1";
  } else if (playResiratoryRate <= 30) {
    if (prevResiratoryRate < 30 || prevResiratoryRate >= 35) {
      console.log("Painful1");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful1",
      });
    }
    motionConfig.no = "2";
  } else if (playResiratoryRate <= 35) {
    motionConfig.no = "3";
  } else if (playResiratoryRate <= 40) {
    if (prevResiratoryRate < 40) {
      console.log("Painful2");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful2",
      });
    }
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
    var heartRate = TYRANO.kag.hbsim.variables.heart_status.heartRate;
    breathStatus.resiratoryRate = Math.round((heartRate / 65) * 15);

    // Update RR Display
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1140,
      y: 58,
      vertical: "false",
      text: `RR: ${breathStatus.resiratoryRate}`,
      size: "26",
      color: "",
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
