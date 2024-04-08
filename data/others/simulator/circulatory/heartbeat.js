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
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;
  // If heartRate is assigned, force playback at this heartRate
  var playHeartRate = heartRate ? heartRate : f.heartRate;
  var soundFileType = ".wav";
  var soundConfig = {
    volume: f.beatVol,
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

  ftag.startTag("playse", soundConfig);

  bufCounter();
}

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

// Normal beat
async function beatRhythmNormal() {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  // Set values for vital monitor
  f.ecgQueType = "Normal";
  f.isEcgAddedQue = false;

  var random = randomRange(-3, 3);
  playActorBeatMotion();
  playAtrialBeatMotion();
  playHeartBeatMotion();
  playBeatSound();

  // device lamp control
  ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.1));
  ftag.master_tag.live2d_sa_node_off.start();
  ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.1));
  ftag.master_tag.live2d_av_node_off.start();
  ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.6));
  ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.2));

  // 心拍数の復元値を取得
  var maxRecoveryValue = 3;
  var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);

  // 心拍数の復元値の適用(会話中は復元しない)
  if (!f.onTalkEvent) {
    // 心臓負荷の増減
    f.burden += getIncreaseBurden(recoveryValue);
    f.burden -= getRecoveryBurden();

    // 心室の負荷を軽減
    f.ventricleBurden -= getRecoveryVentricleBurden();

    if (f.heartRate - f.baseHeartRate >= 0) {
      f.heartRate -= recoveryValue;
      f.heartRateMin -= recoveryValue;
      f.heartRateMax -= recoveryValue;
    } else {
      f.heartRate += recoveryValue;
      f.heartRateMin += recoveryValue;
      f.heartRateMax += recoveryValue;
    }
  }

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    f.heartRate + random <= f.heartRateMax &&
    f.heartRate + random >= f.heartRateMin
  ) {
    f.heartRate = f.heartRate + random;
  }

  f.isPVC = false;
}

// PVC
async function beatRhythmPVC() {
  console.log("PVC");
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  // Set values for vital monitor
  f.ecgQueType = "PVC";
  f.isEcgAddedQue = false;

  var random = randomRange(-3, 3);
  var randomMotion = randomRange(0, 1);

  playActorBeatMotion("PVC");
  playAtrialBeatMotion();
  playHeartBeatMotion("PVC", randomMotion.toString());
  playBeatSound();

  // device lamp control
  ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.1));
  ftag.master_tag.live2d_sa_node_off.start();
  ftag.master_tag.live2d_av_node_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.1));
  ftag.master_tag.live2d_av_node_off.start();
  ftag.master_tag.live2d_ventricle_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.3));
  ftag.master_tag.live2d_ventricle_off.start();

  playBeatSound(f.heartRate - 60);

  // device lamp control
  ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.5));
  ftag.master_tag.live2d_ventricle_off.start();
  await sleep(Math.floor(60000 / f.heartRate) * 1.5);

  // 心拍数の復元値を取得
  var maxRecoveryValue = 5;
  var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);

  // 心拍数の復元値の適用(会話中は復元しない) TODO: 関数に取り込む
  if (!f.onTalkEvent) {
    // 心臓負荷の増減
    f.burden += getIncreaseBurden(recoveryValue);
    f.burden -= getRecoveryBurden();

    // PVCが発生した場合心室に負荷をかける
    f.ventricleBurden =
      f.ventricleBurden + Math.floor(f.burden / 10) >= 100
        ? 100
        : f.ventricleBurden + Math.floor(f.burden / 10);

    if (f.heartRate - f.baseHeartRate >= 0) {
      f.heartRate -= recoveryValue;
      f.heartRateMin -= recoveryValue;
      f.heartRateMax -= recoveryValue;
    } else {
      f.heartRate += recoveryValue;
      f.heartRateMin += recoveryValue;
      f.heartRateMax += recoveryValue;
    }
  }

  // Slight variation in heartRate (Between heartRateMin and heartRateMax)
  if (
    f.heartRate + random <= f.heartRateMax &&
    f.heartRate + random >= f.heartRateMin
  ) {
    f.heartRate = f.heartRate + random;
  }

  f.isPVC = true;
}

