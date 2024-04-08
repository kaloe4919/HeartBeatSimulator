function talkEventHandler() {
  var ftag = TYRANO.kag.ftag;

  // TODO: 心拍数によって発生する会話を変える
  var random = randomRange(1, 4);
  ftag.startTag("jump", {
    storage: `talk_normal${random}.ks`,
    target: `talk_normal${random}`,
  });
}

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
