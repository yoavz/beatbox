Tracks = new Meteor.Collection("tracks")

Meteor.methods({
  "resetAll": function () {
    // Tracks.update({}, {
    //   $set: beatsObj()
    // }, {
    //   multi: true
    // });    
  },

  "newTrack": function () {
    track = {
      instrument: "snare",
      volume: 50,
      muted: false,
    }

    _.extend(track, beatsObj(16));

    trackId = Tracks.insert(track);
  },

  "removeTrack": function (trackId) {
    Tracks.remove(trackId);
  },

  "resetTrack": function (trackId) {
    // Tracks.update(trackId, {
    //   $unset: beatsObj()
    // }, false);    
  }
});

// generate n empty beats
function beatsObj (N) {
    return _.object(_.map(_.range(N), function (n) {
      return [n, false]
    }));
}

// returns the total number of beats, passed in a track obj
// {
//    0: true,
//    15: false 
// } --> returns 16
//
// {
//    0: true,
//    1: false
// } --> returns 2

numBeats = function (track) {
  // get the beats from the track object
  actualBeats = _.filter(_.keys(track), function (n) { 
    return !isNaN(n) ;
  });

  //the track may be missing some, so the number of beats is the max beat found
  return Math.max.apply(null, actualBeats) + 1
}
