function touchEventHandler() {
  // display current mode to touch
  TYRANO.kag.ftag.master_tag.ptext.start({
    layer: "0",
    page: "fore",
    x: 20,
    y: 100,
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
  TYRANO.kag.ftag.startTag("jump", {
    storage: `touch_wait.ks`,
    target: `touch_wait`,
  });
}

function touchHeadEventHandler() {
  TYRANO.kag.ftag.startTag("jump", {
    storage: `touch_wait.ks`,
    target: `touch_head`,
  });
}

function touchEarEventHandler() {
  TYRANO.kag.ftag.startTag("jump", {
    storage: `touch_wait.ks`,
    target: `touch_ear`,
  });
}

function returnTouchEventHandler() {
  // display current mode to init
  TYRANO.kag.ftag.master_tag.ptext.start({
    layer: "0",
    page: "fore",
    x: 20,
    y: 100,
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
  TYRANO.kag.ftag.master_tag.set_visible_touch_event_area.start({
    visible: "false",
  });
  TYRANO.kag.ftag.startTag("jump", {
    storage: `scene1.ks`,
    target: `stand_by`,
  });
}
