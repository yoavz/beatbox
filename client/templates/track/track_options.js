Template.trackOptions.rendered = function () {

  // make the noui slider reactively set it's value
  this.autorun(function () {
    var self = this.templateInstance();
    self.$(".volume-slider").val(self.data.volume);
  });


}

Template.trackOptions.helpers({
  instruments: function () {
    return INSTRUMENTS_808;
  },

  instrumentColor: function () {
    return RAINBOW[_.indexOf(INSTRUMENTS_808, this.instrument) % RAINBOW.length]
  }
});

Template.trackOptions.events({
  "set .volume-slider": function (e) {
    volume = $(e.target).val();
    volume = Math.floor(volume);

    Tracks.update(this._id, {$set: {volume: volume}}, false);
  },

  "click .instrument": function (e) {
    instruments = allInstruments();
    index = _.indexOf(instruments, this.instrument);
    if (index >= instruments.length - 1)
      index = 0
    else
      index += 1

    newInstrument = instruments[index];
    Tracks.update(this._id, {$set: {instrument: newInstrument}}, false);
    FastPlayer.playInstrument(newInstrument, this.volume);
  },

  "click .reset-button": function () {
    Meteor.call("resetTrack", this._id);
  },

  "click .remove-button": function () {
    Meteor.call("removeTrack", this._id);
  },

  "click .mute-button": function () {
    Tracks.update(this._id, {$set: {muted: !this.muted}}, false);
  }
});
