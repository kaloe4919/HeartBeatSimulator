function playActorBeatMotion(cond, heartRate) {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : f.heartRate;
  var motionConfig = {
    name: "Kyoka",
    mtn: cond ? cond : "Normal",
    no: "0",
    isAsync: "true",
    heartRate: playHeartRate.toString(),
    intervalRate: "0.2",
  };

  if (playHeartRate <= 90) {
    motionConfig.no = "0";
  } else if (playHeartRate <= 120) {
    motionConfig.no = "1";
  } else if (playHeartRate <= 150) {
    motionConfig.no = "1";
  } else if (playHeartRate <= 180) {
    motionConfig.no = "2";
  } else if (playHeartRate <= 210) {
    motionConfig.no = "2";
  }
  ftag.master_tag.live2d_beat_motion.start(motionConfig);
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
