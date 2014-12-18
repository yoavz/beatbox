Template.home.helpers({

  "buttonStyle": function () {
    color = RAINBOW[_.random(RAINBOW.length-1)];
    return "background-color: " + color + ";" +
           "border-color: " + color + ";";
  }

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
