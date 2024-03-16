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
      heartRate: 65,
      heartRateMin: 60,
      heartRateMax: 70,
      // used for arrhythmias that cause differences in heart rate of the ventricles and atria (VT, AF, etc)
      atrialHeartRate: 65,
      // variable increase by rapid changes in heart rate
      burden: 0,
      // variable increase by changes in emotions
      stress: 0,
      // variable increase by compression or hacking
      pressure: 0,
      // high value cause to Atrial Fibrillation(AF)
      saNodeBurden: 0,
      // high value cause to AV nodal reentrant tachycardia(SVT) and AV block
      avNodeBurden: 0,
      // high value cause to Premature Ventricular Contractions(PVC) and Ventricular Tachycardia(VT)
      ventricleBurden: 0,
      // variable increase by compression or hacking or etc
      // high value cause to device malfunction
      deviceDamage: 0,
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
