MAPPINGS_808 = {
  "snare": "/samples/808/snare.ogg",
  "kick": "/samples/808/kick.ogg",
  "hihat": "/samples/808/chh.ogg",
  "clave": "/samples/808/clave.ogg",
  "cowbell": "/samples/808/cow.ogg",
  "rim": "/samples/808/rim.ogg",
  "cymbal": "/samples/808/cymbal.ogg",
  "clap": "/samples/808/clap.ogg",
}

Template.track.created = function () {

  this.autorun(function () {
    var self = this.templateInstance();

    // if the sound is not defined OR the instrument has changed, update it
    if (!this.sound || this.sound.instrument !== self.data.instrument) {
      this.sound = soundManager.createSound({
          url: MAPPINGS_808[self.data.instrument]
      });

      this.sound.instrument = self.data.instrument;
    }

    var beat = Session.get("absoluteTime") % 16;

    if (_.has(self.data, beat) && self.data[beat])
      this.sound.play({
        volume: self.data.volume
      });
  });

};

Template.track.rendered = function () {
  // noUISlider
  slider = this.$(".volume-slider").noUiSlider({
    start: [100],
    range: {
      'min': 0,
      'max': 100
    }
  });

};

Template.track.helpers({

  beats: function () {

    // This is super ugly, is there a functional way
    // to do this?
    res = []
    for (i=0; i<16; i++) {
      if (_.has(this, i) && this[i]) {
        res.push({
          pos: i,
          active: true,
        });
      } else {
        res.push({
          pos: i,
          active: false
        });
      }
    }

    return res;
  }, 

  instruments: function () {
    return _.keys(MAPPINGS_808);
  },

  isSelected: function (instr) {
    return instr == this.toString() ? "selected" : "";
  }

});

Template.track.events({

  "click .reset-button": function () {
    Meteor.call("resetTrack", this._id);
  },

  "click .remove-track": function () {
    Meteor.call("removeTrack", this._id);
  },

  "change .select-instrument": function (e) {
    fields = {
      "instrument": $(e.target).find(":selected").text()
    }

    Tracks.update(this._id, {$set: fields}, false);
  },

  "click .beat": function (e) {
    target = $(e.target);

    pos = target.attr("pos");
    active = target.hasClass("active");

    updateFields = {}
    updateFields[pos] = !active;

    track = Template.parentData();
    Tracks.update(track._id, {$set: updateFields}, false);
  },

  "set .volume-slider": function (e) {
    volume = $(e.target).val();
    volume = Math.floor(volume);

    track = Template.parentData();
    Tracks.update(track._id, {$set: {volume: volume}}, false);
  }
});
