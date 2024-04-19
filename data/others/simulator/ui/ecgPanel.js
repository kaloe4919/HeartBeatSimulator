// y-axis of target to update value
ecgYIndex = 0;
// If heartbeat occurs, heartbeat waveform is converted to y-axis data and assigned
ecgYDataQue = [];

// 心拍数に応じて Interval のフレームを短くする
function shortenIntervalByHeartRate(yData) {
  var f = TYRANO.kag.stat.f;
  var heartRate = f.heartRate;
  var shortenLength = Math.round(yData.length * (65 / heartRate));
  if (shortenLength >= 0) {
    return yData.splice(0, shortenLength);
  } else {
    return yData;
  }
}

function updateEcg() {
  var f = TYRANO.kag.stat.f;

  // 鼓動がある場合、鼓動を解析してキューを作成
  if (!f.isEcgAddedQue) {
    if (f.ecgQueType === "Normal") {
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

      f.isEcgAddedQue = true;
    } else if (f.ecgQueType === "PVC") {
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

      f.isEcgAddedQue = true;
    } else if (f.ecgQueType === "VT") {
      var rWavePVC = [0.5, 1, 9, -2, -2.5, -4, -1, 0, 1];
      var que = rWavePVC;
      ecgYDataQue = que;

      f.isEcgAddedQue = true;
    } else if (f.ecgQueType === "AVBlock") {
      var preInterval = shortenIntervalByHeartRate([0, 0, 0]);
      var pWave = [1, 0];
      var que = preInterval.concat(pWave);
      ecgYDataQue = que;

      f.isEcgAddedQue = true;
    }
  }

  var yValues = f.ecgChartData.y;
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
  f.ecgChartData.y = yValues;
  Plotly.update("ecg", [f.ecgChartData], f.ecgChartLayout);

  // 更新したY軸が配列の最後の場合は Index を 0 に戻す
  if (ecgYIndex >= f.ecgChartData.x.length - 1) {
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
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {
    layer: "0",
    page: "fore",
    width: "1280",
    height: "90",
    x: "0",
    y: "0",
  },
  start: function (pm) {
    // init ecg monitor
    var target_layer = this.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='ecg' class='ecg_monitor'></div>");
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
        range: [0, 399],
      },
      yaxis: {
        automargin: false,
        autotick: false,
        dtick: 1,
        showticklabels: false,
        zeroline: false,
        range: [-7, 8],
      },
    };
    // バイタルモニタは 1 秒あたり 50 フレームを持つアニメーションと解釈する
    // 8秒分表示するため 8 * 50 = 400 個のデータを作成する
    var xValues = [];
    var yValues = [];
    for (var i = 0; i < 400; i++) {
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
    this.f.ecgChartLayout = layout;
    this.f.ecgChartData = data;
    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.start_ecg = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    liveEcg();

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_hr = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1090,
      y: 58,
      vertical: "false",
      text: `HR: ${Math.floor(this.f.heartRate)}`,
      size: "20",
      hexColor: "#78f542",
      bold: "bold",
      align: "left",
      name: "hr_output",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
  },
};
