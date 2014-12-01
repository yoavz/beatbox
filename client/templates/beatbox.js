Template.beatbox.created = function () {
  soundManager.setup({
    debugMode: false,
    consoleOnly: false,
  });
}

Template.beatbox.helpers({
  tracks: function () {
    return Tracks.find()
  },
});

Template.beatbox.events({

  "click .add-track": function () {
    Meteor.call("newTrack");
  },

  "click .remove-track": function () {
    Meteor.call("removeTrack", this._id);
  },

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
