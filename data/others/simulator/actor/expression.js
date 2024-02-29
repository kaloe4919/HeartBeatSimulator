TYRANO.kag.hbsim.expression = {
  current: "Normal",
  prevStatus: { resiratoryRate: 15 },
  update: function () {
    var resiratoryRate =
      TYRANO.kag.hbsim.variables.breath_status.resiratoryRate;
    console.log(resiratoryRate, this.current);
    if (
      resiratoryRate <= 20 &&
      this.current !== "Normal" &&
      // 表情の激しい変動を防ぐために前回の update 時のバイタルから値がかけ離れた場合のみ変動させる
      Math.abs(resiratoryRate - this.prevStatus.resiratoryRate) > 1
    ) {
      console.log("Normal");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Normal",
        isAsync: "true",
      });
      this.current = "Normal";
      this.prevStatus.resiratoryRate = resiratoryRate;
      return;
    }
    if (
      resiratoryRate > 20 &&
      resiratoryRate <= 26 &&
      this.current !== "Painful1" &&
      Math.abs(resiratoryRate - this.prevStatus.resiratoryRate) > 1
    ) {
      console.log("Painful1");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful1",
        isAsync: "true",
      });
      this.current = "Painful1";
      this.prevStatus.resiratoryRate = resiratoryRate;
      return;
    }
    if (
      resiratoryRate > 26 &&
      resiratoryRate <= 32 &&
      this.current !== "Painful2" &&
      Math.abs(resiratoryRate - this.prevStatus.resiratoryRate) > 1
    ) {
      console.log("Painful2");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful2",
        isAsync: "true",
      });
      this.current = "Painful2";
      this.prevStatus.resiratoryRate = resiratoryRate;
      return;
    }
    if (
      resiratoryRate > 32 &&
      this.current !== "Painful3" &&
      Math.abs(resiratoryRate - this.prevStatus.resiratoryRate) > 1
    ) {
      console.log("Painful3");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful3",
        isAsync: "true",
      });
      this.current = "Painful3";
      this.prevStatus.resiratoryRate = resiratoryRate;
      return;
    }
  },
};
