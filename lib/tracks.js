// Schema : {
//  instrument:
// }

Tracks = new Meteor.Collection("tracks")

Meteor.methods({
  "newTrack": function () {
    trackId = Tracks.insert({
      instrument: "hihat"
    });

    for (var i=0; i<16; i++) {
      Beats.insert({
        trackId: trackId,
        active: false,
        pos: i,
      });
    }
  },

  "removeTrack": function (trackId) {
    Beats.remove({trackId: trackId});
    Tracks.remove(trackId);
  }
});
