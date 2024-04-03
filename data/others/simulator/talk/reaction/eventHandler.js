function setStatAfterInterval(second, variableKey, variableValue) {
  var count = 1;
  var intervalId = setInterval(() => {
    if (count >= second) {
      TYRANO.kag.stat.f[variableKey] = variableValue;
      clearInterval(intervalId);
    }
    count++;
  }, 1000);
}

function reactionEventByBurdenHandler() {
  var stat = TYRANO.kag.stat.f;

  // トークイベント中・リアクションイベント中・イベントのクールタイム中の場合はリアクションイベントを発生させない
  if (stat.onTalkEvent || stat.onReactionEvent || stat.isDuringCoolTime) {
    return;
  }

  // 軽度の心臓負荷
  if (stat.ventricleBurden >= 30 && stat.ventricleBurden < 50) {
    TYRANO.kag.ftag.startTag("jump", {
      storage: "reaction_burden_light.ks",
      target: "reaction_burden_light_event",
    });
  }
  // 中度の心臓負荷
  if (stat.ventricleBurden >= 50 && stat.ventricleBurden < 70) {
    TYRANO.kag.ftag.startTag("jump", {
      storage: "reaction_burden_medium.ks",
      target: "reaction_burden_medium_event",
    });
  }
  // 重度の心臓負荷
  if (stat.ventricleBurden >= 70) {
    TYRANO.kag.ftag.startTag("jump", {
      storage: "reaction_burden_heavy.ks",
      target: "reaction_burden_heavy_event",
    });
  }
}
