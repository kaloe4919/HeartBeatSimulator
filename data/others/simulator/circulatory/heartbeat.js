var seChannel = 0;
var heartStatus = TYRANO.kag.hbsim.variables.heart_status;

function sleep(milliseconds) {
  if (milliseconds < 200) {
    milliseconds = 200;
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Distribute the play SE channels as the heartbeats may overlap if the heart rate is too fast
function bufCounter() {
  if (seChannel >= 9) {
    seChannel = 0;
  } else {
    seChannel = seChannel + 1;
  }
}

function playBeatSound(heartRate) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : heartStatus.heartRate;
  var soundFileType = ".wav";
  var soundConfig = {
    volume: heartStatus.beatVol,
    buf: seChannel.toString(),
    storage: "heartbeat/AC08_HB01" + soundFileType,
    isAsync: "true",
  };

  if (playHeartRate <= 50) {
    soundConfig.storage = "heartbeat/AC08_HB-22" + soundFileType;
  } else if (playHeartRate <= 80) {
    soundConfig.storage = "heartbeat/AC08_HB01" + soundFileType;
  } else if (playHeartRate <= 110) {
    soundConfig.storage = "heartbeat/AC08_HB11" + soundFileType;
  } else if (playHeartRate <= 150) {
    soundConfig.storage = "heartbeat/AC08_HB21" + soundFileType;
  } else {
    soundConfig.storage = "heartbeat/AC08_HB31" + soundFileType;
  }

  TYRANO.kag.ftag.startTag("playse", soundConfig);

  bufCounter();
}

function playActorBeatMotion(heartRate) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : heartStatus.heartRate;
  var motionConfig = {
    name: "Kyoka",
    mtn: "HeartBeat",
    no: "0",
    isAsync: "true",
    heartRate: heartStatus.heartRate.toString(),
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
    motionConfig.no = "3";
  }
  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playHeartBeatMotion(heartRate, cond) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : heartStatus.heartRate;
  var motionConfig = {
    name: "heart3",
    mtn: cond ? cond : "Normal",
    no: "0",
    isAsync: "true",
    heartRate: heartStatus.heartRate.toString(),
    intervalRate: "0.1",
  };

  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

// Normal beat
async function beatRhythmNormal() {
  var random = randomRange(-3, 3);
  playActorBeatMotion();
  playHeartBeatMotion();
  playBeatSound();
  await sleep(Math.floor(60000 / heartStatus.heartRate));
  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    heartStatus.heartRate + random <= heartStatus.heartRateMax &&
    heartStatus.heartRate + random >= heartStatus.heartRateMin
  ) {
    heartStatus.heartRate = heartStatus.heartRate + random;
  }
}

// PVC beat
async function beatRhythmPVC() {
  console.log("PVC");
  var random = randomRange(-3, 3);
  playActorBeatMotion(heartStatus.heartRate);
  playHeartBeatMotion(heartStatus.heartRate, "PVC");
  playBeatSound(heartStatus.heartRate - 60);
  await sleep(Math.floor(60000 / heartStatus.heartRate / 2));
  playActorBeatMotion(heartStatus.heartRate - 60);
  playBeatSound(heartStatus.heartRate - 60);
  await sleep(
    Math.floor(
      60000 / heartStatus.heartRate / 2 + (60000 / heartStatus.heartRate) * 1.5,
    ),
  );
  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    heartStatus.heartRate + random <= heartStatus.heartRateMax &&
    heartStatus.heartRate + random >= heartStatus.heartRateMin
  ) {
    heartStatus.heartRate = heartStatus.heartRate + random;
  }
}

async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var random = randomRange(0, heartStatus.condition);
    // Synchronize heartStatus into TYRANO.kag.hbsim.variables
    TYRANO.kag.hbsim.variables.heart_status = heartStatus;

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update HR Display
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1190,
      y: 78,
      vertical: "false",
      text: `HR: ${heartStatus.heartRate}`,
      size: "20",
      hexColor: "#78f542",
      bold: "bold",
      align: "left",
      name: "HR",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });

    if (random > 10) {
      await beatRhythmNormal();
    } else {
      await beatRhythmPVC();
    }
  }
}

TYRANO.kag.ftag.master_tag.heartbeat_start = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    heartbeat();

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.heartbeat_set_heartRate = {
  kag: TYRANO.kag,
  vital: ["heartRate"],
  pm: {
    heartRate: "65",
  },
  start: function (pm) {
    heartStatus.heartRate = parseInt(pm.heartRate);
    heartStatus.heartRateMin = parseInt(pm.heartRate) - 10;
    heartStatus.heartRateMax = parseInt(pm.heartRate) + 10;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.heartbeat_up_heartRate = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "0",
  },
  start: function (pm) {
    console.log(
      `heartRate up ${heartStatus.heartRate} → ${heartStatus.heartRate + parseInt(pm.value)}`,
    );
    heartStatus.heartRate += parseInt(pm.value);
    heartStatus.heartRateMin += parseInt(pm.value) - 10;
    heartStatus.heartRateMax += parseInt(pm.value) + 10;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.heartbeat_down_heartRate = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "0",
  },
  start: function (pm) {
    console.log(
      `heartRate down ${heartStatus.heartRate} → ${heartStatus.heartRate - parseInt(pm.value)}`,
    );
    heartStatus.heartRate -= parseInt(pm.value);
    heartStatus.heartRateMin -= parseInt(pm.value) - 10;
    heartStatus.heartRateMax -= parseInt(pm.value) + 10;

    this.kag.ftag.nextOrder();
  },
};
