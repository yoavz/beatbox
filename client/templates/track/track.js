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


Template.track.rendered = function () {

  // this function gets run time increment
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

    if (Beats.find({trackId: self.data._id, pos: beat, active: true}).count() > 0)
      this.sound.play();

  });

}

Template.track.helpers({

  beats: function () {
    return Beats.find({trackId: this._id});
  }, 

  instruments: function () {
    return _.keys(MAPPINGS_808);
  },

  isSelected: function (instr) {
    console.log(instr);
    return instr === this.instrument ? "selected" : "";
  }

});

Template.track.events({

  "click .reset-button": function () {
    Meteor.call("resetTrack", this._id);
  },

  "change .select-instrument": function (e) {
    fields = {
      "instrument": $(e.target).find(":selected").text()
    }

    Tracks.update(this._id, {$set: fields}, false);
  }
});

Template.beat.helpers({

  beatClass: function () {
    var currentBeat = Session.get("absoluteTime") % 16;
    var current = (this.pos === currentBeat) ? "current" : "";
    var active = this.active ? "active" : "";
    return current + " " + active; 
  }, 
  
});

Template.beat.events({
  "click .beat": function (e) {
    updateFields = {
      "active": !this.active
    }
    Beats.update(this._id, {$set: updateFields}, false);
  }
});
