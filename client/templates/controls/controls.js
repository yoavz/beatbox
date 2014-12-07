Template.controls.helpers({
  "playStatus": function () {
    return !isPlaying() ? "&#9654;" : "&#9616;&#9616;"
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
