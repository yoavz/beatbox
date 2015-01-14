Template.home.created = function () {
  Session.set('homeColor', COLORS[_.random(COLORS.length - 1)]);
};

Template.home.helpers({
  buttonStyle: function () {
    var color = getHexColor(Session.get('homeColor'), 30);
    return 'background-color: ' + color + ';' + 'border-color: ' + color + ';';
  },
  colorStyle: function () {
    var color = getHexColor(Session.get('homeColor'), 40);
    return 'color: ' + color + ';';
  }
});

Template.home.events({
  'click .create-room': function () {
    Meteor.call('createPublicRoom', function (error, roomId) {
      if (error)
        alert(error);
      Router.go('room', { _id: roomId });
    });
  }
});
