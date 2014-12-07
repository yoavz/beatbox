Template.controls.helpers({
  "playStatus": function () {
    return !isPlaying() ? "&#9654;" : "&#9612;&#9612;"
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
