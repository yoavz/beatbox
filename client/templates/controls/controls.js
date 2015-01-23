Template.controls.created = function () {
  this.autorun(function () {
    var self = this.templateInstance();
    var time = Session.get('absoluteTime');
    if (Metronome.isActive() && time % 4 === 0) {
      $('.tempo').addClass('click');
      Meteor.setTimeout(function () {
        $('.tempo').removeClass('click');
      }, 100);
    }
  });

  Session.set('controlsMessage', null);
};

Template.controls.helpers({
  
  isPlaying: function () {
    return Metronome.isActive();
  },

  tempo: function () {
    return Metronome.currentTempo();
  },

  roomUrl: function () {
    return document.URL;
  },

  increaseDisabled: function () {
    return Metronome.currentTempo() >= 250 ? 'disabled' : '';
  },

  decreaseDisabled: function () {
    return Metronome.currentTempo() < 50 ? 'disabled' : '';
  },

  colorStyle: function () {
    color = getHexColor(Session.get('homeColor'), 20);
    if (color)
      return 'background-color: ' + color + ';';
    else 
      return 'background-color: lightgrey;';
  },

  controlsMessage: function () {
    return Session.get('controlsMessage');
  }

});

Template.controls.events({

  'click .stop-start': function () {
    if (Metronome.isActive()) {
      Metronome.stop();
    } else {
      Metronome.play();
    }
  },
  
  'click .tempo-increase': function () {
    Metronome.changeTempo(Metronome.currentTempo() + 10);
  },

  'click .tempo-decrease': function () {
    Metronome.changeTempo(Metronome.currentTempo() - 10);
  },

  'click .lock-room': function () {
    var user = Meteor.user(); 
    var room = Template.parentData(1);

    if (!user || user._id !== room.owner) {
      flash("You can only lock/unlock this room as the owner!");
      return;
    }

    Meteor.call("lockRoom", room._id, function (error) {
      if (error)
        alert(error);
    
      if (room.locked) // room WAS locked, now is unlocked
        flash("Room unlocked! Anybody can now make changes.")
      else 
        flash("Room locked! Nobody can make changes except you.")
    });
  }
});

function pulse() {
  $('.tempo').addClass('click');
  setTimeout(function () {
    $('.tempo').removeClass('click');
  }, 10);
}

function flash(message) {
  var timeout = Session.get('controlsMessageTimeout');
  if (timeout)
    Meteor.clearTimeout(timeout);

  Session.set('controlsMessage', message)
  
  timeout = Meteor.setTimeout(function () {
    Session.set('controlsMessage', null);
  }, 5000);
  Session.set('controlsMessageTimeout', timeout)
} 
