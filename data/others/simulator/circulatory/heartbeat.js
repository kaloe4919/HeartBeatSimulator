var seChannel = 0;

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
  var stat = TYRANO.kag.stat.f;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : stat.heartRate;
  var soundFileType = ".wav";
  var soundConfig = {
    volume: stat.beatVol,
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
  var stat = TYRANO.kag.stat.f;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : stat.heartRate;
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
  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playHeartBeatMotion(cond, no, heartRate) {
  var stat = TYRANO.kag.stat.f;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : stat.heartRate;
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
  var stat = TYRANO.kag.stat.f;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = atrialHeartRate ? atrialHeartRate : stat.atrialHeartRate;

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
  var stat = TYRANO.kag.stat.f;
  // Set values for vital monitor
  TYRANO.kag.stat.f.ecgQueType = "Normal";
  TYRANO.kag.stat.f.isEcgAddedQue = false;

  var random = randomRange(-3, 3);
  playActorBeatMotion();
  playAtrialBeatMotion();
  playHeartBeatMotion();
  playBeatSound();

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_sa_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_av_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.6));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.2));

  // 心拍数の復元値を取得
  var maxRecoveryValue = 3;
  var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);

  // 心拍数の復元値の適用(会話中は復元しない)
  if (!TYRANO.kag.stat.f.onTalkEvent) {
    // 心臓負荷の増減
    TYRANO.kag.stat.f.burden += getIncreaseBurden(recoveryValue);
    TYRANO.kag.stat.f.burden -= getRecoveryBurden();

    // 心室の負荷を軽減
    TYRANO.kag.stat.f.ventricleBurden -= getRecoveryVentricleBurden();

    if (stat.heartRate - stat.baseHeartRate >= 0) {
      TYRANO.kag.stat.f.heartRate -= recoveryValue;
      TYRANO.kag.stat.f.heartRateMin -= recoveryValue;
      TYRANO.kag.stat.f.heartRateMax -= recoveryValue;
    } else {
      TYRANO.kag.stat.f.heartRate += recoveryValue;
      TYRANO.kag.stat.f.heartRateMin += recoveryValue;
      TYRANO.kag.stat.f.heartRateMax += recoveryValue;
    }
  }

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    stat.heartRate + random <= stat.heartRateMax &&
    stat.heartRate + random >= stat.heartRateMin
  ) {
    TYRANO.kag.stat.f.heartRate = stat.heartRate + random;
  }

  TYRANO.kag.stat.f.isPVC = false;
}

// PVC
async function beatRhythmPVC() {
  console.log("PVC");
  var stat = TYRANO.kag.stat.f;
  // Set values for vital monitor
  TYRANO.kag.stat.f.ecgQueType = "PVC";
  TYRANO.kag.stat.f.isEcgAddedQue = false;

  var random = randomRange(-3, 3);
  var randomMotion = randomRange(0, 1);

  playActorBeatMotion("PVC");
  playAtrialBeatMotion();
  playHeartBeatMotion("PVC", randomMotion.toString());
  playBeatSound();

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_sa_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.1));
  TYRANO.kag.ftag.master_tag.live2d_av_node_off.start();
  TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.3));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();

  playBeatSound(stat.heartRate - 60);

  // device lamp control
  TYRANO.kag.ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor((60000 / stat.heartRate) * 0.5));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor(60000 / stat.heartRate) * 1.5);

  // 心拍数の復元値を取得
  var maxRecoveryValue = 5;
  var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);

  // 心拍数の復元値の適用(会話中は復元しない) TODO: 関数に取り込む
  if (!TYRANO.kag.stat.f.onTalkEvent) {
    // 心臓負荷の増減
    TYRANO.kag.stat.f.burden += getIncreaseBurden(recoveryValue);
    TYRANO.kag.stat.f.burden -= getRecoveryBurden();

    // PVCが発生した場合心室に負荷をかける
    TYRANO.kag.stat.f.ventricleBurden =
      stat.ventricleBurden + Math.floor(stat.burden / 10) >= 100
        ? 100
        : stat.ventricleBurden + Math.floor(stat.burden / 10);

    if (stat.heartRate - stat.baseHeartRate >= 0) {
      TYRANO.kag.stat.f.heartRate -= recoveryValue;
      TYRANO.kag.stat.f.heartRateMin -= recoveryValue;
      TYRANO.kag.stat.f.heartRateMax -= recoveryValue;
    } else {
      TYRANO.kag.stat.f.heartRate += recoveryValue;
      TYRANO.kag.stat.f.heartRateMin += recoveryValue;
      TYRANO.kag.stat.f.heartRateMax += recoveryValue;
    }
  }

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    stat.heartRate + random <= stat.heartRateMax &&
    stat.heartRate + random >= stat.heartRateMin
  ) {
    stat.heartRate = stat.heartRate + random;
  }

  TYRANO.kag.stat.f.isPVC = true;
}

