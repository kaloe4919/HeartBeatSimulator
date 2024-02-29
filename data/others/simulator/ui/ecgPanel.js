TYRANO.kag.ftag.master_tag.show_ecg = {
  pm: {
    layer: "0",
    page: "fore",
    x: "",
    y: "",
  },
  start: function (pm) {
    var target_layer = TYRANO.kag.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='ecg'></div>");
    target_layer.append(chart);
    var data = [
      {
        x: [
          "2013-10-04 22:23:00",
          "2013-11-04 22:23:00",
          "2013-12-04 22:23:00",
        ],
        y: [1, 3, 6],
        type: "scatter",
      },
    ];

    Plotly.newPlot("ecg", data);
    TYRANO.kag.hbsim.chart.ecg = Plotly;
    TYRANO.kag.ftag.nextOrder();
  },
};
