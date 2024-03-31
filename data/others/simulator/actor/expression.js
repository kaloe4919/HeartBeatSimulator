function expressionHandler() {
  var stat = TYRANO.kag.stat.f;
  if (
    stat.respiratoryRate <= 20 &&
    stat.currentExpression !== "Normal" &&
    // 表情の激しい変動を防ぐために前回の update 時のバイタルから値がかけ離れた場合のみ変動させる
    Math.abs(stat.respiratoryRate - stat.prevRespiratoryRate) > 1
  ) {
    console.log("Normal");
    TYRANO.kag.ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Normal",
      isAsync: "true",
    });
    TYRANO.kag.stat.f.currentExpression = "Normal";
    stat.prevRespiratoryRate = stat.respiratoryRate;
    return;
  }
  if (
    stat.respiratoryRate > 20 &&
    stat.respiratoryRate <= 26 &&
    stat.currentExpression !== "Painful1" &&
    Math.abs(stat.respiratoryRate - stat.prevRespiratoryRate) > 1
  ) {
    console.log("Painful1");
    TYRANO.kag.ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful1",
      isAsync: "true",
    });
    TYRANO.kag.stat.f.currentExpression = "Painful1";
    stat.prevRespiratoryRate = stat.respiratoryRate;
    return;
  }
  if (
    stat.respiratoryRate > 26 &&
    stat.respiratoryRate <= 32 &&
    stat.currentExpression !== "Painful2" &&
    Math.abs(stat.respiratoryRate - stat.prevRespiratoryRate) > 1
  ) {
    console.log("Painful2");
    TYRANO.kag.ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful2",
      isAsync: "true",
    });
    TYRANO.kag.stat.f.currentExpression = "Painful2";
    stat.prevRespiratoryRate = stat.respiratoryRate;
    return;
  }
  if (
    stat.respiratoryRate > 32 &&
    stat.currentExpression !== "Painful3" &&
    Math.abs(stat.respiratoryRate - stat.prevRespiratoryRate) > 1
  ) {
    console.log("Painful3");
    TYRANO.kag.ftag.master_tag.live2d_expression.start({
      name: "Kyoka",
      expression: "Painful3",
      isAsync: "true",
    });
    TYRANO.kag.stat.f.currentExpression = "Painful3";
    stat.prevRespiratoryRate = stat.respiratoryRate;
    return;
  }
}

TYRANO.kag.hbsim.expression = {
  current: "Normal",
  update: function () {
    // do not change expression in talk event
    if (TYRANO.kag.stat.f.onTalkEvent) {
      return;
    }

    // TODO: used only compress event
    if (TYRANO.kag.stat.f.onCompressEvent) {
      // expressionOntCompressEventHandler();
    }

    expressionHandler();
  },
};
