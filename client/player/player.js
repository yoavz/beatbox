
ABS_TIME = "absoluteTime";
TEMPO = 200;

if (Meteor.isClient) {

  Meteor.setInterval(function () {
      current = Session.get(ABS_TIME);
      Session.set(ABS_TIME, current !== undefined ? current+1 : 0);
  }, TEMPO);

}

