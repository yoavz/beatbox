// based on mizzao's Crowd Mapper implementation
// relies on mizzao's meteor-user-status package
// https://github.com/mizzao/CrowdMapper/blob/master/server/chat_server.coffee

function log(s) {
  console.log("(Session Manager): " + s);
}

function enterRoom (sessionId, roomId) {

  // add room id to the session
  UserStatus.connections.upsert(sessionId, {
    $set: { roomId: roomId }
  });

  // if logged in, also add room id to the user object
  var session = UserStatus.connections.findOne(sessionId);
  if (session.userId) {
    Meteor.users.upsert(session.userId, {
      $set: { roomId: roomId }
    });
  }

  log("room enter: " + sessionId + " " + roomId);
}

function leaveRoom (sessionId, roomId) {

  UserStatus.connections.upsert(sessionId, {
    $unset: { roomId: "" }
  });

  var session = UserStatus.connections.findOne(sessionId);
  if (session.userId) {
    Meteor.users.upsert(session.userId, {
      $unset: { roomId: "" }
    });
  }

  log("room left: " + sessionId + " " + roomId);
}

UserStatus.events.on("connectionLogin", function(fields) {

  var session = UserStatus.connections.findOne(fields.connectionId);
  Meteor.users.upsert(session._id, {
    $set: { roomId: session.roomId }
  });

  log("logged in " + fields.userId);
});

UserStatus.events.on("connectionLogout", function(fields) {

  Meteor.users.upsert(userId, {
    $unset: { roomId: "" }
  });

  log("logged out " + fields.userId);
});

Meteor.publish('Room', function (roomId) {
  // this is the same session id that is used in UserConnections
  var sessionId = this.connection.id;

  // enter the room
  enterRoom(sessionId, roomId);

  // on subscription end, leave the room
  this.onStop(function () {
    leaveRoom(sessionId, roomId);
  });

  return [
    // room and track information
    Rooms.find(roomId),
    Tracks.find({roomId: roomId}),

    // user information
    UserStatus.connections.find({roomId: roomId}),
    Meteor.users.find({roomId: roomId}, {fields: {
      'profile.name': 1,

      'services.twitter.id': 1,
      'services.twitter.screenName': 1,
      'services.twitter.profile_image_url_https': 1,

    }})
  ]
})
