// y-axis of target to update value
ecgYIndex = 0;
// If heartbeat occurs, heartbeat waveform is converted to y-axis data and assigned
ecgYDataQue = [];

// 心拍数に応じて Interval のフレームを短くする
function shortenIntervalByHeartRate(yData) {
  var heartRate = TYRANO.kag.hbsim.variables.heartStatus.heartRate;
  var shortenLength = Math.round(yData.length * (65 / heartRate));
  if (shortenLength >= 0) {
    return yData.splice(0, shortenLength);
  } else {
    return yData;
  }
}

function updateEcg() {
  var current = TYRANO.kag.hbsim.variables.heartStatus.current;
  var data = TYRANO.kag.hbsim.chart.ecg.data;

  // 鼓動がある場合、鼓動を解析してキューを作成
  if (!current.isAddedQue) {
    if (current.type === "Normal") {
      var preInterval = shortenIntervalByHeartRate([0, 0, 0]);
      var pWave = [1, 0];
      var prInterval = shortenIntervalByHeartRate([0, 0, 0]);
      var rWave = [-1, 6, -2];
      var stInterval = shortenIntervalByHeartRate([0, 0, 0, 0, 0, 0]);
      var tWave = shortenIntervalByHeartRate([0.5, 0.7, 1.5]);
      var que = preInterval
        .concat(pWave)
        .concat(prInterval)
        .concat(rWave)
        .concat(stInterval)
        .concat(tWave);
      ecgYDataQue = que;

      TYRANO.kag.hbsim.variables.heartStatus.current.isAddedQue = true;
    } else if (current.type === "PVC") {
      var preInterval = shortenIntervalByHeartRate([0, 0, 0]);
      var pWave = [1, 0];
      var prInterval = shortenIntervalByHeartRate([0, 0, 0]);
      var rWave = [-1, 7, -2];
      var stInterval = shortenIntervalByHeartRate([0, 0, 0, 0, 0, 0]);
      var tWave = shortenIntervalByHeartRate([0.5, 0.7, 1.5]);
      var intervalPVC = shortenIntervalByHeartRate([0, 0, 0, 0, 0]);
      var rWavePVC = [0.5, 1, 9, -2, -2.5, -4, -1, 0, 1];
      var que = preInterval
        .concat(pWave)
        .concat(prInterval)
        .concat(rWave)
        .concat(stInterval)
        .concat(tWave)
        .concat(intervalPVC)
        .concat(rWavePVC);
      ecgYDataQue = que;

      TYRANO.kag.hbsim.variables.heartStatus.current.isAddedQue = true;
    }
  }

  var yValues = data.y;
  if (ecgYDataQue.length > 0) {
    // キューがある場合、Y軸をキューの値で更新する
    // 次の 3 フレームを初期化する
    yValues.splice(ecgYIndex, 4, ecgYDataQue[0], null, null, null);
    ecgYDataQue.shift();
  } else {
    // キューがない場合、Y軸を 0 で更新する
    // 次の 3 フレームを初期化する
    yValues.splice(ecgYIndex, 4, 0, null, null, null);
  }
  data.y = yValues;
  Plotly.update("ecg", [data], TYRANO.kag.hbsim.chart.ecg.layout);
  TYRANO.kag.hbsim.chart.ecg.data = data;

  // 更新したY軸が配列の最後の場合は Index を 0 に戻す
  if (ecgYIndex >= data.x.length - 1) {
    ecgYIndex = 0;
  } else {
    ecgYIndex++;
  }
}

// Vital monitor update 50 times per second
async function liveEcg() {
  var isDefinedEcg = true;
  while (isDefinedEcg) {
    updateEcg();
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

TYRANO.kag.ftag.master_tag.show_ecg = {
  pm: {
    layer: "0",
    page: "fore",
    width: "450",
    height: "100",
    x: "830",
    y: "10",
  },
  start: function (pm) {
    // init ecg monitor
    var target_layer = TYRANO.kag.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='ecg'></div>");
    chart.css("position", "absolute");
    chart.css("left", pm.x + "px");
    chart.css("top", pm.y + "px");
    target_layer.append(chart);
    var layout = {
      plot_bgcolor: "rgba(0, 0, 0, .5)",
      paper_bgcolor: "rgba(0, 0, 0, .5)",
      width: parseInt(pm.width),
      height: parseInt(pm.height),
      margin: { t: 0, r: 0, b: 0, l: 0 },
      xaxis: {
        automargin: false,
        autotick: false,
        dtick: 10,
        showticklabels: false,
        zeroline: false,
        range: [0, 149],
      },
      yaxis: {
        automargin: false,
        autotick: false,
        dtick: 1,
        showticklabels: false,
        zeroline: false,
        range: [-8, 8],
      },
    };
    // バイタルモニタは 1 秒あたり 50 フレームを持つアニメーションと解釈する
    // 3秒分表示するため 3 * 50 = 150 個のデータを作成する
    var xValues = [];
    var yValues = [];
    for (var i = 0; i < 150; i++) {
      xValues.push(i.toString());
      yValues.push(null);
    }
    var data = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
      line: { color: "#78f542", width: 2, shape: "spline" },
    };
    Plotly.newPlot("ecg", [data], layout);
    TYRANO.kag.hbsim.chart.ecg.layout = layout;
    TYRANO.kag.hbsim.chart.ecg.data = data;
    TYRANO.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.start_ecg = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    liveEcg();

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_hr = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1190,
      y: 78,
      vertical: "false",
      text: `HR: ${TYRANO.kag.hbsim.variables.heartStatus.heartRate}`,
      size: "20",
      hexColor: "#78f542",
      bold: "bold",
      align: "left",
      name: "HR",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
  },
};
