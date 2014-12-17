Rooms = new Meteor.Collection("rooms");

Meteor.methods({

  "createPublicRoom": function () {
    return Rooms.insert({
      hidden: false 
    });
  },

  "createPrivateRoom": function () {
    return Rooms.insert({
      hidden: true 
    });
  }

});
