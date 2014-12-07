ABS_TIME = "absoluteTime";
TEMPO = 100;

play = function() {
  INTERVAL = Meteor.setInterval(function () {
      current = Session.get(ABS_TIME);
      Session.set(ABS_TIME, current !== undefined ? current+1 : 0);
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

