TYRANO.kag.ftag.master_tag.heartbeat_start = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    heartbeat();

    this.ftag.nextOrder();
  },
};

TYRANO.kag.ftag.master_tag.set_heart_rate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    this.f.heartRate = value;
    this.f.heartRateMin = value - 10;
    this.f.heartRateMax = value + 10;

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.set_base_heart_rate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["value"],
  pm: {
    value: "65",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    console.log(`baseHeartRate change to ${value}`);
    this.f.baseHeartRate = value;

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.calculate_heartRate = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["value", "operator"],
  pm: {
    value: "0",
    operator: "+",
    // 加算/減算の結果が limit より大きい/小さい場合、演算をしない
    limit: "",
    // trueにすると、加算/減算の結果が limit より大きい/小さい場合、limit の値が強制的に代入される
    limitForce: "false",
    isAsync: "false",
  },
  start: function (pm) {
    var value = parseInt(pm.value);
    var limit = parseInt(pm.limit);

    if (pm.operator === "+") {
      if (limit && this.f.heartRate + value >= limit) {
        if (pm.limitForce === "true") {
          console.log(`heartRate change ${this.f.heartRate} → ${limit}`);
          this.f.heartRate = limit;
          this.f.heartRateMin = limit - 10;
          this.f.heartRateMax = limit + 10;
          return;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && this.f.heartRate + value < limit) || !limit) {
        console.log(
          `heartRate change ${this.f.heartRate} → ${this.f.heartRate + value}`,
        );
        this.f.heartRate += value;
        this.f.heartRateMin += value;
        this.f.heartRateMax += value;
        return;
      }
    }
    if (pm.operator === "-") {
      if (limit && this.f.heartRate - value <= limit) {
        if (pm.limitForce === "true") {
          console.log(`heartRate change ${this.f.heartRate} → ${limit}`);
          this.f.heartRate = limit;
          this.f.heartRateMin = limit - 10;
          this.f.heartRateMax = limit + 10;
        } else {
          console.log(`heartRate no change`);
          return;
        }
      }
      if ((limit && this.f.heartRate - value > limit) || !limit) {
        console.log(
          `heartRate change ${this.f.heartRate} → ${this.f.heartRate - value}`,
        );
        this.f.heartRate -= value;
        this.f.heartRateMin -= value;
        this.f.heartRateMax -= value;
      }
    }

    if (!"true" == pm.isAsync) {
      this.ftag.nextOrder();
    }
  },
};

TYRANO.kag.ftag.master_tag.set_heart_se_vol = {
  f: TYRANO.kag.stat.f,
  ftag: TYRANO.kag.ftag,
  vital: ["vol"],
  pm: {
    vol: "75",
  },
  start: function (pm) {
    // TODO: 心音OFFの場合は強制的に0にする
    var vol = parseInt(pm.vol);
    console.log(`set heart beat se volume to ${vol}`);
    this.f.beatVol = parseInt(vol);

    this.ftag.nextOrder();
  },
};
