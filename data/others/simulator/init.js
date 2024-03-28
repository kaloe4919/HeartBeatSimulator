TYRANO.kag.hbsim = {
  chart: {
    ecg: {
      data: null,
      layout: null,
    },
    rr: {
      data: null,
      layout: null,
    },
  },
  variables: {
    event: {
      onTalkEvent: false,
    },
    heartStatus: {
      // heartRate recovers to this rate
      baseHeartRate: 65,
      heartRate: 65,
      prevHeartRate: 65,
      heartRateMin: 60,
      heartRateMax: 70,
      // used to control atrial motion, sync with heart rate
      // arrhythmias cause differences in ventricular and atrial heart rates (VT, AF, etc)
      atrialHeartRate: 65,
      // variable increase by rapid changes in heart rate
      burden: 10,
      // variable increase by changes in emotions
      stress: 0,
      // variable increase by compression or hacking
      pressure: 0,
      // high value cause to Atrial Fibrillation(AF)
      saNodeBurden: 5,
      // high value cause to AV nodal reentrant tachycardia(SVT) and AV block
      avNodeBurden: 5,
      // high value cause to Premature Ventricular Contractions(PVC) and Ventricular Tachycardia(VT)
      ventricleBurden: 5,
      // variable increase by compression or hacking or etc
      // high value cause to device malfunction
      deviceDamage: 0,
      isAsyncAtrial: false,
      isPVC: false,
      isVT: false,
      countVT: 0,
      isActiveDevice: true,
      seVol: 75,
      // used by vital monitors to output graphs
      current: {
        type: "Normal",
        isAddedQue: true,
      },
    },
    breathStatus: {
      respiratoryRate: 15,
      // used by vital monitors to output graphs
      current: {
        type: "Normal",
        isAddedQue: true,
      },
    },
  },
};
