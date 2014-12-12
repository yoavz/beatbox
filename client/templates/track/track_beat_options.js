Template.trackBeatOptions.helpers({
  "numBeats": function () {
    return numBeats(this);
  },

  "increaseDisabled": function () {
    beats = numBeats(this);
    return (beats < 32) ? "" : "disabled"
  },

  "decreaseDisabled": function () {
    beats = numBeats(this);
    return (beats > 1) ? "" : "disabled"
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
