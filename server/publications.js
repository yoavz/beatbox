Meteor.publish('Rooms', function () {
  return Rooms.find({hidden: false});
});

Meteor.publish('Tracks', function (roomId) {
  return Tracks.find({roomId: roomId});
});
