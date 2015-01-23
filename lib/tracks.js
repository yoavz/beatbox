Tracks = new Meteor.Collection('tracks');

// only allow updates to beats, volume, instrument, and muted
Tracks.allowedFields = [
  'volume',
  'instrument',
  'muted'
]

Meteor.methods({

  'newTrack': function (roomId) {
    check(roomId, String);

    room = Rooms.findOne(roomId);
    if (!room)
      throw new Meteor.Error("invalid room id");

    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    track = {
      roomId: roomId,
      instrument: INSTRUMENTS_808[0],
      volume: 50,
      muted: false
    };
    _.extend(track, beatsObj(16));
    trackId = Tracks.insert(track);
  },

  'removeTrack': function (trackId) {
    check(trackId, String);

    track = Tracks.findOne(trackId)
    if (!track)
      throw new Meteor.Error("invalid track id");

    room = Rooms.findOne(track.roomId)
    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    Tracks.remove(trackId);
  },

  'resetTrack': function (trackId) {
    check(trackId, String);

    track = Tracks.findOne(trackId);
    if (!track)
      throw new Meteor.Error('invalid track id');

    room = Rooms.findOne(track.roomId)
    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    Tracks.update(trackId, { $set: beatsObj(numBeats(track)) }, false);
  },

  'increaseBeats': function (trackId) {
    check(trackId, String);

    track = Tracks.findOne(trackId);
    if (!track)
      throw new Meteor.Error('invalid track id');

    room = Rooms.findOne(track.roomId)
    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    beats = numBeats(track);
    if (beats >= 32)
      throw new Meteor.Error('Cannot go over 32 beats in one track');
    updateFields = {};
    updateFields[beats] = false;
    return Tracks.update(trackId, { $set: updateFields }, false);
  },

  'decreaseBeats': function (trackId) {
    check(trackId, String);

    track = Tracks.findOne(trackId);
    if (!track)
      throw new Meteor.Error('invalid track id');

    room = Rooms.findOne(track.roomId)
    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    beats = numBeats(track);
    if (beats <= 1)
      throw new Meteor.Error('Cannot decrease below 1 beat in a track');
    updateFields = {};
    updateFields[beats - 1] = '';
    return Tracks.update(trackId, { $unset: updateFields }, false);
  },
  
  updateTrack: function (trackId, fields) {
    check(trackId, String);

    track = Tracks.findOne(trackId);
    if (!track) 
      throw new Meteor.Error('Could not find the track ID');    

    room = Rooms.findOne(track.roomId)
    if (room.locked && room.owner !== this.userId)
      throw new Meteor.Error("Cannot make changes to a locked room!");

    // only allow updates to beats, volume, instrument, and muted
    var allowedBeats = _.map(_.range(numBeats(track)), function (n) {
      return String(n);
    });
    var allowedFields = _.union(Tracks.allowedFields, allowedBeats);
    
    if (_.difference(_.keys(fields), allowedFields).length === 0) {
      Tracks.update(track._id, { $set: fields }, false);
    }
  },

});

// generate n empty beats
function beatsObj(N) {
  return _.object(_.map(_.range(N), function (n) {
    return [
      n,
      false
    ];
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
    return !isNaN(n);
  });
  //the track may be missing some, so the number of beats is the max beat found
  return Math.max.apply(null, actualBeats) + 1;
};
