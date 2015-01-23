Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  'createPublicRoom': function () {
    room = newRoom();
    room["private"] = false;

    return Rooms.insert(room);
  },

  'createPrivateRoom': function () {
    
    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to create a private room!");
    }


    room = newRoom();
    room["private"] = true;
    room.owner = this.userId;
    room.locked = true;

    return Rooms.insert(room);
  },

  lockRoom: function (roomId) {
    check(roomId, String);
    room = Rooms.findOne(roomId);

    if (!room) 
      throw new Meteor.Error("Could not find the room");

    if (!this.userId || this.userId !== room.owner)
      throw new Meteor.Error("Only the room owner may lock the room");

    return Rooms.update(room._id, { $set: { locked: !room.locked } });
  }
});

function newRoom () {
  return {
    "private": true
  }
}
