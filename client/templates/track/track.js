MAPPINGS_808 = {
  "snare": "/samples/808/snare.ogg",
  "kick": "/samples/808/kick.ogg",
  "hihat": "/samples/808/chh.ogg",
}

Template.track.created = function () {

  // Load the sounds through soundmanager
  this.sound = soundManager.createSound({
      url: MAPPINGS_808[this.data.instrument]
  });

}

Template.track.rendered = function () {

  // this function gets run time increment
  this.autorun(function () {

    var self = this.templateInstance();
    var beat = Session.get("absoluteTime") % 16;

    if (Beats.find({trackId: self.data._id, pos: beat, active: true}).count() > 0)
      self.sound.play();

  });

}

Template.track.helpers({
  beats: function () {
    return Beats.find({trackId: this._id});
  }, 
});

Template.beat.helpers({

  beatClass: function () {
    var currentBeat = Session.get("absoluteTime") % 16;
    var current = (this.pos === currentBeat) ? "current" : "";
    var active = this.active ? "active" : "";
    return current + " " + active; 
  }, 
  
});

Template.beat.events({
  "click .beat": function (e) {
    updateFields = {
      "active": !this.active
    }
    Beats.update(this._id, {$set: updateFields}, false);
  }
});
