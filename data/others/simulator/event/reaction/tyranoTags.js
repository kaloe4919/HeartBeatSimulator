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
