TYRANO.kag.ftag.master_tag.change_heart_rate_button = {
  pm: {
    color: "black",
    ext: "",
    name: "",
    text: "",
    value: "0",
    operator: "+",
    x: "",
    y: "",
    width: "",
    height: "",
    size: "30",
    fix: "false",
    exp: "",
    prevar: "",
    visible: "true",
    clickse: "",
    enterse: "",
    leavese: "",
    auto_next: "yes",
  },
  start: function (pm) {
    var target_layer = null;
    "false" == pm.fix
      ? (target_layer = TYRANO.kag.layer.getFreeLayer()).css("z-index", 999999)
      : (target_layer = TYRANO.kag.layer.getLayer("fix"));
    var j_button = $(
      "<div class='glink_button heart_rate_button'>" + pm.text + "</div>",
    );
    j_button.css("position", "absolute");
    j_button.css("cursor", "pointer");
    j_button.css("z-index", 99999999);
    j_button.css("font-size", pm.size + "px");
    j_button.addClass(pm.color);
    "true" == pm.visible ? j_button.show() : j_button.hide();
    "" == pm.x
      ? j_button.css("left", TYRANO.kag.stat.locate.x + "px")
      : j_button.css("left", pm.x + "px");
    "" == pm.y
      ? j_button.css("top", TYRANO.kag.stat.locate.y + "px")
      : j_button.css("top", pm.y + "px");
    "false" != pm.fix && j_button.addClass("fixlayer");
    "" != pm.width && j_button.css("width", pm.width + "px");
    "" != pm.height && j_button.css("height", pm.height + "px");
    $.setName(j_button, pm.name);
    this.setEvent(j_button, pm);
    target_layer.append(j_button);
    "false" == pm.fix && target_layer.show();
    TYRANO.kag.ftag.nextOrder();
  },
  setEvent: function (j_button, pm) {
    !(function () {
      var _pm = pm;
      j_button.hover(
        function () {
          "" != _pm.enterse &&
            TYRANO.kag.ftag.startTag("playse", {
              storage: _pm.enterse,
              stop: !0,
            });
        },
        function () {
          "" != _pm.leavese &&
            TYRANO.kag.ftag.startTag("playse", {
              storage: _pm.leavese,
              stop: !0,
            });
        },
      );
      j_button.click(function (event) {
        "" != _pm.clickse &&
          that.kag.ftag.startTag("playse", { storage: _pm.clickse, stop: !0 });
        TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
          value: _pm.value,
          operator: _pm.operator,
        });
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_debug_buttons = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".heart_rate_button").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_debug_outputs = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 500,
      vertical: "false",
      text: `burden: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.burden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "burden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 520,
      vertical: "false",
      text: `saBurden: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.saNodeBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "saNodeBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 540,
      vertical: "false",
      text: `avBurden: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.avNodeBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "avNodeBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 560,
      vertical: "false",
      text: `vBurden: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.ventricleBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "ventricleBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 580,
      vertical: "false",
      text: `stress: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.stress)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "stress",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 600,
      vertical: "false",
      text: `pressure: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.pressure)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "pressure",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1110,
      y: 620,
      vertical: "false",
      text: `deviceDmg: ${Math.floor(TYRANO.kag.hbsim.variables.heartStatus.deviceDamage)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "deviceDmg",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
  },
};
