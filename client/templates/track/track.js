Template.track.created = function () {

  this.autorun(function () {
    var self = this.templateInstance();

    currBeat = Session.get("absoluteTime") % 16;

    if (_.has(self.data, currBeat) && self.data[currBeat]) {
      FastPlayer.playSound(self.data.instrument, self.data.volume);
    }

  });

};

Template.track.rendered = function () {
  // this is bound to the templateInstance inside the rendered function
  // context lives in this.data
  var trackInstance = this;

  // noUISlider
  slider = this.$(".volume-slider").noUiSlider({
    start: [parseInt(trackInstance.data.volume)],
    range: {
      'min': 0,
      'max': 100
    }
  });
  //
  // console.log(track.volume);

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
