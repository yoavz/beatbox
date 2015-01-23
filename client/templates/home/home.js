Template.home.created = function () {
  Session.set('homeColor', COLORS[_.random(COLORS.length - 1)]);
  Session.set('homeMessage', null);
};

Template.home.helpers({

  buttonStyle: function () {
    var color = getHexColor(Session.get('homeColor'), 30);
    return 'background-color: ' + color + ';' + 'border-color: ' + color + ';';
  },

  colorStyle: function () {
    var color = getHexColor(Session.get('homeColor'), 40);
    return 'color: ' + color + ';';
  },

  flashedMessage: function () {
    return Session.get('homeMessage');
  }
});

Template.home.events({
  'click #public-room': function () {
    Meteor.call('createPublicRoom', function (error, roomId) {
      if (error)
        alert(error);
      Router.go('room', { _id: roomId });
    });
  },

  'click #private-room': function () {
    
    if (!Meteor.user()) {
      flash("You must be logged in to create a private room!");
      return;
    }

    Meteor.call('createPrivateRoom', function (error, roomId) {
      if (error)
        alert(error);
      Router.go('room', { _id: roomId });
    });
  }
});

function flash(message) {
  //if a message is already being flashed, ignore this one
  if (Session.get('homeMessage'))
    return;

  Session.set('homeMessage', message)
  Meteor.setTimeout(function () {
    Session.set('homeMessage', null);
  }, 3000);
  
}
