TYRANO.kag.ftag.master_tag.touch_event_area = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {},
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");

    // head area
    var $headArea = $("<div class='touch_event_area touch_event_head_area'>");
    $headArea.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      cursor: "pointer",
      top: "120px",
      left: "550px",
      width: "180px",
      height: "70px",
      opacity: 0,
    });
    this.setTouchHeadEvent($headArea);

    // ear area
    var $earArea = $("<div class='touch_event_area touch_event_ear_area'>");
    $earArea.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      cursor: "pointer",
      top: "250px",
      left: "690px",
      width: "70px",
      height: "90px",
      opacity: 0,
    });
    this.setTouchEarEvent($earArea);

    // neck area
    var $neckArea = $("<div class='touch_event_area touch_event_neck_area'>");
    $neckArea.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      cursor: "pointer",
      top: "360px",
      left: "640px",
      width: "90px",
      height: "70px",
      opacity: 0,
    });
    this.setTouchNeckEvent($neckArea);

    // chest area
    var $chestArea = $("<div class='touch_event_area touch_event_chest_area'>");
    $chestArea.css({
      display: "none",
      position: "absolute",
      "z-index": 10002,
      cursor: "pointer",
      top: "480px",
      left: "490px",
      width: "210px",
      height: "130px",
      opacity: 0,
    });
    this.setTouchChestEvent($chestArea);

    target_layer.append($headArea);
    target_layer.append($earArea);
    target_layer.append($neckArea);
    target_layer.append($chestArea);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setTouchHeadEvent: function ($headArea) {
    !(function () {
      $headArea.click(function (event) {
        console.log("onclick head");
        touchHeadEventHandler();

        // hide other area
        $(".touch_event_area").css("display", "none");
      });
    })();
  },
  setTouchEarEvent: function ($earArea) {
    !(function () {
      $earArea.click(function (event) {
        console.log("onclick ear");
        touchEarEventHandler();

        // hide other area
        $(".touch_event_area").css("display", "none");
      });
    })();
  },
  setTouchNeckEvent: function ($neckArea) {
    !(function () {
      $neckArea.click(function (event) {
        console.log("onclick neck");
        touchNeckEventHandler();

        // hide other area
        $(".touch_event_area").css("display", "none");
      });
    })();
  },
  setTouchChestEvent: function ($chestArea) {
    !(function () {
      $chestArea.click(function (event) {
        console.log("onclick ear");
        touchChestEventHandler();

        // hide other area
        $(".touch_event_area").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_event_area = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_event_area").css("display", config);

    this.ftag.nextOrder();
  },
};
