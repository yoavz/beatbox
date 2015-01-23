Template.room.created = function () {
  // init the music
  FastPlayer.loadBeatboxSounds();
};

Template.room.helpers({
  tracks: function () {
    return Tracks.find();
  },

});

Template.room.events({
  'click .add-track': function () {
    // display error
    if (this.locked && !ownsRoom(this, Meteor.user()))
      return;
      
    Meteor.call('newTrack', this._id);
  }
});
