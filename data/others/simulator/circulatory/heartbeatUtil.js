/**
 * 心拍数の復元値を取得する
 * @maxDeviationValue {number} 乖離値の上限
 * @maxRecoveryValue {number} 復元値の上限
 */
function getRecoveryHeartRate(maxDeviationValue, maxRecoveryValue) {
  var stat = TYRANO.kag.stat.f;
  // 乖離値(正常の心拍数からどれだけ離れているか)
  var deviationValue = Math.abs(stat.heartRate - stat.baseHeartRate);
  // 乖離率(乖離値が上限を超える場合は強制的に 1 とする)
  var deviationRate =
    deviationValue / maxDeviationValue > 1
      ? 1
      : deviationValue / maxDeviationValue;
  // 乖離率をsmoothStep関数を利用してまるめる
  var smoothDeviationRate = deviationRate ** 2 * (3 - 2 * deviationRate);
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  var recoveryValue = 10 ** (smoothDeviationRate - 1) * maxRecoveryValue;

  return recoveryValue;
}

/**
 * 負荷の増加値を取得する
 * @recoveryValue {number} 心拍数の復元値
 */
function getIncreaseBurden(recoveryValue) {
  var stat = TYRANO.kag.stat.f;
  var increaseValue = recoveryValue + stat.pressure / 100;

  return increaseValue + stat.burden >= 100 ? 0 : increaseValue;
}

/**
 * 負荷の復元値を取得する
 */
function getRecoveryBurden() {
  var stat = TYRANO.kag.stat.f;
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(stat.burden - 10);
  // 乖離率(乖離値が上限を超える場合は強制的に 1 とする)
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // 最大復元値は増加値より多めに設定する 増加値の最大は心拍数の復元値の最大値
  var recoveryValue = (10 ** (deviationRate - 1.2) + 0.1) * 5;

  return stat.burden - recoveryValue <= 10 ? 0 : recoveryValue;
}

/**
 * 心室の負荷の復元値を取得する
 */
function getRecoveryVentricleBurden(ventricleBurden) {
  var stat = TYRANO.kag.stat.f;
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(stat.ventricleBurden - 5);
  // 乖離率
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  var recoveryValue = (10 ** (deviationRate - 1.2) + 0.1) * 5;

  return stat.ventricleBurden - recoveryValue <= 5 ? 0 : recoveryValue;
}

/**
 * VTの発生率を取得する
 */
function getActiveVTRate() {
  var stat = TYRANO.kag.stat.f;
  var ventricleBurdenRate = stat.ventricleBurden / 100;
  var activeVTRate = 10 ** (ventricleBurdenRate - 1) * 100;

  return activeVTRate;
}
