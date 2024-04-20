TYRANO.kag.ftag.master_tag.breath_start = {
  ftag: TYRANO.kag.ftag,
  vital: [],
  pm: {},
  start: function () {
    breath();

    this.ftag.nextOrder();
  },
};
