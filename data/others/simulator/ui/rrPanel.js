// y-axis of target to update value
rrYIndex = 0;
// If breath occurs, breath waveform is converted to y-axis data and assigned
rrYDataQue = [];

// 呼吸数に応じて Interval のフレームを短くする
function shortenIntervalByRespiratoryRate(yData) {
  var respiratoryRate = TYRANO.kag.hbsim.variables.breathStatus.respiratoryRate;
  var shortenLength = Math.round(yData.length * (15 / respiratoryRate));
  if (shortenLength >= 0) {
    return yData.splice(yData[0], shortenLength);
  } else {
    return yData;
  }
}

function smoothstep(x) {
  return x * x * (3 - 2 * x);
}

// Create smoothstep values from 0 to max
function createCurveData(max, length, isReverse) {
  const xMin = 0;
  const xMax = 1;

  var values = [];

  for (let i = xMin; i <= xMax; i += 1 / length) {
    const x = i;
    const y = smoothstep(x);

    values.push(y * max);
  }

  if (isReverse) {
    return values.reverse();
  } else {
    return values;
  }
}

function updateRr() {
  var current = TYRANO.kag.hbsim.variables.breathStatus.current;
  var data = TYRANO.kag.hbsim.chart.rr.data;

  // 呼吸がある場合、キューを作成
  if (!current.isAddedQue) {
    var respiratoryRate =
      TYRANO.kag.hbsim.variables.breathStatus.respiratoryRate;
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

    TYRANO.kag.hbsim.variables.breathStatus.current.isAddedQue = true;
  }

  var yValues = data.y;
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
  data.y = yValues;
  Plotly.update("rr", [data], TYRANO.kag.hbsim.chart.rr.layout);
  TYRANO.kag.hbsim.chart.rr.data = data;

  // 更新したY軸が配列の最後の場合は Index を 0 に戻す
  if (rrYIndex >= data.x.length - 1) {
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
    var target_layer = TYRANO.kag.layer.getLayer(pm.layer, pm.page);
    var chart = $("<div id='rr'></div>");
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
    TYRANO.kag.hbsim.chart.rr.layout = layout;
    TYRANO.kag.hbsim.chart.rr.data = data;
    TYRANO.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.start_rr = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    liveRr();

    this.kag.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.update_rr = {
  kag: TYRANO.kag,
  vital: [],
  pm: {},
  start: function () {
    TYRANO.kag.ftag.master_tag.ptext.start({
      layer: "0",
      page: "fore",
      x: 1190,
      y: 157,
      vertical: "false",
      text: `RR: ${TYRANO.kag.hbsim.variables.breathStatus.respiratoryRate}`,
      size: "20",
      hexColor: "#42e0f5",
      bold: "bold",
      align: "left",
      name: "RR",
      zindex: "9999",
      overwrite: "true",
      isAsync: "true",
    });
  },
};
