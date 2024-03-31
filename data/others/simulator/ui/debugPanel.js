TYRANO.kag.ftag.master_tag.change_heart_rate_button = {
  pm: {
    color: "black",
    name: "",
    text: "",
    value: "0",
    operator: "+",
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
    var $button = $(
      "<div class='glink_button btn_20_black heart_rate_button'>" +
        pm.text +
        "</div>",
    );
    $button.css({
      position: "absolute",
      "z-index": 10000,
      left: `${pm.x}px`,
      top: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
      cursor: "pointer",
      "font-size": "16px",
    });
    $.setName($button, pm.name);
    this.setEvent($button, pm);
    target_layer.append($button);
    target_layer.show();
    TYRANO.kag.ftag.nextOrder();
  },
  setEvent: function ($button, pm) {
    !(function () {
      $button.click(function (event) {
        TYRANO.kag.ftag.master_tag.calculate_heartRate.start({
          value: pm.value,
          operator: pm.operator,
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
      x: 1160,
      y: 500,
      vertical: "false",
      text: `burden: ${Math.floor(TYRANO.kag.stat.f.burden)}`,
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
      x: 1160,
      y: 520,
      vertical: "false",
      text: `saBurden: ${Math.floor(TYRANO.kag.stat.f.saNodeBurden)}`,
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
      x: 1160,
      y: 540,
      vertical: "false",
      text: `avBurden: ${Math.floor(TYRANO.kag.stat.f.avNodeBurden)}`,
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
      x: 1160,
      y: 560,
      vertical: "false",
      text: `vBurden: ${Math.floor(TYRANO.kag.stat.f.ventricleBurden)}`,
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
      x: 1160,
      y: 580,
      vertical: "false",
      text: `stress: ${Math.floor(TYRANO.kag.stat.f.stress)}`,
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
      x: 1160,
      y: 600,
      vertical: "false",
      text: `pressure: ${Math.floor(TYRANO.kag.stat.f.pressure)}`,
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
      x: 1160,
      y: 620,
      vertical: "false",
      text: `deviceDmg: ${Math.floor(TYRANO.kag.stat.f.deviceDamage)}`,
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
