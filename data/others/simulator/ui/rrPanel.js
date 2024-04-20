// y-axis of target to update value
rrYIndex = 0;
// If breath occurs, breath waveform is converted to y-axis data and assigned
rrYDataQue = [];

// 呼吸数に応じて Interval のフレームを短くする
function shortenIntervalByRespiratoryRate(yData) {
  var f = TYRANO.kag.stat.f;
  var respiratoryRate = f.respiratoryRate;
  var shortenLength = Math.round(yData.length * (15 / respiratoryRate));
  if (shortenLength >= 0) {
    return yData.splice(yData[0], shortenLength);
  } else {
    return yData;
  }
}

function updateRr() {
  var f = TYRANO.kag.stat.f;

  // 呼吸がある場合、キューを作成
  if (!f.isRrAddedQue) {
    var respiratoryRate = f.respiratoryRate;
    // 呼吸の強さに応じてY軸のMax値を変動させる
    var curveMaxValue = 2 * (respiratoryRate / 15);
    // 呼吸の速さに応じてグラフの曲線を急にする
    var curveLength = 75 / (respiratoryRate / 15);
    // グラフのy軸の表示上限は 6
    var inhaleCurve = createCurveData(
      curveMaxValue <= 6 ? curveMaxValue : 6,
      curveLength,
    );
    var exhaleCurve = createCurveData(
      curveMaxValue <= 6 ? curveMaxValue : 6,
      curveLength,
      true,
    );
    var que = inhaleCurve.concat(exhaleCurve);
    rrYDataQue = que;

    f.isRrAddedQue = true;
  }

  var yValues = f.rrChartData.y;
  if (rrYDataQue.length > 0) {
    // キューがある場合、Y軸をキューの値で更新する
    // 次の 3 フレームを初期化する
    yValues.splice(rrYIndex, 4, rrYDataQue[0], null, null, null);
    rrYDataQue.shift();
  } else {
    // キューがない場合、Y軸を 0 で更新する
    // 次の 3 フレームを初期化する
    yValues.splice(rrYIndex, 4, 0, null, null, null);
  }
  f.rrChartData.y = yValues;
  Plotly.update("rr", [f.rrChartData], f.rrChartLayout);

  // 更新したY軸が配列の最後の場合は Index を 0 に戻す
  if (rrYIndex >= f.rrChartData.x.length - 1) {
    rrYIndex = 0;
  } else {
    rrYIndex++;
  }
}

// Vital monitor update 50 times per second
async function liveRr() {
  var isDefinedRr = true;
  while (isDefinedRr) {
    updateRr();
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

TYRANO.kag.ftag.master_tag.show_rr = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  layer: TYRANO.kag.layer,
  pm: {
    layer: "0",
    page: "fore",
    width: "450",
    height: "75",
    x: "830",
    y: "110",
  },
  start: function (pm) {
    // init rr monitor
    var target_layer = this.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='rr' class='rr_monitor'></div>");
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
        range: [-6, 6],
      },
    };
    // バイタルモニタはフレームレート50のアニメーションとして解釈する
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
      line: { color: "#42e0f5", width: 2, shape: "spline" },
    };
    Plotly.newPlot("rr", [data], layout);
    this.f.rrChartLayout = layout;
    this.f.rrChartData = data;
    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.start_rr = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    liveRr();

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_rr = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    this.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1190,
      y: 58,
      vertical: "false",
      text: `RR: ${this.f.respiratoryRate}`,
      size: "20",
      hexColor: "#42e0f5",
      bold: "bold",
      align: "left",
      name: "rr_output",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
  },
};
