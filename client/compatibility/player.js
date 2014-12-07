window.AudioContext = window.AudioContext || window.webkitAudioContext;

FastPlayer = new fastPlayer();

function fastPlayer() { 
  try {
    this.context = new AudioContext();
  } catch(e) {
    alert("Web Audio API is not supported in this browser");
  }

  this.buffers = {};
  this.debug = true;

  // NOTE: this is an external reference, should be taken out
  // to generalize this module
  this.loadBeatboxSounds = function () {
    this.loadSounds(_.pairs(_.invert(allMappings())));
  }

  // Input: URL of a file, tag to associate with the sound
  // Loads the file into memory, so it can be played using
  // FastPlayer.playSound(tag) later
  this.loadSound = function (url, tag) {

    var loader = this;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
      loader.context.decodeAudioData(request.response, function(buffer) {
        loader.buffers[tag] = buffer;
      }); 
    }

    request.onerror = function (e) {
      loader.error("XHR Error: " + e);
    }

    request.send();
  }

  // Input: List of [URL, tag] tuples
  // batch version of loadSound
  this.loadSounds = function (list) {
    for (i=0; i<list.length; i++) {
      if (list[i].length !== 2)
        this.error("Invalid input to loadSounds, perhaps you meant to use loadSound?");
      else
        this.loadSound(list[i][0], list[i][1])
    }
  }

  // Input: a list of [tag, (volume)] sounds to play 
  // will play the sounds SIMULTANEOUSLY! is there a better
  // way of doing this
  this.playSounds = function (list) {
    var t = this;
    var sources = [];

    // connect all the sources, but don't play yet
    for (i=0; i<list.length; i++) {
      var instr = list[i][0]

      if (!this.buffers || !this.buffers[instr]) {
        this.error("Sound not found: " + instr);
        return 
      }

      source = this.context.createBufferSource();
      source.buffer = this.buffers[instr];
      if (list[i].length == 2) {
        gainNode = this.context.createGain();
        gainNode.gain.value = 0.5 * list[i][1] / 100 ;
        source.connect(gainNode);
        gainNode.connect(this.context.destination);
      } else {
        source.connect(this.context.destination);
      }
      sources.push(source);
    }

    // now play
    _.map(sources, function (s) { s.start(0); });
  }

  // individual version of playSounds
  this.playSound = function (instr, volume) {
    return this.playSounds([[instr, volume]]);
  }

  this.playInstrument = this.playSound;
  this.playInstruments = this.playSounds;

  //
  // Logging and Utility functions
  //
  this.log = function (l) {
    console.log("FastPlayer " + l);
  }

  this.error = function (w) {
    this.log("(ERROR): " + w);
  }

  this.warning = function (w) {
    this.log("(WARNING): " + w);
  }

  this.warning = function (w) {
    this.log("(INFO): " + w);
  }
}
