// Schema : {
//  instrument:
// }

Tracks = new Meteor.Collection("tracks")

Meteor.methods({
  "resetAll": function () {
    Tracks.update({}, {
      $unset: beatsObj()
    }, {
      multi: true
    });    
  },

  "newTrack": function () {
    trackId = Tracks.insert({
      instrument: "snare"
    });
  },

  "removeTrack": function (trackId) {
    Tracks.remove(trackId);
  },

  "resetTrack": function (trackId) {
    Tracks.update(trackId, {
      $unset: beatsObj()
    }, false);    
  }
});

function beatsObj () {
    return _.object(_.map(_.range(16), function (n) {
      return [n, ""]
    }));
}
