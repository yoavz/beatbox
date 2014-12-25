Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  'createPublicRoom': function () {
    room = newRoom();
    room.hidden = false;

    return Rooms.insert(room);
  },

  'createPrivateRoom': function () {
    room = newRoom();
    room.hidden = true;

    return Rooms.insert(newRoom());
  },
});

function newRoom () {
  return {
    sessions: 0,
    hidden: true,
  }
}
