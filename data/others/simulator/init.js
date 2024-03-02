TYRANO.kag.hbsim = {};
TYRANO.kag.hbsim.chart = { ecg: {}, rr: {} };
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
    resiratoryRate: 15,
    // used by vital monitors to output graphs
    current: {
      type: "Normal",
      isAddedQue: true,
    },
  },
};
