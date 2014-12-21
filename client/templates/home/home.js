Template.home.created = function () {
  Session.set('homeColor', RAINBOW[_.random(RAINBOW.length - 1)]);
};
Template.home.helpers({
  buttonStyle: function () {
    color = Session.get('homeColor');
    return 'background-color: ' + color + ';' + 'border-color: ' + color + ';';
  },
  colorStyle: function () {
    color = Session.get('homeColor');
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