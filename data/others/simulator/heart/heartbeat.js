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

    // AVノードの負荷を軽減
    f.avNodeBurden -= getRecoveryAvNodeBurden();

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

// AV block
async function beatRhythmAVBlock() {
  console.log("AVBlock");

  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  // Set values for vital monitor
  f.ecgQueType = "AVBlock";
  f.isEcgAddedQue = false;

  var random = randomRange(-3, 3);

  playAtrialBeatMotion();

  // device lamp control
  ftag.master_tag.live2d_sa_node_normal_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.1));
  ftag.master_tag.live2d_sa_node_off.start();
  ftag.master_tag.live2d_av_node_warn_on.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.7));
  ftag.master_tag.live2d_av_node_off.start();
  await sleep(Math.floor((60000 / f.heartRate) * 0.2));

  // 心拍数の復元値を取得
  var maxRecoveryValue = 3;
  var recoveryValue = getRecoveryHeartRate(100, maxRecoveryValue);

  // 心拍数の復元値の適用(会話中は復元しない) TODO: 関数に取り込む
  if (!f.onTalkEvent) {
    // 心臓負荷の増減
    f.burden += getIncreaseBurden(recoveryValue);
    f.burden -= getRecoveryBurden();

    // AV Blockが発生した場合AVノードに負荷をかける
    f.avNodeBurden =
      f.avNodeBurden + Math.floor(f.burden / 10) >= 100
        ? 100
        : f.avNodeBurden + Math.floor(f.burden / 10);

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
}

// main loop of atrial beat
async function atrialHeartbeat() {
  var f = TYRANO.kag.stat.f;

  while (f.isAsyncAtrial && f.isVT) {
    playAtrialBeatMotion();
    await sleep(Math.floor(60000 / f.atrialHeartRate));
  }
  f.isAsyncAtrial = false;
  return;
}

// main loop of ventricle beat
async function heartbeat() {
  var isDefinedHeartRate = true;
  while (isDefinedHeartRate) {
    var f = TYRANO.kag.stat.f;
    var ftag = TYRANO.kag.ftag;
    var hbsim = TYRANO.kag.hbsim;

    // Update expression
    updateExpression();

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

    // Arrhythmia caused by burden
    if (f.burden / 2.5 > randomRange(0, 100)) {
      // Synchronize heartRate into atrialHeartRate
      f.atrialHeartRate = f.heartRate;
      await beatRhythmPVC();
      continue;
    }

    // Arrhythmia caused by ventricle burden
    if (f.ventricleBurden / 2.5 > randomRange(0, 100)) {
      // Synchronize heartRate into atrialHeartRate
      f.atrialHeartRate = f.heartRate;

      // 負荷が上がるごとに重度の発作の確率が上がる
      if (getActiveVTRate() > randomRange(0, 100)) {
        // VTの発生
        f.isVT = true;
      } else {
        await beatRhythmPVC();
      }
      continue;
    }

    // Arrhythmia caused by av node burden
    if (f.avNodeBurden / 2.5 > randomRange(0, 100)) {
      // 負荷が上がるごとに重度の発作の確率が上がる
      if (false) {
        // TODO: 軽いAfの発生
        // burden・hrが高い場合に高確率で発生させる
      } else {
        await beatRhythmAVBlock();
      }
      continue;
    }

    // Normal beat
    // Synchronize heartRate into atrialHeartRate
    f.atrialHeartRate = f.heartRate;
    await beatRhythmNormal();
  }
}
