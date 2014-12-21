Template.beat.helpers({
  beatClass: function () {
    var currentBeat = Session.get('absoluteTime') % this.numBeats;
    var current = this.pos === currentBeat ? 'current' : '';
    var active = this.active ? 'active' : '';
    return current + ' ' + active;
  },
  beatStyle: function () {
    instrument = Template.parentData(1).instrument;
    color = getInstrumentColor(instrument);
    if (this.active) {
      a = 20;
      p = '0px 1px 0px';
    } else {
      a = 0;
      p = '0px 6px 0px';
    }
    res = 'background: ' + PALETTES[color][40 + a] + ';' + '-webkit-box-shadow: ' + p + ' ' + PALETTES[color][50 + a] + ';' + '-moz-box-shadow: ' + p + ' ' + PALETTES[color][50 + a] + ';' + 'box-shadow: ' + p + ' ' + PALETTES[color][50 + a] + ';';
    // console.log(res);
    return res;
  }
});