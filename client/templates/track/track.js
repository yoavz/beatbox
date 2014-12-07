Template.track.created = function () {

  this.autorun(function () {
    var self = this.templateInstance();

    currBeat = Session.get("absoluteTime") % 16;
    nextBeat = (currBeat + 1) % 16

    // queue up the sound for the next beat
    if (_.has(self.data, nextBeat) && self.data[nextBeat]) {
      queueSound(self.data.instrument, {volume: self.data.volume});
    }

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

});

Template.track.events({

  "click .reset-button": function () {
    Meteor.call("resetTrack", this._id);
  },

  "click .remove-track": function () {
    Meteor.call("removeTrack", this._id);
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

});
