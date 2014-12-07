INTERVAL = null;
ABS_TIME = "absoluteTime";
TEMPO = 100;

play = function() {
  INTERVAL = Meteor.setInterval(function () {
      current = Session.get(ABS_TIME);
      Session.set(ABS_TIME, current !== undefined ? current+1 : 0);
  }, TEMPO);
}

isPlaying = function() {
  return INTERVAL !== null;
}

stop = function() {
  Meteor.clearInterval(INTERVAL);
  INTERVAL = null;
}

