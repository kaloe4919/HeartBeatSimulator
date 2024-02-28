tyrano.plugin.kag.tag.camera = {
  vital: [],
  pm: {
    time: 1e3,
    from_x: "0",
    from_y: "0",
    from_zoom: "1",
    from_rotate: "0",
    x: "",
    y: "",
    zoom: "",
    rotate: "",
    layer: "layer_camera",
    wait: "true",
    ease_type: "ease",
  },
  start: function (pm) {
    var that = this,
      duration = pm.time + "ms";
    void 0 === this.kag.stat.current_camera[pm.layer] &&
      (this.kag.stat.current_camera[pm.layer] = {
        x: "0",
        y: "0",
        scale: "1",
        rotate: "0",
      });
    var to_camera = $.extend(!0, {}, this.kag.stat.current_camera[pm.layer]);
    "" != pm.x && (to_camera.x = -1 * parseInt(pm.x) + "px");
    "" != pm.y && (to_camera.y = 1 * parseInt(pm.y) + "px");
    "" != pm.zoom && (to_camera.scale = pm.zoom);
    "" != pm.rotate && (to_camera.rotate = pm.rotate + "deg");
    ("0" == pm.from_x &&
      "0" == pm.from_y &&
      "1" == pm.from_zoom &&
      "0" == pm.from_rotate) ||
      (this.kag.stat.current_camera[pm.layer] = {
        x: -1 * parseInt(pm.from_x) + "px",
        y: 1 * parseInt(pm.from_y) + "px",
        scale: pm.from_zoom,
        rotate: pm.from_rotate + "deg",
      });
    var flag_complete = !1;
    that.kag.stat.is_move_camera = !0;
    var a3d_define = {
      frames: {
        "0%": { trans: this.kag.stat.current_camera[pm.layer] },
        "100%": { trans: to_camera },
      },
      config: { duration: duration, state: "running", easing: pm.ease_type },
      complete: function () {
        if ("true" == pm.wait && 0 == flag_complete) {
          flag_complete = !0;
          setTimeout(function () {
            that.kag.ftag.nextOrder();
          }, 300);
        } else if (1 == that.kag.stat.is_wait_camera) {
          that.kag.stat.is_wait_camera = !1;
          that.kag.ftag.nextOrder();
        }
        that.kag.stat.is_move_camera = !1;
      },
    };
    this.kag.stat.current_camera[pm.layer] = to_camera;
    "false" == pm.wait && that.kag.ftag.nextOrder();
    if ("layer_camera" == pm.layer) {
      $(".layer_camera").css("-webkit-transform-origin", "center center");
      $(".layer_camera").a3d(a3d_define);
      this.kag.stat.current_camera_layer = "";
    } else {
      $("." + pm.layer + "_fore").css(
        "-webkit-transform-origin",
        "center center",
      );
      $("." + pm.layer + "_fore").a3d(a3d_define);
      this.kag.stat.current_camera_layer = pm.layer;
    }
  },
  play: function (obj, cb) {},
};
tyrano.plugin.kag.tag.reset_camera = {
  vital: [],
  pm: { time: 1e3, wait: "true", ease_type: "ease", layer: "layer_camera" },
  start: function (pm) {
    var that = this;
    parseInt(pm.time) < 10 && (pm.time = 10);
    var duration = pm.time + "ms",
      flag_complete = !1;
    that.kag.stat.is_move_camera = !0;
    var a3d_define = {
      frames: {
        "0%": { trans: this.kag.stat.current_camera[pm.layer] },
        "100%": { trans: { x: "0px", y: "0px", scale: "1", rotate: "0deg" } },
      },
      config: { duration: duration, state: "running", easing: pm.ease_type },
      complete: function () {
        $("." + pm.layer).css({
          "-animation-name": "",
          "-animation-duration": "",
          "-animation-play-state": "",
          "-animation-delay": "",
          "-animation-iteration-count": "",
          "-animation-direction": "",
          "-animation-fill-mode": "",
          "-animation-timing-function": "",
          transform: "",
        });
        if ("true" == pm.wait && 0 == flag_complete) {
          flag_complete = !0;
          that.kag.ftag.nextOrder();
        } else if (1 == that.kag.stat.is_wait_camera) {
          that.kag.stat.is_wait_camera = !1;
          that.kag.ftag.nextOrder();
        }
        that.kag.stat.is_move_camera = !1;
      },
    };
    "layer_camera" != pm.layer
      ? delete this.kag.stat.current_camera[pm.layer]
      : (this.kag.stat.current_camera = {});
    "false" == pm.wait && that.kag.ftag.nextOrder();
    if ("layer_camera" == pm.layer) {
      $(".layer_camera").css("-webkit-transform-origin", "center center");
      $(".layer_camera").a3d(a3d_define);
      this.kag.stat.current_camera_layer = "";
    } else {
      $("." + pm.layer + "_fore").css(
        "-webkit-transform-origin",
        "center center",
      );
      $("." + pm.layer + "_fore").a3d(a3d_define);
      this.kag.stat.current_camera_layer = "";
    }
  },
  play: function (obj, cb) {},
};
tyrano.plugin.kag.tag.wait_camera = {
  start: function (pm) {
    1 == this.kag.stat.is_move_camera
      ? (this.kag.stat.is_wait_camera = !0)
      : this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.mask = {
  vital: [],
  pm: {
    time: 1e3,
    effect: "fadeIn",
    color: "0x000000",
    graphic: "",
    folder: "",
  },
  start: function (pm) {
    var that = this;
    that.kag.layer.hideEventLayer();
    "0" == pm.time && (pm.time = "1");
    var j_div = $(
      "<div class='layer layer_mask' data-effect='" +
        pm.effect +
        "' style='z-index:100000000;position:absolute;'>",
    );
    j_div.css("animation-duration", parseInt(pm.time) + "ms");
    var sc_width = parseInt(that.kag.config.scWidth),
      sc_height = parseInt(that.kag.config.scHeight),
      behind = !1;
    j_div.css({ width: sc_width, height: sc_height });
    "none" == pm.color
      ? j_div.css("background-color", "")
      : j_div.css("background-color", $.convertColor(pm.color));
    if ("" != pm.graphic) {
      "" != pm.folder ? (folder = pm.folder) : (folder = "image");
      var storage_url = "";
      if ("" != pm.graphic) {
        storage_url = "./data/" + folder + "/" + pm.graphic;
        j_div.css("background-image", "url(" + storage_url + ")");
      }
      behind = !0;
    }
    0 == behind && j_div.css("transform", "scale(1.02)");
    $(".tyrano_base").append(j_div);
    j_div
      .addClass("animated " + pm.effect)
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          0 == behind && $("#root_layer_game").css("opacity", 0);
          that.kag.ftag.nextOrder();
        },
      );
  },
};
tyrano.plugin.kag.tag.mask_off = {
  vital: [],
  pm: { time: 1e3, effect: "fadeOut" },
  start: function (pm) {
    var that = this,
      j_div = $(".layer_mask");
    "0" == pm.time && (pm.time = "1");
    $("#root_layer_game").css("opacity", 1);
    if (j_div.get(0)) {
      var _effect = j_div.attr("data-effect");
      j_div.removeClass("animated " + _effect);
      j_div.css("animation-duration", parseInt(pm.time) + "ms");
      j_div
        .addClass("animated " + pm.effect)
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            j_div.remove();
            that.kag.layer.showEventLayer();
            that.kag.ftag.nextOrder();
          },
        );
    } else {
      that.kag.layer.showEventLayer();
      that.kag.ftag.nextOrder();
    }
  },
};