// VT
async function beatRhythmVT() {
  console.log("VT");
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  // 発生回数
  // ventricleBurden[0, 100]の値によって[2, 4]の区間で変動
  var randomCount = randomRange(2, 2 + Math.ceil(f.ventricleBurden * 0.02));

  // 心拍数を強制的に上昇させる
  var increaseRate = f.countVT <= 1 ? 60 : 0;
  f.heartRate += increaseRate;
  f.heartRateMin += increaseRate;
  f.heartRateMax += increaseRate;

  console.log(increaseRate, f.countVT);

  // 1回目は普通の鼓動
  f.ecgQueType = f.countVT <= 0 ? "Normal" : "VT";
  f.isEcgAddedQue = false;

  var randomMotion = randomRange(0, 1);

  playActorBeatMotion();
  playHeartBeatMotion(
    f.countVT <= 0 ? "Normal" : "VT",
    f.countVT <= 0 ? "0" : randomMotion.toString(),
  );
  playBeatSound();

  // device lamp control
  f.countVT <= 0
    ? ftag.master_tag.live2d_ventricle_normal_on.start()
    : ftag.master_tag.live2d_ventricle_warn_on.start();
  await sleep(Math.floor(60000 / f.heartRate));
  ftag.master_tag.live2d_ventricle_off.start();

  if (f.countVT >= randomCount) {
    // VTの終了処理
    f.heartRate = f.atrialHeartRate;
    f.heartRateMin = f.atrialHeartRate - 10;
    f.heartRateMax = f.atrialHeartRate + 10;
    f.countVT = 0;
    f.isVT = false;
    f.isPVC = false;

    // 心拍数の復元値を取得
    var maxRecoveryValue = 5;
    var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);
    // 心臓負荷の増加
    f.ventricleBurden =
      f.ventricleBurden + Math.floor(f.burden / 5) >= 100
        ? 100
        : f.ventricleBurden + Math.floor(f.burden / 5);
    f.burden += getIncreaseBurden(recoveryValue);
    await sleep(Math.floor(60000 / f.heartRate) * 1);
  } else {
    f.countVT++;
  }
}

async function atrialHeartbeat() {
  var f = TYRANO.kag.stat.f;

  while (f.isAsyncAtrial && f.isVT) {
    playAtrialBeatMotion();
    await sleep(Math.floor(60000 / f.atrialHeartRate));
  }
  f.isAsyncAtrial = false;
  return;
}

async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var f = TYRANO.kag.stat.f;
    var ftag = TYRANO.kag.ftag;
    var hbsim = TYRANO.kag.hbsim;
    var random = randomRange(0, 100);

    // Update expression
    hbsim.expression.update();

    // Update HR Display
    ftag.master_tag.update_hr.start();

    // Update Debug Outputs
    ftag.master_tag.update_debug_outputs.start();

    // cache prev heart rate
    f.prevHeartRate = f.heartRate;

    // reaction event by ventricle burden
    reactionEventByBurdenHandler();

    // force VT
    if (f.isVT) {
      await beatRhythmVT();

      // TODO: 重度の発作の場合
      // VT の場合、心房と心室の速度がずれるため心房用のループを非同期で回す
      // if (!f.isAsyncAtrial) {
      //   f.isAsyncAtrial = true;
      //   atrialHeartbeat();
      // }
      continue;
    }

    // Arrhythmia caused by ventricle burden
    if (f.ventricleBurden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      f.atrialHeartRate = f.heartRate;

      var randomForVentricleBurden = randomRange(0, 100);
      // 負荷が上がるごとに重度の発作の確率が上がる
      if (getActiveVTRate() > randomForVentricleBurden) {
        // VTの発生
        f.isVT = true;
      } else {
        await beatRhythmPVC();
      }
      continue;
    }

    // Arrhythmia caused by burden
    if (f.burden / 2 > random) {
      // Synchronize heartRate into atrialHeartRate
      f.atrialHeartRate = f.heartRate;
      await beatRhythmPVC();
      continue;
    }

    // Normal beat
    // Synchronize heartRate into atrialHeartRate
    f.atrialHeartRate = f.heartRate;
    await beatRhythmNormal();
  }
}

TYRANO.kag.ftag.master_tag.heartbeat_start = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    heartbeat();

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_heart_rate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    this.f.heartRate = value;
    this.f.heartRateMin = value - 10;
    this.f.heartRateMax = value + 10;

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.set_base_heart_rate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    console.log(`baseHeartRate change to ${value}`);
    this.f.baseHeartRate = value;

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.calculate_heartRate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
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
      if (limit && this.f.heartRate + value >= limit) {
        if (pm.limitForce === "true") {
          console.log(`heartRate change ${this.f.heartRate} → ${limit}`);
          this.f.heartRate = limit;
          this.f.heartRateMin = limit - 10;
          this.f.heartRateMax = limit + 10;
          return;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && this.f.heartRate + value < limit) || !limit) {
        console.log(
          `heartRate change ${this.f.heartRate} → ${this.f.heartRate + value}`,
        );
        this.f.heartRate += value;
        this.f.heartRateMin += value;
        this.f.heartRateMax += value;
        return;
      }
    }
    if (pm.operator === "-") {
      if (limit && this.f.heartRate - value <= limit) {
        if (pm.limitForce === "true") {
          console.log(`heartRate change ${this.f.heartRate} → ${limit}`);
          this.f.heartRate = limit;
          this.f.heartRateMin = limit - 10;
          this.f.heartRateMax = limit + 10;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && this.f.heartRate - value > limit) || !limit) {
        console.log(
          `heartRate change ${this.f.heartRate} → ${this.f.heartRate - value}`,
        );
        this.f.heartRate -= value;
        this.f.heartRateMin -= value;
        this.f.heartRateMax -= value;
      }
    }

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.set_heart_se_vol = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["vol"],
  pm: {
    vol: "75",
  },
  start: function (pm) {
    // TODO: 心音OFFの場合は強制的に0にする
    var vol = parseInt(pm.vol);
    console.log(`set heart beat se volume to ${vol}`);
    this.f.beatVol = parseInt(vol);

    this.ftag.nextOrder();
  },
};
