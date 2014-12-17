Template.room.created = function () {
  // init the music
  FastPlayer.loadBeatboxSounds();
}

Template.room.helpers({
  tracks: function () {
    return Tracks.find()
  },
});

Template.room.events({

  "click .add-track": function () {
    console.log(this);
    Meteor.call("newTrack", this._id);
  },

});
