async function breathNormal() {
  var f = TYRANO.kag.stat.f;
  // Set values for vital monitor
  f.rrQueType = "Normal";
  f.isRrAddedQue = false;

  playActorBreathMotion();
  await sleep(Math.floor((60 / f.respiratoryRate) * 1000));
}

// main loop of breath
async function breath() {
  var isDefinedRr = true;
  while (isDefinedRr) {
    var f = TYRANO.kag.stat.f;
    var ftag = TYRANO.kag.ftag;
    var hbsim = TYRANO.kag.hbsim;

    console.log("breath");
    // Update RespiratoryRate from heartRate
    var heartRate = f.heartRate;
    f.respiratoryRate = Math.round((heartRate / 65) * 15);

    // Update expression
    updateExpression();

    // Update RR Display
    ftag.master_tag.update_rr.start();

    await breathNormal();

    f.prevRespiratoryRate = f.respiratoryRate;
  }
}
