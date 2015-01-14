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
  }

});

Template.controls.events({

  'click .reset-beats': function () {
    Meteor.call('resetAll');
  },

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
  }
});

function pulse() {
  $('.tempo').addClass('click');
  setTimeout(function () {
    $('.tempo').removeClass('click');
  }, 10);
}
