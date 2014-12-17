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
    Meteor.call("increaseBeats", this._id);
  },

  "click .decrease-beats": function () {
    Meteor.call("decreaseBeats", this._id);
  }
});