// VT
async function beatRhythmVT() {
  console.log("VT");
  var stat = TYRANO.kag.stat.f;

  // 発生回数
  // ventricleBurden[0, 100]の値によって[2, 4]の区間で変動
  var randomCount = randomRange(2, 2 + Math.ceil(stat.ventricleBurden * 0.02));

  // 心拍数を強制的に上昇させる
  var increaseRate = stat.countVT <= 1 ? 60 : 0;
  TYRANO.kag.stat.f.heartRate += increaseRate;
  TYRANO.kag.stat.f.heartRateMin += increaseRate;
  TYRANO.kag.stat.f.heartRateMax += increaseRate;

  console.log(increaseRate, stat.countVT);

  // 1回目は普通の鼓動
  TYRANO.kag.stat.f.ecgQueType = stat.countVT <= 0 ? "Normal" : "VT";
  TYRANO.kag.stat.f.isEcgAddedQue = false;

  var randomMotion = randomRange(0, 1);

  playActorBeatMotion();
  playHeartBeatMotion(
    stat.countVT <= 0 ? "Normal" : "VT",
    stat.countVT <= 0 ? "0" : randomMotion.toString(),
  );
  playBeatSound();

  // device lamp control
  stat.countVT <= 0
    ? TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start()
    : TYRANO.kag.ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor(60000 / stat.heartRate));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();

  if (stat.countVT >= randomCount) {
    // VTの終了処理
    TYRANO.kag.stat.f.heartRate = stat.atrialHeartRate;
    TYRANO.kag.stat.f.heartRateMin = stat.atrialHeartRate - 10;
    TYRANO.kag.stat.f.heartRateMax = stat.atrialHeartRate + 10;
    TYRANO.kag.stat.f.countVT = 0;
    TYRANO.kag.stat.f.isVT = false;
    TYRANO.kag.stat.f.isPVC = false;

    // 心拍数の復元値を取得
    var maxRecoveryValue = 5;
    var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);
    // 心臓負荷の増加
    TYRANO.kag.stat.f.ventricleBurden =
      stat.ventricleBurden + Math.floor(stat.burden / 5) >= 100
        ? 100
        : stat.ventricleBurden + Math.floor(stat.burden / 5);
    TYRANO.kag.stat.f.burden += getIncreaseBurden(recoveryValue);
    await sleep(Math.floor(60000 / stat.heartRate) * 1);
  } else {
    TYRANO.kag.stat.f.countVT++;
  }
}

async function atrialHeartbeat() {
  while (TYRANO.kag.stat.f.isAsyncAtrial && TYRANO.kag.stat.f.isVT) {
    var stat = TYRANO.kag.stat.f;
    playAtrialBeatMotion();
    await sleep(Math.floor(60000 / stat.atrialHeartRate));
  }
  TYRANO.kag.stat.f.isAsyncAtrial = false;
  return;
}

