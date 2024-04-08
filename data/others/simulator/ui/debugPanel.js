TYRANO.kag.ftag.master_tag.change_heart_rate_button = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
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
    var target_layer = this.layer.getLayer("fix");
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
    this.ftag.nextOrder();
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
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".heart_rate_button").css("display", config);

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_debug_outputs = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 500,
      vertical: "false",
      text: `burden: ${Math.floor(this.f.burden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "burden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 520,
      vertical: "false",
      text: `saBurden: ${Math.floor(this.f.saNodeBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "saNodeBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 540,
      vertical: "false",
      text: `avBurden: ${Math.floor(this.f.avNodeBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "avNodeBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 560,
      vertical: "false",
      text: `vBurden: ${Math.floor(this.f.ventricleBurden)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "ventricleBurden",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 580,
      vertical: "false",
      text: `stress: ${Math.floor(this.f.stress)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "stress",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 600,
      vertical: "false",
      text: `pressure: ${Math.floor(this.f.pressure)}`,
      size: "12",
      hexColor: "#fff",
      bold: "bold",
      align: "left",
      name: "pressure",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1160,
      y: 620,
      vertical: "false",
      text: `deviceDmg: ${Math.floor(this.f.deviceDamage)}`,
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
