var seChannel = 0;
var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
var prevHeartRate = 65;

function sleep(milliseconds) {
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
    volume: heartStatus.seVol,
    buf: seChannel.toString(),
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

  TYRANO.kag.ftag.startTag("playse", soundConfig);

  bufCounter();
}

function playActorBeatMotion(cond, heartRate) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : heartStatus.heartRate;
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
    motionConfig.no = "3";
  }
  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playHeartBeatMotion(cond, no, heartRate) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : heartStatus.heartRate;
  var motionConfig = {
    name: "heart3",
    mtn: cond ? `${cond}_V` : "Normal_V",
    no: no ? no : "0",
    isAsync: "true",
    heartRate: playHeartRate.toString(),
    intervalRate: "0.1",
  };

  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playAtrialBeatMotion(cond, no, atrialHeartRate) {
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = atrialHeartRate
    ? atrialHeartRate
    : heartStatus.atrialHeartRate;

  var motionConfig = {
    name: "heart3",
    mtn: cond ? `${cond}_A` : "Normal_A",
    no: no ? no : "0",
    isAsync: "true",
    atrialHeartRate: playHeartRate.toString(),
    intervalRate: "0.1",
  };

  TYRANO.kag.ftag.master_tag.live2d_atrial_beat_motion.start(motionConfig);
}

// Normal beat
async function beatRhythmNormal() {
  // Set values for vital monitor
  TYRANO.kag.hbsim.variables.heartStatus.current = {
    type: "Normal",
    isAddedQue: false,
  };

  var random = randomRange(-3, 3);
  playActorBeatMotion();
  playAtrialBeatMotion();
  playHeartBeatMotion();
  playBeatSound();

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_sa_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_av_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.6));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.2));

  // 心拍数の復元
  var deviationValue = Math.abs(heartStatus.heartRate - 65);
  // 乖離値 100 を基準として乖離率を計算する
  // ただし乖離値が 100 を超える場合は強制的に 1 とする
  var deviationRate = deviationValue / 100 > 1 ? 1 : deviationValue / 100;
  // 乖離率をsmoothStep関数を利用してまるめる
  var smoothDeviationRate = deviationRate ** 2 * (3 - 2 * deviationRate);
  // 指数関数を利用して、乖離率が高いほど心拍数の復元が大きくなるようにする
  var recoveryValue = 10 ** (smoothDeviationRate * 2 - 2) * 4;

  // 心拍数の復元値の適用(会話中は復元しない)
  if (!TYRANO.kag.hbsim.variables.event.onTalkEvent) {
    TYRANO.kag.hbsim.variables.heartStatus.burden = Math.floor(
      recoveryValue * 25,
    );
    if (heartStatus.heartRate - 65 >= 0) {
      TYRANO.kag.hbsim.variables.heartStatus.heartRate -= recoveryValue;
      TYRANO.kag.hbsim.variables.heartStatus.heartRateMin -= recoveryValue;
      TYRANO.kag.hbsim.variables.heartStatus.heartRateMax -= recoveryValue;
    } else {
      TYRANO.kag.hbsim.variables.heartStatus.heartRate += recoveryValue;
      TYRANO.kag.hbsim.variables.heartStatus.heartRateMin += recoveryValue;
      TYRANO.kag.hbsim.variables.heartStatus.heartRateMax += recoveryValue;
    }
  }

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    heartStatus.heartRate + random <= heartStatus.heartRateMax &&
    heartStatus.heartRate + random >= heartStatus.heartRateMin
  ) {
    TYRANO.kag.hbsim.variables.heartStatus.heartRate =
      heartStatus.heartRate + random;
  }
}

// PVC beat
async function beatRhythmPVC() {
  console.log("PVC");
  // Set values for vital monitor
  TYRANO.kag.hbsim.variables.heartStatus.current = {
    type: "PVC",
    isAddedQue: false,
  };

  var random = randomRange(-3, 3);
  var randomMotion = randomRange(0, 1);

  playActorBeatMotion("PVC");
  playAtrialBeatMotion();
  playHeartBeatMotion("PVC", randomMotion);
  playBeatSound();

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_sa_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_av_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.3));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();

  playBeatSound(heartStatus.heartRate - 60);

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor((60000 / heartStatus.heartRate) * 0.5));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor(60000 / heartStatus.heartRate) * 1.5);

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    heartStatus.heartRate + random <= heartStatus.heartRateMax &&
    heartStatus.heartRate + random >= heartStatus.heartRateMin
  ) {
    heartStatus.heartRate = heartStatus.heartRate + random;
  }
}

// VT beat
async function beatRhythmVT() {
  console.log("VT");

  TYRANO.kag.hbsim.variables.heartStatus.current = {
    type: "VT",
    isAddedQue: false,
  };
}

