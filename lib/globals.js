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

allInstruments = function () {
  return _.keys(MAPPINGS_808);
}

instrumentToFile = function (instr) {
  return MAPPINGS_808[instr]
}
