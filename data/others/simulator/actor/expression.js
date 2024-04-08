function expressionHandler() {
  var f = TYRANO.kag.stat.f;
  var ftag = TYRANO.kag.ftag;

  if (
    f.respiratoryRate <= 20 &&
    f.currentExpression !== "Normal" &&
    // 表情の激しい変動を防ぐために前回の update 時のバイタルから値がかけ離れた場合のみ変動させる
    Math.abs(f.respiratoryRate - f.prevRespiratoryRate) > 1
  ) {
    console.log("Normal");
    ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Normal",
      isAsync: "true",
    });
    f.currentExpression = "Normal";
    f.prevRespiratoryRate = f.respiratoryRate;
    return;
  }
  if (
    f.respiratoryRate > 20 &&
    f.respiratoryRate <= 26 &&
    f.currentExpression !== "Painful1" &&
    Math.abs(f.respiratoryRate - f.prevRespiratoryRate) > 1
  ) {
    console.log("Painful1");
    ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful1",
      isAsync: "true",
    });
    f.currentExpression = "Painful1";
    f.prevRespiratoryRate = f.respiratoryRate;
    return;
  }
  if (
    f.respiratoryRate > 26 &&
    f.respiratoryRate <= 32 &&
    f.currentExpression !== "Painful2" &&
    Math.abs(f.respiratoryRate - f.prevRespiratoryRate) > 1
  ) {
    console.log("Painful2");
    ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful2",
      isAsync: "true",
    });
    f.currentExpression = "Painful2";
    f.prevRespiratoryRate = f.respiratoryRate;
    return;
  }
  if (
    f.respiratoryRate > 32 &&
    f.currentExpression !== "Painful3" &&
    Math.abs(f.respiratoryRate - f.prevRespiratoryRate) > 1
  ) {
    console.log("Painful3");
    ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful3",
      isAsync: "true",
    });
    f.currentExpression = "Painful3";
    f.prevRespiratoryRate = f.respiratoryRate;
    return;
  }
}

TYRANO.kag.hbsim.expression = {
  f: TYRANO.kag.stat.f,
  current: "Normal",
  update: function () {
    // do not change expression in talk event
    if (this.f.onTalkEvent) {
      return;
    }

    // TODO: used only compress event
    if (this.f.onCompressEvent) {
      // expressionOntCompressEventHandler();
    }

    expressionHandler();
  },
};
