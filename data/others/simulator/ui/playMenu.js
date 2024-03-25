TYRANO.kag.ftag.master_tag.play_menu = {
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
    var $menu = $("<div class='play_menu'>");
    $menu.css({
      display: "none",
      position: "absolute",
      "z-index": 10001,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
      "background-color": "rgba(0, 0, 0, .5)",
    });
    $.setName($menu, "play_menu");
    var $menuHeader = $("<div class='play_menu_header'>Play Menu</div>");
    $menuHeader.css({
      position: "relative",
      "font-size": "18px",
      color: "#fff",
      "font-weight": "bold",
      "text-align": "center",
      padding: "16px 16px 0",
    });
    var $grid = $("<div class='play_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr 1fr",
      "column-gap": "16px",
      "row-gap": "16px",
      padding: "16px",
    });

    // touch button
    var $touchButton = $(
      `<div class='glink_button btn_20_black touch_button'>触る</div>`,
    );
    $touchButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setTouchButtonEvent($touchButton, pm);

    // breathHold button
    var $breathHoldButton = $(
      `<div class='glink_button btn_20_black breath_hold_button'>息止め</div>`,
    );
    $breathHoldButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setBreathHoldButtonEvent($breathHoldButton, pm);

    // close button
    var $closeMenuButton = $("<div class='close_menu_button'>");
    var $closeMenuButtonWrapper = $("<div class='close_menu_button_wrapper'>");
    $closeMenuButtonWrapper.css({
      position: "absolute",
      right: "8px",
      top: "calc(50% - 8px)",
    });
    this.setCloseButtonEvent($closeMenuButton, pm);

    $grid.append($touchButton);
    $grid.append($breathHoldButton);

    $closeMenuButtonWrapper.append($closeMenuButton);
    $menuHeader.append($closeMenuButtonWrapper);

    $menu.append($menuHeader);
    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    TYRANO.kag.ftag.nextOrder();
  },
  setTouchButtonEvent: function ($touchButton, pm) {
    !(function () {
      $touchButton.click(function (event) {
        console.log("onclick touch button");
        touchEventHandler();

        // close other menu
        $(".control_menu").css("display", "none");
        $(".play_menu").css("display", "none");

        // open touch event menu
        $(".touch_event_menu").css("display", "block");
      });
    })();
  },
  setBreathHoldButtonEvent: function ($touchButton, pm) {
    !(function () {
      $touchButton.click(function (event) {
        // TODO: breathHold event
        console.log("onclick breathHold button");

        // close other menu
        $(".control_menu").css("display", "none");
        $(".play_menu").css("display", "none");
      });
    })();
  },
  setCloseButtonEvent: function ($closeMenuButton, pm) {
    !(function () {
      $closeMenuButton.click(function (event) {
        $(".play_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_play_menu = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".play_menu").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
