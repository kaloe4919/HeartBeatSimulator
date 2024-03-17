function getRecoveryHeartRate(
  baseHeartRate, // 心拍数の初期値
  heartRate, // 現在の心拍数
  maxDeviationValue, // 乖離値の上限
  maxRecoveryValue, // 復元値の上限
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
  // 指数関数を利用して乖離率が高いほど心拍数の復元が大きくなるようにする
  var recoveryValue =
    (10 ** (smoothDeviationRate * 2 - 2.1) + 0.05) * maxRecoveryValue;

  return recoveryValue;
}