async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var stat = TYRANO.kag.stat.f;
    var random = randomRange(0, 100);

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update HR Display
    TYRANO.kag.ftag.master_tag.update_hr.start();

    // Update Debug Outputs
    TYRANO.kag.ftag.master_tag.update_debug_outputs.start();

    // cache prev heart rate
    TYRANO.kag.stat.f.prevHeartRate = stat.heartRate;

    // reaction event by ventricle burden
    reactionEventByBurdenHandler();

    // force VT
    if (stat.isVT) {
      await beatRhythmVT();

      // TODO: 重度の発作の場合
      // VT の場合、心房と心室の速度がずれるため心房用のループを非同期で回す
      // if (!stat.isAsyncAtrial) {
      //   TYRANO.kag.stat.f.isAsyncAtrial = true;
      //   atrialHeartbeat();
      // }
      continue;
    }

    // Arrhythmia caused by ventricle burden
    if (stat.ventricleBurden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.stat.f.atrialHeartRate = stat.heartRate;

      var randomForVentricleBurden = randomRange(0, 100);
      // 負荷が上がるごとに重度の発作の確率が上がる
      if (getActiveVTRate() > randomForVentricleBurden) {
        // VTの発生
        TYRANO.kag.stat.f.isVT = true;
      } else {
        await beatRhythmPVC();
      }
      continue;
    }

    // Arrhythmia caused by burden
    if (stat.burden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.stat.f.atrialHeartRate = stat.heartRate;
      await beatRhythmPVC();
      continue;
    }

    // Normal beat
    // Synchronize heartRate into atrialHeartRate
    TYRANO.kag.stat.f.atrialHeartRate = stat.heartRate;
    await beatRhythmNormal();
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

TYRANO.kag.ftag.master_tag.set_heart_rate = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    TYRANO.kag.stat.f.heartRate = value;
    TYRANO.kag.stat.f.heartRateMin = value - 10;
    TYRANO.kag.stat.f.heartRateMax = value + 10;

    if (!"true" == pm.isAsync) {
      TYRANO.kag.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.set_base_heart_rate = {
  kag: TYRANO.kag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    console.log(`baseHeartRate change to ${value}`);
    TYRANO.kag.stat.f.baseHeartRate = value;

    if (!"true" == pm.isAsync) {
      TYRANO.kag.ftag.nextOrder();
    }
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
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    var limit = parseInt(pm.limit);

    if (pm.operator === "+") {
      if (limit && TYRANO.kag.stat.f.heartRate + value >= limit) {
        if (pm.limitForce === "true") {
          console.log(
            `heartRate change ${TYRANO.kag.stat.f.heartRate} → ${limit}`,
          );
          TYRANO.kag.stat.f.heartRate = limit;
          TYRANO.kag.stat.f.heartRateMin = limit - 10;
          TYRANO.kag.stat.f.heartRateMax = limit + 10;
          return;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && TYRANO.kag.stat.f.heartRate + value < limit) || !limit) {
        console.log(
          `heartRate change ${TYRANO.kag.stat.f.heartRate} → ${TYRANO.kag.stat.f.heartRate + value}`,
        );
        TYRANO.kag.stat.f.heartRate += value;
        TYRANO.kag.stat.f.heartRateMin += value;
        TYRANO.kag.stat.f.heartRateMax += value;
        return;
      }
    }
    if (pm.operator === "-") {
      if (limit && TYRANO.kag.stat.f.heartRate - value <= limit) {
        if (pm.limitForce === "true") {
          console.log(
            `heartRate change ${TYRANO.kag.stat.f.heartRate} → ${limit}`,
          );
          TYRANO.kag.stat.f.heartRate = limit;
          TYRANO.kag.stat.f.heartRateMin = limit - 10;
          TYRANO.kag.stat.f.heartRateMax = limit + 10;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && TYRANO.kag.stat.f.heartRate - value > limit) || !limit) {
        console.log(
          `heartRate change ${TYRANO.kag.stat.f.heartRate} → ${TYRANO.kag.stat.f.heartRate - value}`,
        );
        TYRANO.kag.stat.f.heartRate -= value;
        TYRANO.kag.stat.f.heartRateMin -= value;
        TYRANO.kag.stat.f.heartRateMax -= value;
      }
    }

    if (!"true" == pm.isAsync) {
      TYRANO.kag.ftag.nextOrder();
    }
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
    TYRANO.kag.stat.f.beatVol = parseInt(vol);

    this.kag.ftag.nextOrder();
  },
};
