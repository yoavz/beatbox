TEMPO = 100;

// timing functionality
play = function() {

  INTERVAL = Meteor.setInterval(function () {
      current = Session.get("absoluteTime");
      Session.set("absoluteTime", current === undefined ? 0 : current + 1)
  }, TEMPO);

  Session.set("interval", INTERVAL);

}

isPlaying = function() {
  return Session.get("interval");
}

stop = function() {
  Meteor.clearInterval(Session.get("interval"));
  Session.set("interval", null);
}
