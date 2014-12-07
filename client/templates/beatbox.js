Template.beatbox.created = function () {

  // init the music
  initPlayer();

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

});
