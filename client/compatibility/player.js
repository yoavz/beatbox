ABS_TIME = "absoluteTime";
TEMPO = 100;
SOUND_MAP = {}
SOUND_QUEUE = []

// handle all the initialization of music 
initPlayer = function () {
  
  // soundManager2 setup
  soundManager.setup({
    debugMode: false,
    consoleOnly: false,
  });

  // load all instruments into soundmap 
  SOUND_MAP = {} 
  instruments = allInstruments();
  for (i=0; i<instruments.length; i++) {
    instr = instruments[i];
    SOUND_MAP[instr] = soundManager.createSound({
      id: instr,
      url: instrumentToFile(instr),
      autoLoad: true,
      multiShot: true,
    });
  }

}

// timing functionality

play = function() {

  INTERVAL = Meteor.setInterval(function () {
      current = Session.get(ABS_TIME);
      emptyQueue(function () {
        Session.set(ABS_TIME, current !== undefined ? current+1 : 0);
      });
  }, TEMPO);

  Session.set("interval", INTERVAL);

}

function emptyQueue(callback) {
  for (i=0; i<SOUND_QUEUE.length; i++) {
    soundManager.play(SOUND_QUEUE[i][0], SOUND_QUEUE[i][1]);
  }  
  SOUND_QUEUE = [];
  callback();
}

isPlaying = function() {
  return Session.get("interval");
}

stop = function() {
  Meteor.clearInterval(Session.get("interval"));
  Session.set("interval", null);
}

// sound player 

// instantly play the instrument
playSound = function(instrument, options) {
  if (_.has(SOUND_MAP, instrument))
    SOUND_MAP[instrument].play(options);
  else
    console.log("Error: No instrument found named " + instrument);
}

// queue the sound to be played on the next beat
queueSound = function(instrument, options) {
  if (_.has(SOUND_MAP, instrument))
    SOUND_QUEUE.push([instrument, options]);
  else
    console.log("Error: No instrument found named " + instrument);
}

