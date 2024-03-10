TYRANO.kag.ftag.master_tag.talk_button = {
  pm: {
    color: "black",
    ext: "",
    name: "",
    text: "",
    value: "0",
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
      "<div class='glink_button talk_button'>" + pm.text + "</div>",
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

        // TODO: talk event
        console.log("onclick talk button");
        talkEventHandler();
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.action_button = {
  pm: {
    color: "black",
    ext: "",
    name: "",
    text: "",
    value: "0",
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
      "<div class='glink_button action_button'>" + pm.text + "</div>",
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

        // TODO: open action menu
        console.log("onclick action button");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.hacking_button = {
  pm: {
    color: "black",
    ext: "",
    name: "",
    text: "",
    value: "0",
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
      "<div class='glink_button hacking_button'>" + pm.text + "</div>",
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

        // TODO: open hacking menu
        console.log("onclick hacking button");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.option_button = {
  pm: {
    color: "black",
    ext: "",
    name: "",
    text: "",
    value: "0",
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
      "<div class='glink_button option_button'>" + pm.text + "</div>",
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

        // TODO: open option menu
        console.log("onclick option button");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_control_buttons = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".talk_button").css("display", config);
    $(".action_button").css("display", config);
    $(".hacking_button").css("display", config);
    $(".option_button").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
