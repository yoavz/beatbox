Template.trackOptions.rendered = function () {
  // make the noui slider reactively set it's value
  this.autorun(function () {
    var self = this.templateInstance();
    self.$('.volume-slider').val(self.data.volume);
  });
};
Template.trackOptions.helpers({
  instruments: function () {
    return INSTRUMENTS_808;
  },
  color: function (darkness) {
    color = COLORS[_.indexOf(INSTRUMENTS_808, this.instrument) % COLORS.length];
    return PALETTES[color][darkness];
  }
});
Template.trackOptions.events({

  'click .volume-slider': function (e) {
    //display something
    if (roomLocked())
      return; 

    volume = $(e.target).val();
    volume = Math.floor(volume);
    Meteor.call('updateTrack', this._id, { volume: volume });
  },

  'click .instrument': function (e) {
    if (roomLocked())
      return; 

    instruments = allInstruments();
    index = _.indexOf(instruments, this.instrument);
    if (index >= instruments.length - 1)
      index = 0;
    else
      index += 1;
    newInstrument = instruments[index];

    Meteor.call('updateTrack', this._id, { instrument: newInstrument });
    FastPlayer.playInstrument(newInstrument, this.volume);
  },

  'click .reset-button': function () {
    if (!roomLocked())
      Meteor.call('resetTrack', this._id);
  },

  'click .remove-button': function () {
    if (!roomLocked())
      Meteor.call('removeTrack', this._id);
  },

  'click .mute-button': function () {
    if (!roomLocked())
      Meteor.call('updateTrack', this._id, { muted: !this.muted });
  }

});

function roomLocked() {
    room = Template.parentData(1);
    if (room.locked && !ownsRoom(room, Meteor.user()))
      return true;

    return false;
}
