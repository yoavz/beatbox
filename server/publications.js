Meteor.publish('Rooms', function () {
  return Rooms.find({ hidden: false });
});

Meteor.publish('Room', function (roomId) {
  return Rooms.find(roomId);
});

Meteor.publish('Tracks', function (roomId) {
  return Tracks.find({ roomId: roomId });
});
