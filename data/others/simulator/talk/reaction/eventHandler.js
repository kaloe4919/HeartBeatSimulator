function setStatAfterInterval(second, variableKey, variableValue) {
  var count = 1;
  var intervalId = setInterval(() => {
    if (count >= second) {
      TYRANO.kag.stat.f[variableKey] = variableValue;
      clearInterval(intervalId);
    }
    // console.log(
    //   count,
    //   variableKey,
    //   TYRANO.kag.stat.f[variableKey],
    //   TYRANO.kag.stat.f.waitSceneName,
    // );
    count++;
  }, 1000);
}

function reactionEventByBurdenHandler() {
  var f = TYRANO.kag.stat.f;

  // トークイベント中・リアクションイベント中・イベントのクールタイム中の場合はリアクションイベントを発生させない
  if (f.onTalkEvent || f.onReactionEvent || f.isDuringCoolTime) {
    return;
  }

  // TODO: 発生条件見直す
  // 中度の心室負荷
  if (f.ventricleBurden < 30) {
    if (f.burden >= 60) {
      TYRANO.kag.ftag.startTag("jump", {
        storage: "reaction_burden_medium.ks",
        target: "reaction_burden_medium_event",
      });
    }
  } else if (f.ventricleBurden >= 30 && f.ventricleBurden < 60) {
    TYRANO.kag.ftag.startTag("jump", {
      storage: "reaction_burden_medium.ks",
      target: "reaction_burden_medium_event",
    });
  }
  // 重度の心室負荷
  else if (f.ventricleBurden >= 60) {
    TYRANO.kag.ftag.startTag("jump", {
      storage: "reaction_burden_heavy.ks",
      target: "reaction_burden_heavy_event",
    });
  }

  // クールタイム設定 20秒
  f.isDuringCoolTime = true;
  setStatAfterInterval(20, "isDuringCoolTime", false);
}

TYRANO.kag.ftag.master_tag.start_reaction_event = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  pm: {},
  start: function (pm) {
    console.log(`start talk event`);
    this.f.onReactionEvent = true;

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.end_reaction_event = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  pm: {},
  start: function (pm) {
    console.log(`stop talk event`);
    this.f.onReactionEvent = false;

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_wait_scene_name = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  pm: { sceneName: "scene1" },
  start: function (pm) {
    console.log(`reaction event from ${pm.sceneName}`);
    this.f.waitSceneName = pm.sceneName;

    this.ftag.nextOrder();
  },
};
