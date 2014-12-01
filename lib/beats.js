// {
//  "trackId":
//  "pos":
//  "active":
// }

Beats = new Meteor.Collection("beats");

Meteor.methods({
  resetAll: function () {
    Beats.update({}, {
      $set: {active: false}
    }, {
      multi: true,
      upsert: false
    });
  },

  resetTrack: function (trackId) {
    check(trackId, String);

    Beats.update({trackId: trackId}, {
      $set: {active: false}
    }, {
      multi: true,
      upsert: false
    });
  }
});
