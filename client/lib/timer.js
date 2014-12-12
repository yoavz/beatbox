TEMPO = 100;
INTERVAL = null;

// timing functionality
play = function() {
  INTERVAL = Meteor.setInterval(function () {
      current = Session.get("absoluteTime");
      Session.set("absoluteTime", current === undefined ? 0 : current + 1)
  }, TEMPO);
}

// player is stopped if absoluteTime in session in -1 or undefined
isPlaying = function() {
  return !(Session.get("absoluteTime") === -1 || Session.get("absoluteTime") === undefined);
}

stop = function () {
  pause();
  Session.set("absoluteTime", -1);
}

pause = function() {
  Meteor.clearInterval(INTERVAL);
  INTERVAL = null;
}
