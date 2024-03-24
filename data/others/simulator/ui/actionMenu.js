TYRANO.kag.ftag.master_tag.action_menu = {
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
    var $menu = $("<div class='action_menu'>");
    $menu.css({
      position: "absolute",
      "z-index": 10001,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
      "background-color": "rgba(0, 0, 0, .5)",
    });
    $.setName($menu, "action_menu");
    var $menuHeader = $("<div class='action_menu_header'>Action Menu</div>");
    $menuHeader.css({
      position: "relative",
      "font-size": "18px",
      color: "#fff",
      "font-weight": "bold",
      "text-align": "center",
      padding: "16px 16px 0",
    });
    var $grid = $("<div class='action_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr 1fr",
      "column-gap": "16px",
      "row-gap": "16px",
      padding: "16px",
    });

    // touch button
    var $touchButton = $(
      `<div class='glink_button btn_20_black touch_button'>触診</div>`,
    );
    $touchButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setTouchButtonEvent($touchButton, pm);

    // stethoscope button
    var $stethoscopeButton = $(
      `<div class='glink_button btn_20_black stethoscope_button'>聴診器</div>`,
    );
    $stethoscopeButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setStethoscopeButtonEvent($stethoscopeButton, pm);

    // syringe button
    var $syringeButton = $(
      `<div class='glink_button btn_20_black syringe_button'>注射器</div>`,
    );
    $syringeButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setSyringeButtonEvent($syringeButton, pm);

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
    $grid.append($stethoscopeButton);
    $grid.append($syringeButton);

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
        // TODO: touch event
        console.log("onclick touch button");
        talkEventHandler();
      });
    })();
  },
  setStethoscopeButtonEvent: function ($touchButton, pm) {
    !(function () {
      $touchButton.click(function (event) {
        // TODO: stethoscope event
        console.log("onclick stethoscope button");
      });
    })();
  },
  setSyringeButtonEvent: function ($syringeButton, pm) {
    !(function () {
      $syringeButton.click(function (event) {
        // TODO: syringe event
        console.log("onclick syringe button");
      });
    })();
  },
  setCloseButtonEvent: function ($closeMenuButton, pm) {
    !(function () {
      $closeMenuButton.click(function (event) {
        $(".action_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_action_menu = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".action_menu").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
