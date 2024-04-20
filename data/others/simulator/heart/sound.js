// Distribute the play SE channels as the heartbeats may overlap if the heart rate is too fast
function bufCounter() {
  var f = TYRANO.kag.stat.f;

  if (f.seChannel >= 9) {
    f.seChannel = 0;
  } else {
    f.seChannel++;
  }
}

function playBeatSound(heartRate) {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : f.heartRate;
  var beatVol = f.onHeartBeatEvent
    ? f.beatVol
    : f.isPlayBeatAlways
      ? f.beatVol
      : 0;
  var soundFileType = ".wav";
  var soundConfig = {
    volume: beatVol,
    buf: f.seChannel.toString(),
    storage: "heartbeat/AC08_HB01" + soundFileType,
    isAsync: "true",
  };

  if (playHeartRate <= 50) {
    soundConfig.storage = "heartbeat/AC08_HB-22" + soundFileType;
  } else if (playHeartRate <= 70) {
    soundConfig.storage = "heartbeat/AC08_HB01" + soundFileType;
  } else if (playHeartRate <= 90) {
    soundConfig.storage = "heartbeat/AC08_HB11" + soundFileType;
  } else if (playHeartRate <= 110) {
    soundConfig.storage = "heartbeat/AC08_HB21" + soundFileType;
  } else {
    soundConfig.storage = "heartbeat/AC08_HB31" + soundFileType;
  }

  ftag.startTag("playse", soundConfig);

  bufCounter();
}
