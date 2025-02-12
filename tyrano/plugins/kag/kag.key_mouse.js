tyrano.plugin.kag.key_mouse = {
  kag: null,
  keyconfig: { key: {} },
  map_key: {},
  map_mouse: {},
  map_ges: {},
  is_swipe: !1,
  timeoutId: 0,
  is_keydown: !1,
  start_point: { x: 0, y: 0 },
  end_point: { x: 0, y: 0 },
  init: function () {
    var that = this;
    "undefined" == typeof __tyrano_key_config &&
      (__tyrano_key_config = {
        key: {
          32: "hidemessage",
          13: "next",
          91: "skip",
          17: "skip",
          67: function () {},
        },
        mouse: {
          right: "hidemessage",
          center: "menu",
          wheel_up: "backlog",
          wheel_down: "next",
        },
        gesture: {
          swipe_up_1: { action: "backlog" },
          swipe_left_1: { action: "auto" },
          swipe_right_1: { action: "menu" },
          swipe_down_1: { action: "load" },
          hold: { action: "skip" },
        },
      });
    this.keyconfig = __tyrano_key_config;
    this.map_key = this.keyconfig.key;
    this.map_mouse = this.keyconfig.mouse;
    this.map_ges = this.keyconfig.gesture;
    $(document).keydown(function (e) {
      if (1 == that.kag.stat.enable_keyconfig) {
        if (1 == that.is_keydown)
          return "true" == __tyrano_key_config.system_key_event;
        that.is_keydown = !0;
        var keycode = e.keyCode;
        that.map_key[keycode] &&
          ("function" == typeof that.map_key[keycode]
            ? that.map_key[keycode]()
            : that[that.map_key[keycode]] && that[that.map_key[keycode]]());
      }
    });
    $(document).keyup(function (e) {
      that.is_keydown = !1;
      var keycode = e.keyCode;
      (91 != keycode && 17 != keycode) || (that.kag.stat.is_skip = !1);
    });
    $(document).on("mousedown", function (e) {
      // that.clearSkip();
      var target = null;
      2 == e.which
        ? (target = that.map_mouse.center)
        : 3 == e.which && (target = that.map_mouse.right);
      "function" == typeof target ? target() : that[target] && that[target]();
    });
    var mousewheelevent =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
          ? "mousewheel"
          : "DOMMouseScroll";
    $(document).on(mousewheelevent, function (e) {
      if (
        that.canShowMenu() &&
        0 != that.kag.stat.enable_keyconfig &&
        !(
          $(".menu_close").length > 0 &&
          "none" != $(".layer_menu").css("display")
        )
      ) {
        var target = null;
        "function" ==
        typeof (target =
          (e.originalEvent.deltaY
            ? -e.originalEvent.deltaY
            : e.originalEvent.wheelDelta
              ? e.originalEvent.wheelDelta
              : -e.originalEvent.detail) < 0
            ? that.map_mouse.wheel_down
            : that.map_mouse.wheel_up)
          ? target()
          : that[target] && that[target]();
      }
    });
    var layer_obj_click = $(".layer_event_click");
    if ("pc" != $.userenv()) {
      layer_obj_click.swipe({
        swipe: function (
          event,
          direction,
          distance,
          duration,
          fingerCount,
          fingerData,
        ) {
          that.is_swipe = !0;
          var swipe_str = "swipe_" + direction + "_" + fingerCount;
          that.map_ges[swipe_str] &&
            that[that.map_ges[swipe_str].action] &&
            that[that.map_ges[swipe_str].action]();
          event.stopPropagation();
          event.preventDefault();
          return !1;
        },
        fingers: "all",
      });
      layer_obj_click
        .on("touchstart", function () {
          // that.clearSkip();
          that.timeoutId = setTimeout(function () {
            if (that[that.map_ges.hold.action]) {
              that.is_swipe = !0;
              that[that.map_ges.hold.action]();
            }
          }, 2e3);
        })
        .on("touchend", function () {
          clearTimeout(that.timeoutId);
          that.timeoutId = null;
        });
      var t = 0;
      $(".tyrano_base").on("touchend", function (e) {
        var now = new Date().getTime();
        now - t < 350 && e.preventDefault();
        t = now;
      });
    }
    layer_obj_click.click(function (e) {
      if (0 == that.kag.tmp.ready_audio && $.isNeedClickAudio()) {
        that.kag.readyAudio();
        that.kag.tmp.ready_audio = !0;
        if (1 == that.kag.stat.is_adding_text) {
          that.kag.stat.is_click_text = !0;
          return !1;
        }
        that.kag.ftag.nextOrder();
        return !1;
      }
      if (that.is_swipe) {
        that.is_swipe = !1;
        return !1;
      }
      if (1 == that.kag.stat.is_hide_message) {
        that.kag.layer.showMessageLayers();
        return !1;
      }
      if (1 == that.kag.stat.is_adding_text) {
        that.kag.stat.is_click_text = !0;
        return !1;
      }
      if (1 == that.kag.stat.is_click_text) return !1;
      if (1 == that.kag.stat.is_stop) return !1;
      1 == that.kag.stat.fuki.active && that.kag.layer.hideMessageLayers();

      // hide custom menu
      $(".action_menu").css("display", "none");
      $(".play_menu").css("display", "none");
      $(".option_menu").css("display", "none");

      that.kag.ftag.nextOrder();
    });
  },
  next: function () {
    if (this.kag.key_mouse.canClick()) {
      // this.clearSkip();
      $(".layer_event_click").trigger("click");
    }
  },
  showmenu: function () {
    this.canShowMenu() &&
      ($(".menu_close").length > 0 && "none" != $(".layer_menu").css("display")
        ? $(".menu_close").click()
        : $(".button_menu").click());
  },
  hidemessage: function () {
    this.canShowMenu() &&
      ($(".menu_close").length > 0 && "none" != $(".layer_menu").css("display")
        ? $(".menu_close").click()
        : this.kag.stat.is_strong_stop ||
          (this.kag.stat.is_hide_message
            ? this.kag.layer.showMessageLayers()
            : this.kag.ftag.startTag("hidemessage")));
  },
  save: function () {
    this._role("save");
  },
  load: function () {
    this._role("load");
  },
  menu: function () {
    this._role("menu");
  },
  title: function () {
    this._role("title");
  },
  skip: function () {
    this.canClick() && this._role("skip");
  },
  backlog: function () {
    this._role("backlog");
  },
  fullscreen: function () {
    this._role("fullscreen");
  },
  qsave: function () {
    this._role("quicksave");
  },
  qload: function () {
    this._role("quickload");
  },
  auto: function () {
    this._role("auto");
  },
  _role: function (role) {
    if (1 == this.kag.stat.is_skip && "skip" == role) {
      this.kag.stat.is_skip = !1;
      return !1;
    }
    if (
      "none" == this.kag.layer.layer_event.css("display") &&
      1 != this.kag.stat.is_strong_stop
    )
      return !1;
    if (0 == this.kag.stat.enable_keyconfig) return !1;
    this.kag.stat.is_skip = !1;
    "auto" != role && this.kag.ftag.startTag("autostop", { next: "false" });
    if (
      !(
        ("save" != role &&
          "menu" != role &&
          "quicksave" != role &&
          "sleepgame" != role) ||
        (1 != this.kag.stat.is_adding_text && 1 != this.kag.stat.is_wait)
      )
    )
      return !1;
    switch (role) {
      case "save":
        "none" == $(".layer_menu").css("display") &&
          this.kag.menu.displaySave();
        break;
      case "load":
        "none" == $(".layer_menu").css("display") &&
          this.kag.menu.displayLoad();
        break;
      case "window":
        this.kag.layer.hideMessageLayers();
        break;
      case "title":
        $.confirm(
          $.lang("go_title"),
          function () {
            location.reload();
          },
          function () {
            return !1;
          },
        );
        break;
      case "menu":
        this.kag.menu.showMenu();
        break;
      case "skip":
        this.kag.ftag.startTag("skipstart", {});
        break;
      case "backlog":
        this.kag.menu.displayLog();
        break;
      case "fullscreen":
        this.kag.menu.screenFull();
        break;
      case "quicksave":
        this.kag.menu.setQuickSave();
        break;
      case "quickload":
        this.kag.menu.loadQuickSave();
        break;
      case "auto":
        1 == this.kag.stat.is_auto
          ? this.kag.ftag.startTag("autostop", { next: "false" })
          : this.kag.ftag.startTag("autostart", {});
        break;
      case "sleepgame":
        if (null != this.kag.tmp.sleep_game) return !1;
        this.kag.tmp.sleep_game = {};
        this.kag.ftag.startTag("sleepgame", _pm);
    }
  },
  canClick: function () {
    return (
      "none" != $(".layer_event_click").css("display") &&
      "none" == $(".layer_menu").css("display")
    );
  },
  clearSkip: function () {
    if (1 == this.kag.stat.is_skip && 0 == this.kag.stat.is_strong_stop) {
      this.kag.stat.is_skip = !1;
      return !1;
    }
    1 == this.kag.stat.is_auto &&
      "true" == this.kag.config.autoClickStop &&
      this.kag.ftag.startTag("autostop", { next: "false" });
    1 == this.kag.stat.is_wait_auto && (this.kag.stat.is_wait_auto = !1);
  },
  canShowMenu: function () {
    return (
      ("none" != this.kag.layer.layer_event.css("display") ||
        1 == this.kag.stat.is_strong_stop) &&
      1 != this.kag.stat.is_wait
    );
  },
};
