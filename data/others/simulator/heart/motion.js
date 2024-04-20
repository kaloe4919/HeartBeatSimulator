function playHeartBeatMotion(cond, no, heartRate) {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : f.heartRate;
  var motionConfig = {
    name: "heart3",
    mtn: cond ? `${cond}_V` : "Normal_V",
    no: no ? no : "0",
    isAsync: "true",
    heartRate: playHeartRate.toString(),
    intervalRate: "0.1",
  };

  ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playAtrialBeatMotion(cond, no, atrialHeartRate) {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = atrialHeartRate ? atrialHeartRate : f.atrialHeartRate;

  var motionConfig = {
    name: "heart3",
    mtn: cond ? `${cond}_A` : "Normal_A",
    no: no ? no : "0",
    isAsync: "true",
    atrialHeartRate: playHeartRate.toString(),
    intervalRate: "0.1",
  };

  ftag.master_tag.live2d_atrial_beat_motion.start(motionConfig);
}
