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
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
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
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
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
    motionConfig.no = "2";
  }
  TYRANO.kag.ftag.master_tag.live2d_beat_motion.start(motionConfig);
}

function playHeartBeatMotion(cond, no, heartRate) {
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
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
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
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
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
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

  // 心拍数の復元値を取得
  var maxRecoveryValue = 4;
  var recoveryValue = getRecoveryHeartRate(
    65,
    heartStatus.heartRate,
    85,
    maxRecoveryValue,
  );

  // 心拍数の復元値の適用(会話中は復元しない)
  if (!TYRANO.kag.hbsim.variables.event.onTalkEvent) {
    // 心臓負荷の増減
    TYRANO.kag.hbsim.variables.heartStatus.burden += getIncreaseBurden(
      heartStatus.burden,
      recoveryValue,
    );
    TYRANO.kag.hbsim.variables.heartStatus.burden -= getRecoveryBurden(
      heartStatus.burden,
    );

    // 心室の負荷を軽減
    TYRANO.kag.hbsim.variables.heartStatus.ventricleBurden -=
      getRecoveryVentricleBurden(heartStatus.ventricleBurden);

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

  TYRANO.kag.hbsim.variables.heartStatus.isPVC = false;
}

// PVC
async function beatRhythmPVC() {
  console.log("PVC");
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
  // Set values for vital monitor
  TYRANO.kag.hbsim.variables.heartStatus.current = {
    type: "PVC",
    isAddedQue: false,
  };

  var random = randomRange(-3, 3);
  var randomMotion = randomRange(0, 1);

  playActorBeatMotion("PVC");
  playAtrialBeatMotion();
  playHeartBeatMotion("PVC", randomMotion.toString());
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

  // 心拍数の復元値を取得
  var maxRecoveryValue = 10;
  var recoveryValue = getRecoveryHeartRate(
    65,
    heartStatus.heartRate,
    85,
    maxRecoveryValue,
  );

  // 心拍数の復元値の適用(会話中は復元しない) TODO: 関数に取り込む
  if (!TYRANO.kag.hbsim.variables.event.onTalkEvent) {
    // 心臓負荷の増加
    TYRANO.kag.hbsim.variables.heartStatus.burden += getIncreaseBurden(
      heartStatus.burden,
      recoveryValue,
    );

    // PVCが発生した場合心室に負荷をかける
    TYRANO.kag.hbsim.variables.heartStatus.ventricleBurden =
      heartStatus.ventricleBurden + Math.floor(heartStatus.burden / 5) >= 100
        ? 100
        : heartStatus.ventricleBurden + Math.floor(heartStatus.burden / 5);

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
    heartStatus.heartRate = heartStatus.heartRate + random;
  }

  TYRANO.kag.hbsim.variables.heartStatus.isPVC = true;
}

// VT
async function beatRhythmVT() {
  console.log("VT");
  var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;

  // 発生回数
  // ventricleBurden[0, 100]の値によって[2, 5]の区間で変動
  var randomCount = randomRange(
    2,
    2 + Math.ceil(heartStatus.ventricleBurden * 0.03),
  );

  // 心拍数を強制的に上昇させる
  var increaseRate = heartStatus.countVT <= 1 ? 60 : 0;
  TYRANO.kag.hbsim.variables.heartStatus.heartRate += increaseRate;
  TYRANO.kag.hbsim.variables.heartStatus.heartRateMin += increaseRate;
  TYRANO.kag.hbsim.variables.heartStatus.heartRateMax += increaseRate;

  console.log(increaseRate, heartStatus.countVT);

  // 1回目は普通の鼓動
  TYRANO.kag.hbsim.variables.heartStatus.current = {
    type: heartStatus.countVT <= 0 ? "Normal" : "VT",
    isAddedQue: false,
  };

  var randomMotion = randomRange(0, 1);

  playActorBeatMotion();
  playHeartBeatMotion(
    heartStatus.countVT <= 0 ? "Normal" : "VT",
    heartStatus.countVT <= 0 ? "0" : randomMotion.toString(),
  );
  playBeatSound();

  // device lamp control
  heartStatus.countVT <= 0
    ? TYRANO.kag.ftag.master_tag.live2d_ventricle_normal_on.start()
    : TYRANO.kag.ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor(60000 / heartStatus.heartRate));
  TYRANO.kag.ftag.master_tag.live2d_ventricle_off.start();

  if (heartStatus.countVT >= randomCount) {
    // VTの終了処理
    TYRANO.kag.hbsim.variables.heartStatus.heartRate =
      heartStatus.atrialHeartRate;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMin =
      heartStatus.atrialHeartRate - 10;
    TYRANO.kag.hbsim.variables.heartStatus.heartRateMax =
      heartStatus.atrialHeartRate + 10;
    TYRANO.kag.hbsim.variables.heartStatus.countVT = 0;
    TYRANO.kag.hbsim.variables.heartStatus.isVT = false;
    TYRANO.kag.hbsim.variables.heartStatus.isPVC = false;

    // 心拍数の復元値を取得
    var maxRecoveryValue = 10;
    var recoveryValue = getRecoveryHeartRate(
      65,
      heartStatus.heartRate,
      85,
      maxRecoveryValue,
    );
    // 心臓負荷の増加

    TYRANO.kag.hbsim.variables.heartStatus.ventricleBurden = Math.floor(
      heartStatus.ventricleBurden / 2,
    );
    TYRANO.kag.hbsim.variables.heartStatus.burden += getIncreaseBurden(
      heartStatus.burden,
      recoveryValue,
    );
    await sleep(Math.floor(60000 / heartStatus.heartRate) * 1.5);
  } else {
    TYRANO.kag.hbsim.variables.heartStatus.countVT++;
  }
}

