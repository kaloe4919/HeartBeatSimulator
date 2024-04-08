TYRANO.kag.ftag.master_tag.option_menu = {
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {},
  start: function (pm) {
    var target_layer = this.layer.getLayer("fix");

    var $soundOption = $("<div>tabPanelSoundOption</div>");
    var $displayOption = $("<div>tabPanelDisplayOption</div>");
    var $advancedOption = $("<div>tabPanelAdvancedOption</div>");

    var tabsOption = [
      {
        key: "sound",
        label: "サウンド設定",
        children: $soundOption,
        selected: true,
      },
      { key: "display", label: "表示設定", children: $displayOption },
      { key: "advanced", label: "詳細設定", children: $advancedOption },
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
    $menu.append($tabList);

    // タブパネル生成
    tabsOption.forEach(({ key, children, selected }) => {
      var $tabPanel = $(
        `<div class='tab_panel tab_panel_${key}_option' role='tabpanel' ${selected ? "" : "style='display: none;'"}>`,
      );
      $tabPanel.append(children);

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
        $(`.tab_label_wrapper`).removeClass("selected");
        $(`.tab_${key}_option .tab_label_wrapper`).addClass("selected");
      });
    })();
  },
};
