Template.beat.helpers({

  beatClass: function () {
    var currentBeat = Session.get("absoluteTime") % 16;
    var current = (this.pos === currentBeat) ? "current" : "";
    var active = this.active ? "active" : "";
    return current + " " + active; 
  }, 

});
