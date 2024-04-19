TYRANO.kag.ftag.master_tag.option_menu = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {},
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");

    var tabsOption = [
      {
        key: "sound",
        label: "サウンド設定",
        selected: true,
        options: [
          {
            key: "beatVol",
            label: "心音ボリューム",
            type: "range",
            min: 0,
            max: 100,
          },
          {
            key: "breathVol",
            label: "息ボリューム",
            type: "range",
            min: 0,
            max: 100,
          },
          {
            key: "musicVol",
            label: "音楽ボリューム",
            type: "range",
            min: 0,
            max: 100,
          },
          {
            key: "seVol",
            label: "SEボリューム",
            type: "range",
            min: 0,
            max: 100,
          },
          {
            key: "isPlayBeatAlways",
            label: "心音を常に再生",
            type: "checkbox",
          },
          {
            key: "isPlayBreathAlways",
            label: "息を常に再生",
            type: "checkbox",
          },
        ],
      },
      {
        key: "display",
        label: "表示設定",
        options: [
          { key: "isShowEcg", label: "心電図を表示", type: "checkbox" },
          { key: "isShowHeart", label: "心臓を表示", type: "checkbox" },
          { key: "isShowDebug", label: "デバッグを表示", type: "checkbox" },
        ],
      },
      {
        key: "advanced",
        label: "詳細設定",
        options: [
          {
            key: "customRecoveryHeartRate",
            label: "心拍数の回復率",
            type: "range",
            min: 50,
            max: 200,
          },
          {
            key: "customIncreaseBurden",
            label: "心臓全体の負荷の上昇率",
            type: "range",
            min: 50,
            max: 200,
            tooltip:
              "心臓全体の負荷が上昇すると期外性収縮などの軽い不整脈が起きやすくなります。",
          },
          {
            key: "customRecoveryBurden",
            label: "心臓全体の負荷の回復率",
            type: "range",
            min: 50,
            max: 200,
          },
          {
            key: "customIncreaseVentricleBurden",
            label: "心室負荷の上昇率",
            type: "range",
            min: 50,
            max: 200,
            tooltip:
              "心室の負荷が上昇すると心室で異常が起きやすくなり、期外性収縮の連発(VT)が起きやすくなります。<br>負荷が大きいと期外性収縮の連発が止まらなくなったり、心室細動(Vf)などの重い発作が発生する可能性があります。",
          },
          {
            key: "customRecoveryVentricleBurden",
            label: "心室負荷の回復率",
            type: "range",
            min: 50,
            max: 200,
          },
          {
            key: "customIncreaseSANodeBurden",
            label: "SAノード負荷の上昇率",
            type: "range",
            min: 50,
            max: 200,
            tooltip:
              "SAノードは心房を収縮させる信号を送る心臓の器官です。<br>SAノードの負荷が上昇すると心房で異常が起きやすくなり、心房細動(Af)の発作が起きやすくなります。",
          },
          {
            key: "customRecoverySANodeBurden",
            label: "SAノード負荷の回復率",
            type: "range",
            min: 50,
            max: 200,
          },
          {
            key: "customIncreaseAVNodeBurden",
            label: "AVノード負荷の上昇率",
            type: "range",
            min: 50,
            max: 200,
            tooltip:
              "AVノードは心房を収縮したあとに心室を収縮させる信号を送る心臓の器官です。<br>AVノードの負荷が上昇すると、信号がうまく伝わらず脈が飛んだり(AV block)、心拍数が急上昇するリエントリー性上室頻拍(SVT)の発作が起きやすくなります。",
          },
          {
            key: "customRecoveryAVNodeBurden",
            label: "AVノード負荷の回復率",
            type: "range",
            min: 50,
            max: 200,
          },
          {
            key: "customIncreaseDeviceDamage",
            label: "デバイスダメージの上昇率",
            type: "range",
            min: 50,
            max: 200,
            tooltip:
              "心臓デバイスのダメージが上昇すると不具合が起きやすくなります。<br>不具合が起きると、心臓マッサージ用の機能が強制的に動き心臓を締め付けたり、ショックを与えたりします。",
          },
        ],
      },
    ];
    var $menu = $("<div class='option_menu'>");
    var $tabList = $("<div class='tab_list' role='tablist'>");

    // タブリスト生成
    tabsOption.forEach(({ key, label, selected }) => {
      var $tabWrapper = $(`<div class='tab tab_${key}_option'>`);
      var $tabInput = $(
        `<input type='radio' id='tab_${key}_option' class='tab_input' value='${key}' role='tab' ${selected ? "checked=''" : ""}>`,
      );
      var $tabLabelWrapper = $(
        `<div class='tab_label_wrapper ${selected ? "selected" : ""}'>`,
      );
      var $tabLabel = $(
        `<div class='tab_label' for='tab_${key}_option'>${label}</div>`,
      );
      this.setTabButtonEvent($tabLabel, key);

      $tabLabelWrapper.append($tabLabel);
      $tabWrapper.append($tabInput);
      $tabWrapper.append($tabLabelWrapper);

      $tabList.append($tabWrapper);
    });
    $menu.css({ display: "none" });
    $menu.append($tabList);

    // タブパネル生成
    tabsOption.forEach(({ key, selected, options }) => {
      var $tabPanel = $(
        `<div class='tab_panel tab_panel_${key}_option' role='tabpanel' ${selected ? "" : "style='display: none;'"}>`,
      );

      // メニューリスト生成
      options.forEach(({ key, label, type, min, max, tooltip }) => {
        var $menuWrapper = $("<div class='menu_row'>");
        var $menuLabelWrapper = $(
          `<div class='menu_label_wrapper ${tooltip ? "tooltip" : ""}'>`,
        );
        var $menuLabel = $("<div class='menu_label'>");
        var $menuLabelBody = $(`<div class='menu_label_body'>${label}</div>`);
        var $menuLabelState = $(
          `<div class='menu_label_state'>${type === "range" ? `${this.f[key]}%` : `${this.f[key]}`} (default: ${type === "range" ? `${defaultVariables[key]}%` : `${defaultVariables[key]}`})</div>`,
        );
        var $tooltipWrapper = $("<div class='menu_tooltip_wrapper'>");
        var $tooltip = $(
          `<div class='menu_tooltip'>${tooltip ? tooltip : ""}</div>`,
        );
        var $tooltipIcon = $("<div class='menu_tooltip_icon'></div>");
        var $menuInputWrapper = $("<div class='menu_input_wrapper'>");
        var $menuInput = $(
          `<input type='${type}' id='${key}' class='menu_input_${type}' value='${this.f[key]}' ${type === "range" ? `min='${min}' max='${max}'` : ""} ${this.f[key] === true ? "checked" : ""}>`,
        );

        this.setOnChangeInputEvent($menuInput, key, type);

        $tooltipWrapper.append($tooltip);
        $tooltipWrapper.append($tooltipIcon);

        $menuLabel.append($menuLabelBody);
        if (tooltip) $menuLabel.append($tooltipWrapper);

        $menuLabelWrapper.append($menuLabel);
        $menuLabelWrapper.append($menuLabelState);

        $menuWrapper.append($menuLabelWrapper);
        $menuInputWrapper.append($menuInput);
        $menuWrapper.append($menuInputWrapper);
        $tabPanel.append($menuWrapper);
      });

      $menu.append($tabPanel);
    });

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setTabButtonEvent: function ($input, key) {
    !(function () {
      $input.click(function (event) {
        console.log(`onclick tab ${key}`);
        $(".tab_panel").css("display", "none");
        $(`.tab_panel_${key}_option`).css("display", "block");
        $(".tab_label_wrapper").removeClass("selected");
        $(`.tab_${key}_option .tab_label_wrapper`).addClass("selected");
      });
    })();
  },
  setOnChangeInputEvent: function ($input, key, type) {
    !(function () {
      $input.change(function (event) {
        var f = TYRANO.kag.stat.f;
        var ftag = TYRANO.kag.ftag;
        console.log(
          `onchange input ${key}: ${type === "checkbox" ? event.target.checked : event.target.value}`,
        );
        f[key] =
          type === "checkbox" ? event.target.checked : event.target.value;

        // オプション個別のハンドリング
        switch (key) {
          case "isShowEcg":
            if (event.target.checked) {
              $(".ecg_monitor").css("display", "block");
              $(".hr_output").css("display", "block");
              $(".rr_output").css("display", "block");
            } else {
              $(".ecg_monitor").css("display", "none");
              $(".hr_output").css("display", "none");
              $(".rr_output").css("display", "none");
            }
            break;
          case "isShowHeart":
            if (event.target.checked) {
              ftag.master_tag.live2d_mod.start({
                name: "heart3",
                scale: "0.5",
              });
            } else {
              ftag.master_tag.live2d_mod.start({
                name: "heart3",
                scale: "0",
              });
            }
            break;
        }
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.option_open_menu = {
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
    var $menu = $("<div class='option_open_menu'>");
    $menu.css({
      position: "absolute",
      "z-index": 10000,
      left: `${pm.x}px`,
      top: `${pm.y}px`,
      width: `${pm.width}px`,
      height: "auto",
    });
    $.setName($menu, "option_open_menu");

    // option open menu button
    var $optionOpenMenuButton = $(
      `<div class='glink_button btn_20_black option_open_menu_button'>Option</div>`,
    );
    $optionOpenMenuButton.css({
      cursor: "pointer",
      "font-size": "18px",
    });
    this.setOptionOpenMenuButtonEvent($optionOpenMenuButton, pm);

    $menu.append($optionOpenMenuButton);

    target_layer.append($menu);
    target_layer.show();
    this.ftag.nextOrder();
  },
  setOptionOpenMenuButtonEvent: function ($button, pm) {
    !(function () {
      $button.click(function (event) {
        console.log("onclick option open menu button");
        $(".option_menu").css("display", "block");
      });
    })();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_option_open_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".option_open_menu").css("display", config);

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_visible_option_menu = {
  ftag: TYRANO.kag.ftag,
  pm: {
    visible: "true",
  },
  start: function (pm) {
    var config = "true" == pm.visible ? "block" : "none";
    $(".option_menu").css("display", config);

    this.ftag.nextOrder();
  },
};
