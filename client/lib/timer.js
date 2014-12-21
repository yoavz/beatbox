DEFAULT_BPM = 100;
Metronome = new metronome(DEFAULT_BPM);
function metronome(initialBpm) {
  if (initialBpm < 0 || initialBpm > 300)
    throw 'Illegal tempo, please use a value between 0 and 300';
  var bpmToMS = function (bpm) {
  };
  var bpm = new ReactiveVar(initialBpm);
  var stopped = new ReactiveVar(true);
  var timeout = null;
  this.isActive = function () {
    return !stopped.get();
  };
  this.changeTempo = function (b) {
    if (b < 0 || b > 300) {
      console.log('Metronome: Tempo must be between 0-300');
      return;
    }
    bpm.set(b);
  };
  this.currentTempo = function () {
    return bpm.get();
  };
  this.play = function () {
    stopped.set(false);
    this.loop();
  };
  this.stop = function () {
    Meteor.clearTimeout(this.timeout);
    stopped.set(true);
    Session.set('absoluteTime', -1);
  };
  var updateTime = function () {
    current = Session.get('absoluteTime');
    Session.set('absoluteTime', current === undefined ? 0 : current + 1);
  };
  this.loop = function () {
    var self = this;
    // one timeout for every 1/4 beat
    var ms = Math.floor(60000 / (4 * bpm.get()));
    updateTime();
    Meteor.clearTimeout(this.timeout);
    this.timeout = Meteor.setTimeout(function () {
      self.loop();
    }, ms);
  };
}