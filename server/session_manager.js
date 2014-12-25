// based on mizzao's Crowd Mapper implementation
// relies on mizzao's meteor-user-status package
// https://github.com/mizzao/CrowdMapper/blob/master/server/chat_server.coffee

// link to meteor-user-status collection
UserConnections = new Meteor.Collection("user_status_sessions", {connection: null});

// the following would be needed if collection is made persistent
// Meteor.startup(function () {
//   UserSessions.remove({});
// });

function enterRoom (sessionId, roomId) {

  // insert or modify the session
  UserSessions.insert({
    _id: sessionId,
    roomId: roomId
  });
  // UserSessions.upsert(sessionId, {
  //   $set: { roomId: roomId }
  // });

  Rooms.update(roomId, {
    $inc: { sessions: 1 }
  });

  console.log("room enter: " + sessionId + " " + roomId);
}

function leaveRoom (sessionId, roomId) {

  // remove the user session unless it has changed rooms
  UserSessions.remove({
    _id: sessionId,
    roomId: roomId,
  })

  
  Rooms.update(roomId, {
    $inc: { sessions: -1 }
  });

  console.log("room left");
}

Meteor.publish('Room', function (roomId) {
  // TODO: figure out what this exactly means
  sessionId = this._session.id;

  // enter the room
  enterRoom(sessionId, roomId);

  // on subscription end, leave the room
  this.onStop(function () {
    leaveRoom(sessionId, roomId);
  });

  console.log(UserSessions.find({roomId: roomId}).count());

  return [
    Rooms.find(roomId),
    Tracks.find({roomId: roomId}),
    UserSessions.find({roomId: roomId})
  ]
})
