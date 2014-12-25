Meteor.publish('Rooms', function () {
  return Rooms.find({ hidden: false });
});

Meteor.publish(null, function () {
  return UserStatus.connections.find();
});
