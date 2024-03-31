TYRANO.kag.ftag.master_tag.touch_event_menu = {
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
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
    TYRANO.kag.ftag.nextOrder();
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
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
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
    TYRANO.kag.ftag.nextOrder();
  },
  setCompressButtonEvent: function ($compressButton, pm) {
    !(function () {
      $compressButton.click(function (event) {
        console.log("onclick compress button");
        // compressEventHandler();

        // close other menu
        $(".touch_chest_event_menu").css("display", "none");
      });
    })();
  },
  setStopButtonEvent: function ($compressButton, pm) {
    !(function () {
      $compressButton.click(function (event) {
        console.log("onclick return button");
        stopTouchChestEventHandler();

        // close other menu
        $(".touch_chest_event_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_event_menu = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_event_menu").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_chest_event_menu = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_chest_event_menu").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