async function atrialHeartbeat() {
  while (
    TYRANO.kag.hbsim.variables.heartStatus.isAsyncAtrial &&
    TYRANO.kag.hbsim.variables.heartStatus.isVT
  ) {
    var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
    playAtrialBeatMotion();
    await sleep(Math.floor(60000 / heartStatus.atrialHeartRate));
  }
  TYRANO.kag.hbsim.variables.heartStatus.isAsyncAtrial = false;
  return;
}

async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var heartStatus = TYRANO.kag.hbsim.variables.heartStatus;
    var random = randomRange(0, 100);

    // Update expression
    TYRANO.kag.hbsim.expression.update();

    // Update HR Display
    TYRANO.kag.ftag.master_tag.update_hr.start();

    // Update Debug Outputs
    TYRANO.kag.ftag.master_tag.update_debug_outputs.start();

    // cache prev heart rate
    TYRANO.kag.hbsim.variables.heartStatus.prevHeartRate =
      heartStatus.heartRate;

    // force VT
    if (heartStatus.isVT) {
      await beatRhythmVT();

      // TODO: 重度の発作の場合
      // VT の場合、心房と心室の速度がずれるため心房用のループを非同期で回す
      // if (!heartStatus.isAsyncAtrial) {
      //   TYRANO.kag.hbsim.variables.heartStatus.isAsyncAtrial = true;
      //   atrialHeartbeat();
      // }
      continue;
    }

    // Arrhythmia caused by ventricle burden
    if (heartStatus.ventricleBurden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.hbsim.variables.heartStatus.atrialHeartRate =
        heartStatus.heartRate;

      var randomForVentricleBurden = randomRange(0, 100);
      // 負荷が上がるごとに重度の発作の確率が上がる
      if (
        getActiveVTRate(heartStatus.ventricleBurden) > randomForVentricleBurden
      ) {
        // VTの発生
        TYRANO.kag.hbsim.variables.heartStatus.isVT = true;
      } else {
        await beatRhythmPVC();
      }
      continue;
    }

    // Arrhythmia caused by burden
    if (heartStatus.burden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      TYRANO.kag.hbsim.variables.heartStatus.atrialHeartRate =
        heartStatus.heartRate;
      await beatRhythmPVC();
      continue;
    }

    // Normal beat
    // Synchronize heartRate into atrialHeartRate
    TYRANO.kag.hbsim.variables.heartStatus.atrialHeartRate =
      heartStatus.heartRate;
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
    isAsync: "false",
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

    if (!"true" == pm.isAsync) {
      TYRANO.kag.ftag.nextOrder();
    }
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
