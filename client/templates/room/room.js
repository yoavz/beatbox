Template.room.created = function () {
  // init the music
  FastPlayer.loadBeatboxSounds();
};

Template.room.helpers({
  tracks: function () {
    return Tracks.find();
  },

  sessions: function () {
    return UserSessions.find().count();
  },

});

Template.room.events({
  'click .add-track': function () {
    Meteor.call('newTrack', this._id);
  }
});
