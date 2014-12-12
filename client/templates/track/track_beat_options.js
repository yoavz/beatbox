Template.trackBeatOptions.helpers({
  "numBeats": function () {
    return numBeats(this);
  },

  "increaseNumBeats": function () {
    beats = numBeats(this);
    return (beats < 32) ? "<i class=\"fa fa-plus-circle increase-beats\"></i>" : ""
  },

  "decreaseNumBeats": function () {
    beats = numBeats(this);
    return (beats > 16) ? "<i class=\"fa fa-minus-circle decrease-beats\"></i>" : ""
  }
});

Template.trackBeatOptions.events({
  "click .increase-beats": function () {
    beats = numBeats(this); 

    updateFields = {}
    updateFields[beats] = false;

    Tracks.update(this._id, {$set: updateFields}, false);
  },

  "click .decrease-beats": function () {
    beats = numBeats(this); 

    updateFields = {}
    updateFields[beats-1] = "";

    Tracks.update(this._id, {$unset: updateFields}, false);
  }
});