async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var random = randomRange(0, 100);
    // Synchronize heartStatus into TYRANO.kag.hbsim.variables
    TYRANO.kag.hbsim.variables.heartStatus = heartStatus;

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update HR Display
    TYRANO.kag.ftag.master_tag.update_hr.start();

    // Update Debug Outputs
    TYRANO.kag.ftag.master_tag.update_debug_outputs.start();

    if (random > 10) {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.hbsim.variables.heartStatus.atrialHeartRate =
        heartStatus.heartRate;
      await beatRhythmNormal();
    } else {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.hbsim.variables.heartStatus.atrialHeartRate =
        heartStatus.heartRate;
      await beatRhythmPVC();
    }

    prevHeartRate = heartStatus.heartRate;
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

TYRANO.kag.ftag.master_tag.set_heartRate = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "65",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    TYRANO.kag.hbsim.variables.heartStatus.heartRate = value;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMin = value - 10;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMax = value + 10;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.calculate_heartRate = {
  kag: TYRANO.kag,
  vital: ["value", "operator"],
  pm: {
    value: "0",
    operator: "+",
    // 加算/減算の結果が limit より大きい/小さい場合、演算をしない
    limit: "",
    // trueにすると、加算/減算の結果が limit より大きい/小さい場合、limit の値が強制的に代入される
    limitForce: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    var limit = parseInt(pm.limit);

    if (pm.operator === "+") {
      if (
        limit &&
        TYRANO.kag.hbsim.variables.heartStatus.heartRate + value >= limit
      ) {
        if (pm.limitForce === "true") {
          console.log(
            `heartRate change ${TYRANO.kag.hbsim.variables.heartStatus.heartRate} → ${limit}`,
          );
          TYRANO.kag.hbsim.variables.heartStatus.heartRate = limit;
          TYRANO.kag.hbsim.variables.heartStatus.heartRateMin = limit - 10;
          TYRANO.kag.hbsim.variables.heartStatus.heartRateMax = limit + 10;
          return;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if (
        (limit &&
          TYRANO.kag.hbsim.variables.heartStatus.heartRate + value < limit) ||
        !limit
      ) {
        console.log(
          `heartRate change ${TYRANO.kag.hbsim.variables.heartStatus.heartRate} → ${TYRANO.kag.hbsim.variables.heartStatus.heartRate + value}`,
        );
        TYRANO.kag.hbsim.variables.heartStatus.heartRate += value;
        TYRANO.kag.hbsim.variables.heartStatus.heartRateMin += value;
        TYRANO.kag.hbsim.variables.heartStatus.heartRateMax += value;
        return;
      }
    }
    if (pm.operator === "-") {
      if (
        limit &&
        TYRANO.kag.hbsim.variables.heartStatus.heartRate - value <= limit
      ) {
        if (pm.limitForce === "true") {
          console.log(
            `heartRate change ${TYRANO.kag.hbsim.variables.heartStatus.heartRate} → ${limit}`,
          );
          TYRANO.kag.hbsim.variables.heartStatus.heartRate = limit;
          TYRANO.kag.hbsim.variables.heartStatus.heartRateMin = limit - 10;
          TYRANO.kag.hbsim.variables.heartStatus.heartRateMax = limit + 10;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if (
        (limit &&
          TYRANO.kag.hbsim.variables.heartStatus.heartRate - value > limit) ||
        !limit
      ) {
        console.log(
          `heartRate change ${TYRANO.kag.hbsim.variables.heartStatus.heartRate} → ${TYRANO.kag.hbsim.variables.heartStatus.heartRate - value}`,
        );
        TYRANO.kag.hbsim.variables.heartStatus.heartRate -= value;
        TYRANO.kag.hbsim.variables.heartStatus.heartRateMin -= value;
        TYRANO.kag.hbsim.variables.heartStatus.heartRateMax -= value;
      }
    }

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.up_heartRate_10 = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "0",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    console.log(
      `heartRate up ${heartStatus.heartRate} → ${heartStatus.heartRate + value}`,
    );
    TYRANO.kag.hbsim.variables.heartStatus.heartRate += value;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMin += value - 10;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMax += value + 10;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.down_heartRate_10 = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "0",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    console.log(
      `heartRate down ${heartStatus.heartRate} → ${heartStatus.heartRate - value}`,
    );
    TYRANO.kag.hbsim.variables.heartStatus.heartRate -= value;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMin -= value - 10;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMax -= value + 10;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_heart_se_vol = {
  kag: TYRANO.kag,
  vital: ["vol"],
  pm: {
    vol: "75",
  },
  start: function (pm) {
    // TODO: 心音OFFの場合は強制的に0にする
    var vol = parseInt(pm.vol);
    console.log(`set heart beat se volume to ${vol}`);
    TYRANO.kag.hbsim.variables.heartStatus.seVol = parseInt(vol);

    this.kag.ftag.nextOrder();
  },
};
