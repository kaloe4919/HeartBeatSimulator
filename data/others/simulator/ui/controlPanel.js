TYRANO.kag.ftag.master_tag.control_menu = {
  pm: {
    x: "",
    y: "",
    width: "",
    height: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer("fix");
    var $menu = $("<div class='control_menu fixlayer'>");
    $menu.css({
      position: "absolute",
      "z-index": 10000,
      left: `${pm.x}px`,
      top: `${pm.y}px`,
      width: `${pm.width}px`,
      height: `${pm.height}px`,
    });
    $.setName($menu, "control_menu");
    var $grid = $("<div class='control_menu_grid'>");
    $grid.css({
      display: "grid",
      "grid-template-columns": "1fr 1fr",
      "column-gap": "16px",
      "row-gap": "16px",
    });

    // talk button
    var $talkButton = $(
      `<div class='glink_button btn_20_black talk_button'>Talk</div>`,
    );
    $talkButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setTalkButtonEvent($talkButton, pm);

    // action button
    var $actionButton = $(
      `<div class='glink_button btn_20_black action_button'>Action</div>`,
    );
    $actionButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setActionButtonEvent($actionButton, pm);

    // hacking button
    var $hackingButton = $(
      `<div class='glink_button btn_20_black hacking_button'>Hacking</div>`,
    );
    $hackingButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setHackingButtonEvent($hackingButton, pm);

    // option button
    var $optionButton = $(
      `<div class='glink_button btn_20_black option_button'>Option</div>`,
    );
    $optionButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setOptionButtonEvent($optionButton, pm);

    $grid.append($talkButton);
    $grid.append($actionButton);
    $grid.append($hackingButton);
    $grid.append($optionButton);

    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    TYRANO.kag.ftag.nextOrder();
  },
  setTalkButtonEvent: function ($talkButton, pm) {
    !(function () {
      $talkButton.click(function (event) {
        console.log("onclick talk button");
        talkEventHandler();
      });
    })();
  },
  setActionButtonEvent: function ($talkButton, pm) {
    !(function () {
      $talkButton.click(function (event) {
        // TODO: open action menu
        console.log("onclick action button");
      });
    })();
  },
  setHackingButtonEvent: function ($hackingButton, pm) {
    !(function () {
      $hackingButton.click(function (event) {
        // TODO: open hacking menu
        console.log("onclick hacking button");
      });
    })();
  },
  setOptionButtonEvent: function ($optionButton, pm) {
    !(function () {
      $optionButton.click(function (event) {
        // TODO: open option menu
        console.log("onclick option button");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_control_menu = {
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".control_menu").css("display", config);

    TYRANO.kag.ftag.nextOrder();
  },
};
