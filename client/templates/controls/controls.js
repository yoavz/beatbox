Template.controls.helpers({
  "isPlaying" : function () {
    return isPlaying();
  },

  "tempo": function () {
    return TEMPO;
  }
});

Template.controls.events({
  "click .reset-beats": function () {
    Meteor.call("resetAll");
  },

  "click .stop-start": function () {
    if (isPlaying()) {
      stop();
    } else {
      play();
    }
  }
});
