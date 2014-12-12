Template.controls.created = function () {

  this.autorun(function () {
    var self = this.templateInstance();
    var time = Session.get("absoluteTime");
    
    if (isPlaying() && time % 4 === 0) {
      $(".tempo").addClass("click");
      Meteor.setTimeout(function () {
        $(".tempo").removeClass("click");
      }, 100);
    }
  });
}

Template.controls.helpers({
  "isPlaying" : function () {
    return isPlaying();
  },

  "tempo": function () {
    return TEMPO;
  }
});

Template.controls.events({
  "click .reset-beats": function () {
    Meteor.call("resetAll");
  },

  "click .stop-start": function () {
    if (isPlaying()) {
      stop();
    } else {
      play();
    }
  }, 

  "click .tempo-increase": function () {
  },

  "click .tempo-decrease": function () {
  }
});

function pulse() {
  $(".tempo").addClass("click");
  setTimeout(function () {
    $(".tempo").removeClass("click");
  }, 10);
}
