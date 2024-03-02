TYRANO.kag.hbsim = {};
TYRANO.kag.hbsim.chart = {
  ecg: {
    data: null,
    layout: null,
  },
  rr: {
    data: null,
    layout: null,
  },
};
TYRANO.kag.hbsim.variables = {
  heartStatus: {
    heartRate: 65,
    heartRateMin: 60,
    heartRateMax: 70,
    condition: 100,
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
};
