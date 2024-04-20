function talkEventHandler() {
  var ftag = TYRANO.kag.ftag;

  // TODO: 心拍数によって発生する会話を変える
  var random = randomRange(1, 4);
  ftag.startTag("jump", {
    storage: `talk_normal${random}.ks`,
    target: `talk_normal${random}`,
  });
}
