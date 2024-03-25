TYRANO.kag.ftag.master_tag.touch_event_area = {
  pm: {},
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");

    // head area
    var $headArea = $("<div class='touch_event_head_area'>");
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

    target_layer.append($headArea);
    target_layer.show();
    TYRANO.kag.ftag.nextOrder();
  },
  setTouchHeadEvent: function ($headArea) {
    !(function () {
      $headArea.click(function (event) {
        console.log("onclick head");
        touchHeadEventHandler();

        // hide other area
        $(".touch_event_head_area").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_touch_event_area = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".touch_event_head_area").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
