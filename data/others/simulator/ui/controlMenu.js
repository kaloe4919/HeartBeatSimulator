TYRANO.kag.ftag.master_tag.control_menu = {
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
    var $menu = $("<div class='control_menu'>");
    $menu.css({
      position: "absolute",
      "z-index": 10000,
      left: `${pm.x}px`,
      bottom: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
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

    // play button
    var $playButton = $(
      `<div class='glink_button btn_20_black play_button'>Play</div>`,
    );
    $playButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setPlayButtonEvent($playButton, pm);

    // hacking button
    var $hackingButton = $(
      `<div class='glink_button btn_20_black hacking_button'>Hacking</div>`,
    );
    $hackingButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setHackingButtonEvent($hackingButton, pm);

    $grid.append($talkButton);
    $grid.append($actionButton);
    $grid.append($playButton);
    $grid.append($hackingButton);

    $menu.append($grid);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setTalkButtonEvent: function ($talkButton, pm) {
    !(function () {
      $talkButton.click(function (event) {
        console.log("onclick talk button");
        talkEventHandler();

        // close other menu
        $(".action_menu").css("display", "none");
        $(".play_menu").css("display", "none");
      });
    })();
  },
  setActionButtonEvent: function ($talkButton, pm) {
    !(function () {
      $talkButton.click(function (event) {
        console.log("onclick action button");
        $(".action_menu").css("display", "block");

        // close other menu
        $(".play_menu").css("display", "none");
      });
    })();
  },
  setPlayButtonEvent: function ($playButton, pm) {
    !(function () {
      $playButton.click(function (event) {
        console.log("onclick play button");
        $(".play_menu").css("display", "block");

        // close other menu
        $(".action_menu").css("display", "none");
      });
    })();
  },
  setHackingButtonEvent: function ($hackingButton, pm) {
    !(function () {
      $hackingButton.click(function (event) {
        // TODO: open hacking menu
        console.log("onclick hacking button");

        // close other menu
        $(".action_menu").css("display", "none");
        $(".play_menu").css("display", "none");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_control_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".control_menu").css("display", config);

    this.ftag.nextOrder();
  },
};
