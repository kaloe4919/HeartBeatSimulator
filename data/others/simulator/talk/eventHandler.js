function talkEventHandler() {
  TYRANO.kag.ftag.startTag("jump", {
    storage: "talk_normal1.ks",
    target: "talk_normal1",
  });
}

TYRANO.kag.ftag.master_tag.start_talk_event = {
  kag: TYRANO.kag,
  pm: {},
  start: function (pm) {
    console.log(`start talk event`);
    TYRANO.kag.hbsim.variables.event.onTalkEvent = true;

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.end_talk_event = {
  kag: TYRANO.kag,
  pm: {},
  start: function (pm) {
    console.log(`stop talk event`);
    TYRANO.kag.hbsim.variables.event.onTalkEvent = false;

    this.kag.ftag.nextOrder();
  },
};
