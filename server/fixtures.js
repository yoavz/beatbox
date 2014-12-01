if (Tracks.find().count() === 0) {
  kick = Tracks.insert({
    instrument: "kick"
  });

  for (var i=0; i<16; i++) {
    Beats.insert({
      trackId: kick,
      pos: i,
      active: i % 4 === 0 ? true : false   
    });
  }

  snare = Tracks.insert({
    instrument: "snare"
  });

  for (var i=0; i<16; i++) {
    Beats.insert({
      trackId: snare,
      pos: i,
      active: i % 8 === 0 ? true : false   
    });
  }

  hihat = Tracks.insert({
    instrument: "hihat"
  });

  for (var i=0; i<16; i++) {
    Beats.insert({
      trackId: hihat,
      pos: i,
      active: i ? true : false   
    });
  }

}
