TYRANO.kag.ftag.master_tag.start_talk_event = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  pm: {},
  start: function (pm) {
    console.log(`start talk event`);
    this.f.onTalkEvent = true;

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.end_talk_event = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  pm: {},
  start: function (pm) {
    console.log(`stop talk event`);
    this.f.onTalkEvent = false;

    this.ftag.nextOrder();
  },
};
