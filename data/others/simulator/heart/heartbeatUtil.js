/**
 * 心拍数の復元値を取得する
 * @maxDeviationValue {number} 乖離値の上限
 * @maxRecoveryValue {number} 復元値の上限
 */
function getRecoveryHeartRate(maxDeviationValue, maxRecoveryValue) {
  var f = TYRANO.kag.stat.f;
  // 乖離値(正常の心拍数からどれだけ離れているか)
  var deviationValue = Math.abs(f.heartRate - f.baseHeartRate);
  // 乖離率(乖離値が上限を超える場合は強制的に 1 とする)
  var deviationRate =
    deviationValue / maxDeviationValue > 1
      ? 1
      : deviationValue / maxDeviationValue;
  // 乖離率をsmoothStep関数を利用してまるめる
  // graph: https://www.desmos.com/calculator/xodggesqsk
  var smoothDeviationRate = deviationRate ** 2 * (3 - 2 * deviationRate);
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // graph: https://www.desmos.com/calculator/znylagr48g
  var recoveryValue = 10 ** (smoothDeviationRate - 1) * maxRecoveryValue;

  return recoveryValue;
}

/**
 * 負荷の増加値を取得する
 * @recoveryValue {number} 心拍数の復元値
 */
function getIncreaseBurden(recoveryValue) {
  var f = TYRANO.kag.stat.f;
  var increaseValue = recoveryValue + f.pressure / 100;

  return increaseValue + f.burden >= 100 ? 0 : increaseValue;
}

/**
 * 負荷の復元値を取得する
 */
function getRecoveryBurden() {
  var f = TYRANO.kag.stat.f;
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(f.burden - 10);
  // 乖離率(乖離値が上限を超える場合は強制的に 1 とする)
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // graph: https://www.desmos.com/calculator/msdgh1dife
  var recoveryValue = (10 ** (deviationRate - 1.2) + 0.1) * 5;

  return f.burden - recoveryValue <= 10 ? 0 : recoveryValue;
}

/**
 * 心室の負荷の復元値を取得する
 */
function getRecoveryVentricleBurden() {
  var f = TYRANO.kag.stat.f;
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(f.ventricleBurden - 5);
  // 乖離率
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // graph: https://www.desmos.com/calculator/msdgh1dife
  var recoveryValue = (10 ** (deviationRate - 1.2) + 0.1) * 5;

  return f.ventricleBurden - recoveryValue <= 5 ? 0 : recoveryValue;
}

/**
 * AVノードの負荷の復元値を取得する
 */
function getRecoveryAvNodeBurden() {
  var f = TYRANO.kag.stat.f;
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(f.avNodeBurden - 5);
  // 乖離率
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // graph: https://www.desmos.com/calculator/msdgh1dife
  var recoveryValue = (10 ** (deviationRate - 1.2) + 0.1) * 5;

  return f.avNodeBurden - recoveryValue <= 5 ? 0 : recoveryValue;
}

/**
 * VTの発生率を取得する
 */
function getActiveVTRate() {
  var f = TYRANO.kag.stat.f;
  var ventricleBurdenRate = f.ventricleBurden / 100;
  var activeVTRate = 10 ** (ventricleBurdenRate - 1) * 100;

  return activeVTRate;
}
