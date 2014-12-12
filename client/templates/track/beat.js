Template.beat.helpers({

  beatClass: function () {

    var currentBeat = Session.get("absoluteTime") % this.numBeats;
    var current = (this.pos === currentBeat) ? "current" : "";
    var active = this.active ? "active" : "";
    return current + " " + active; 

  }, 

});
