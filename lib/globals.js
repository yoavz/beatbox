MAPPINGS_808 = {
  "snare": "/samples/808/snare.ogg",
  "kick": "/samples/808/kick.ogg",
  "hihat": "/samples/808/chh.ogg",
  "clave": "/samples/808/clave.ogg",
  "cowbell": "/samples/808/cow.ogg",
  "rim": "/samples/808/rim.ogg",
  "cymbal": "/samples/808/cymbal.ogg",
  "clap": "/samples/808/clap.ogg",
}

INSTRUMENTS_808 = _.keys(MAPPINGS_808);

allMappings = function () {
  return MAPPINGS_808;
}

allInstruments = function () {
  return _.keys(allMappings());
}

instrumentToFile = function (instr) {
  return MAPPINGS_808[instr]
}

// A bunch of nice colors from the IBM Design Language

RAINBOW = ["#5AAAFA", "#8CD211", "#41D6C3", "#BA8FF7",
           "#FF71D4", "#FF7D87", "#FF7832", "#EFC100",
           "#AEB8B8", "#B8AEAE"]
