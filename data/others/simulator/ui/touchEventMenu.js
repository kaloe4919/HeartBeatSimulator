TYRANO.kag.ftag.master_tag.touch_event_menu = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");
    var $menu = $("<div class='touch_event_menu'>");
    $menu.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
    });
    $.setName($menu, "touch_event_menu");
    var $grid = $("<div class='touch_event_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr",
      "row-gap": "16px",
    });

    // return button
    var $returnButton = $(
      `<div class='glink_button btn_20_black return_button'>戻る</div>`,
    );
    $returnButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setReturnButtonEvent($returnButton, pm);

    $grid.append($returnButton);

    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setReturnButtonEvent: function ($compressButton, pm) {
    !(function () {
      $compressButton.click(function (event) {
        console.log("onclick return button");
        returnTouchEventHandler();

        // close other menu
        $(".touch_event_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.touch_chest_event_menu = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");
    var $menu = $("<div class='touch_chest_event_menu'>");
    $menu.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
    });
    $.setName($menu, "touch_chest_event_menu");
    var $grid = $("<div class='touch_chest_event_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr",
      "row-gap": "16px",
    });

    // compress button
    var $compressButton = $(
      `<div class='glink_button btn_20_black compress_button'>圧迫する</div>`,
    );
    $compressButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setCompressButtonEvent($compressButton, pm);

    // stop button
    var $stopButton = $(
      `<div class='glink_button btn_20_black stop_button'>やめる</div>`,
    );
    $stopButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setStopButtonEvent($stopButton, pm);

    $grid.append($compressButton);
    $grid.append($stopButton);

    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setCompressButtonEvent: function ($compressButton, pm) {
    !(function () {
      $compressButton.click(function (event) {
        console.log("onclick compress button");
        touchChestCompressEventHandler();

        // close other menu
        $(".touch_chest_event_menu").css("display", "none");
      });
    })();
  },
  setStopButtonEvent: function ($stopButton, pm) {
    !(function () {
      $stopButton.click(function (event) {
        console.log("onclick return button");
        stopTouchChestEventHandler();

        // close other menu
        $(".touch_chest_event_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.compress_event_menu = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");
    var $menu = $("<div class='compress_event_menu'>");
    $menu.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
    });
    $.setName($menu, "compress_event_menu");
    var $grid = $("<div class='compress_event_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr",
      "row-gap": "16px",
    });

    // stop compress button
    var $stopCompressButton = $(
      `<div class='glink_button btn_20_black stop_compress_button'>圧迫をやめる</div>`,
    );
    $stopCompressButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setStopCompressButtonEvent($stopCompressButton, pm);

    $grid.append($stopCompressButton);

    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setStopCompressButtonEvent: function ($compressButton, pm) {
    !(function () {
      $compressButton.click(function (event) {
        console.log("onclick stop compress button");
        stopTouchChestCompressEventHandler();

        // close other menu
        $(".compress_event_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_event_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_event_menu").css("display", config);

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_chest_event_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_chest_event_menu").css("display", config);

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_compress_event_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".compress_event_menu").css("display", config);

    this.ftag.nextOrder();
  },
};
