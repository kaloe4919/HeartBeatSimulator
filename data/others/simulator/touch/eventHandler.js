function touchEventHandler() {
  var ftag = TYRANO.kag.ftag;

  // display current mode to touch
  ftag.master_tag.ptext.start({
    layer: "0",
    page: "fore",
    x: 152,
    y: 118,
    vertical: "false",
    text: "触るモード",
    size: "18",
    hexColor: "#fff",
    bold: "bold",
    align: "left",
    name: "mode",
    zindex: "9999",
    overwrite: "true",
    isAsync: "true",
  });
  ftag.startTag("jump", {
    storage: `touch.ks`,
    target: `touch_wait`,
  });
}

function touchHeadEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_head.ks`,
    target: `touch_head_event`,
  });
}

function touchEarEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_ear.ks`,
    target: `touch_ear_event`,
  });
}

function touchNeckEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_neck.ks`,
    target: `touch_neck_event`,
  });
}

function touchChestEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_chest.ks`,
    target: `touch_chest_event`,
  });
}

function stopTouchChestEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_chest.ks`,
    target: `stop_touch_chest`,
  });
}

function touchChestCompressEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_chest_compress.ks`,
    target: `touch_chest_compress_event`,
  });
}

function stopTouchChestCompressEventHandler() {
  var ftag = TYRANO.kag.ftag;
  ftag.startTag("jump", {
    storage: `touch_chest_compress.ks`,
    target: `stop_touch_chest_compress`,
  });
}

function returnTouchEventHandler() {
  var ftag = TYRANO.kag.ftag;

  // display current mode to init
  ftag.master_tag.ptext.start({
    layer: "0",
    page: "fore",
    x: 152,
    y: 118,
    vertical: "false",
    text: "",
    size: "18",
    hexColor: "#fff",
    bold: "bold",
    align: "left",
    name: "mode",
    zindex: "9999",
    overwrite: "true",
    isAsync: "true",
  });
  // hide touch area
  ftag.master_tag.set_visible_touch_event_area.start({
    visible: "false",
  });
  ftag.startTag("jump", {
    storage: `scene1.ks`,
    target: `scene1_wait`,
  });
}
