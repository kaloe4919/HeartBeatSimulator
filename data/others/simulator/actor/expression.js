TYRANO.kag.hbsim.expression = {
  current: "Normal",
  prevStatus: { respiratoryRate: 15 },
  update: function () {
    // do not change expression in talk event
    if (TYRANO.kag.stat.f.onTalkEvent) {
      return;
    }

    var respiratoryRate = TYRANO.kag.stat.f.respiratoryRate;
    if (
      respiratoryRate <= 20 &&
      this.current !== "Normal" &&
      // 表情の激しい変動を防ぐために前回の update 時のバイタルから値がかけ離れた場合のみ変動させる
      Math.abs(respiratoryRate - this.prevStatus.respiratoryRate) > 1
    ) {
      console.log("Normal");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Normal",
        isAsync: "true",
      });
      this.current = "Normal";
      this.prevStatus.respiratoryRate = respiratoryRate;
      return;
    }
    if (
      respiratoryRate > 20 &&
      respiratoryRate <= 26 &&
      this.current !== "Painful1" &&
      Math.abs(respiratoryRate - this.prevStatus.respiratoryRate) > 1
    ) {
      console.log("Painful1");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful1",
        isAsync: "true",
      });
      this.current = "Painful1";
      this.prevStatus.respiratoryRate = respiratoryRate;
      return;
    }
    if (
      respiratoryRate > 26 &&
      respiratoryRate <= 32 &&
      this.current !== "Painful2" &&
      Math.abs(respiratoryRate - this.prevStatus.respiratoryRate) > 1
    ) {
      console.log("Painful2");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful2",
        isAsync: "true",
      });
      this.current = "Painful2";
      this.prevStatus.respiratoryRate = respiratoryRate;
      return;
    }
    if (
      respiratoryRate > 32 &&
      this.current !== "Painful3" &&
      Math.abs(respiratoryRate - this.prevStatus.respiratoryRate) > 1
    ) {
      console.log("Painful3");
      TYRANO.kag.ftag.master_tag.live2d_expression.start({
        name: "Kyoka",
        expression: "Painful3",
        isAsync: "true",
      });
      this.current = "Painful3";
      this.prevStatus.respiratoryRate = respiratoryRate;
      return;
    }
  },
};
