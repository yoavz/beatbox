Meteor.publish('Rooms', function () {
  return Rooms.find({ hidden: false });
});
