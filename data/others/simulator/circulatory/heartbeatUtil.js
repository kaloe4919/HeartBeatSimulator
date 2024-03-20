/**
 * 心拍数の復元値を取得する
 * @baseHeartRate {number} 心拍数の初期値
 * @heartRate {number} 現在の心拍数
 * @maxDeviationValue {number} 乖離値の上限
 * @maxRecoveryValue {number} 復元値の上限
 */
function getRecoveryHeartRate(
  baseHeartRate,
  heartRate,
  maxDeviationValue,
  maxRecoveryValue,
) {
  // 乖離値(正常の心拍数からどれだけ離れているか)
  var deviationValue = Math.abs(heartRate - baseHeartRate);
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
 * @burden {number} 負荷
 * @recoveryValue {number} 心拍数の復元値
 */
function getIncreaseBurden(burden, recoveryValue) {
  var increaseValue = recoveryValue;

  return increaseValue + burden >= 100 ? 0 : increaseValue;
}

/**
 * 負荷の復元値を取得する
 * @burden {number} 負荷
 */
function getRecoveryBurden(burden) {
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(burden - 10);
  // 乖離率(乖離値が上限を超える場合は強制的に 1 とする)
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  // 最大復元値は増加値より多めに設定する 増加値の最大は心拍数の復元値の最大値
  var recoveryValue = (10 ** (deviationRate - 1.5) + 0.2) * 5;

  return burden - recoveryValue <= 10 ? 0 : recoveryValue;
}

/**
 * 心室の負荷の復元値を取得する
 * @ventricleBurden {number} 心室の負荷
 */
function getRecoveryVentricleBurden(ventricleBurden) {
  // 乖離値(正常の負荷からどれだけ離れているか)
  var deviationValue = Math.abs(ventricleBurden - 5);
  // 乖離率
  var deviationRate = deviationValue / 100;
  // 指数関数を利用して乖離率が高いほど復元が大きくなるようにする
  var recoveryValue = (10 ** (deviationRate - 1.5) + 0.1) * 5;

  return ventricleBurden - recoveryValue <= 5 ? 0 : recoveryValue;
}

/**
 * VTの発生率を取得する
 * @ventricleBurden {number} 心室の負荷
 */
function getActiveVTRate(ventricleBurden) {
  var ventricleBurdenRate = ventricleBurden / 100;
  var activeVTRate = 10 ** (ventricleBurdenRate - 1) * 100;

  console.log(activeVTRate);

  return activeVTRate;
}
