Template.trackOptions.helpers({
  instruments: function () {
    return INSTRUMENTS_808;
  },

  instrumentColor: function () {
    rainbow = ["#78c5d6", "#459ba8", "#79c267", "#c5d647",
               "#f5d63d", "#f28c33", "#e868a2", "#bf62a6"]

    return rainbow[_.indexOf(INSTRUMENTS_808, this.instrument) % rainbow.length]
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

});
