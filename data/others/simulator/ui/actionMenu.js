TYRANO.kag.ftag.master_tag.action_menu = {
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
    var $menu = $("<div class='action_menu'>");
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

    // survey button
    var $surveyButton = $(
      `<div class='glink_button btn_20_black survey_button'>調べる</div>`,
    );
    $surveyButton.css({
      cursor: "pointer",
      "font-size": "16px",
    });
    this.setSurveyButtonEvent($surveyButton, pm);

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

    $grid.append($surveyButton);
    $grid.append($stethoscopeButton);
    $grid.append($syringeButton);

    $closeMenuButtonWrapper.append($closeMenuButton);
    $menuHeader.append($closeMenuButtonWrapper);

    $menu.append($menuHeader);
    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setSurveyButtonEvent: function ($surveyButton, pm) {
    !(function () {
      $surveyButton.click(function (event) {
        // TODO: survey event
        console.log("onclick survey button");
        talkEventHandler();
      });
    })();
  },
  setStethoscopeButtonEvent: function ($surveyButton, pm) {
    !(function () {
      $surveyButton.click(function (event) {
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
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".action_menu").css("display", config);

    this.ftag.nextOrder();
  },
};
