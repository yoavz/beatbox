Template.home.helpers({

});

Template.home.events({
  "click .create-room": function () {
    Meteor.call("createPublicRoom", function (error, roomId) {
      if (error)
        alert(error);

      Router.go("room", {_id: roomId});
    });
  }
});
