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
  return MAPPINGS_808[instr];
}

// A bunch of nice colors from the IBM Design Language

RAINBOW = ["#5AAAFA", "#8CD211", "#41D6C3", "#BA8FF7",
           "#FF71D4", "#FF7D87", "#FF7832", "#EFC100",
           "#AEB8B8", "#B8AEAE"]

// A bunch of nice colors from the IBM Design Language


PALETTES = {
  blue: {
    core: "#4178BE",
    10: "#C0E6FF",
    20: "#7CC7FF",
    30: "#5AAAFA",
    40: "#5596E6",
    50: "#4178BE",
    60: "#325C80",
    70: "#264A60",
    80: "#1D3649",
    90: "#152935",
    100: "#010205"
  },
  green: {
    core: "#4B8400",
    10: "#C8F08F",
    20: "#B4E051",
    30: "#8CD211",
    40: "#5AA700",
    50: "#4B8400",
    60: "#2D660A",
    70: "#144D14",
    80: "#0A3C02",
    90: "#0C2808",
    100: "#010200"
  },
  teal: {
    core: "#008571",
    10: "#A7FAE6",
    20: "#6EEDD8",
    30: "#41D6C3",
    40: "#00B4A0",
    50: "#008571",
    60: "#006D5D",
    70: "#005448",
    80: "#003C32",
    90: "#012B22",
    100: "#000202"
  },
  purple: {
    core: "#9855D4",
    10: "#EED2FF",
    20: "#D7AAFF",
    30: "#BA8FF7",
    40: "#AF6EE8",
    50: "#9855D4",
    60: "#734098",
    70: "#562F72",
    80: "#412356",
    90: "#311A41",
    100: "#030103"
  },
  magenta: {
    core: "#DB2780",
    10: "#FFD2FF",
    20: "#FF9EEE",
    30: "#FF71D4",
    40: "#FF3CA0",
    50: "#DB2780",
    60: "#A6266E",
    70: "#7C1C58",
    80: "#601146",
    90: "#3A0B2E",
    100: "#040102"
  },
  red: {
    core: "#E71D32",
    10: "#FFD2DD",
    20: "#FFA5B4",
    30: "#FF7D87",
    40: "#FF5050",
    50: "#E71D32",
    60: "#AD1625",
    70: "#8C101C",
    80: "#6E0A1E",
    90: "#4C0A17",
    100: "#040001"
  },
  orange: {
    core: "#FF7832",
    10: "#FFD4A0",
    20: "#FFA573",
    30: "#FF7832",
    40: "#FF5003",
    50: "#D74108",
    60: "#A53725",
    70: "#872A0F",
    80: "#6D120F",
    90: "#43100B",
    100: "#030100"
  },
  yellow: {
    core: "#FDD600",
    10: "#FDE876",
    20: "#FDD600",
    30: "#EFC100",
    40: "#BE9B00",
    50: "#8C7300",
    60: "#735F00",
    70: "#574A00",
    80: "#3C3200",
    90: "#281E00",
    100: "#020100"
  },
  gray: {
     core: "#777677",
     10: "#E0E0E0",
     20: "#C7C7C7",
     30: "#AEAEAE",
     40: "#959595",
     50: "#777677",
     60: "#5A5A5A",
     70: "#464646",
     80: "#323232",
     90: "#121212",
    100: "#000000"
  },
  coolgray: {
     core: "#6D7777",
     10: "#DFE9E9",
     20: "#C8D2D2",
     30: "#AEB8B8",
     40: "#959F9F",
     50: "#6D7777",
     60: "#586262",
     70: "#3C4646",
     80: "#323C3C",
     90: "#0D1111",
    100: "#000203"
  },
  warmgray: {
     core: "#7D7373",
     10: "#E9E0E0",
     20: "#D0C7C7",
     30: "#B8AEAE",
     40: "#9E9494",
     50: "#7D7373",
     60: "#645A5A",
     70: "#504646",
     80: "#3C3232",
     90: "#1A1314",
    100: "#030000"
  },
  neutralwhite: {
    core: "#FDFDFD",
    10: "#FDFDFD",
    20: "#F9F9F9",
    30: "#F4F4F4",
    40: "#ECECEC"
  },
  coolwhite: {
    core: "#FBFCFC",
    10: "#FBFCFC",
    20: "#F9F9FB",
    30: "#F0F2F4",
    40: "#ECF2F2"
  },
  warmwhite: {
    core: "#FDFBFB",
    10: "#FDFBFB",
    20: "#FDFBFB",
    30: "#F7F5F5",
    40: "#F2EEEE"
  },
  black: {
    core: "#000000"
  },
  white: {
    core: "#FFFFFF"
  }
}

COLORS = _.difference(_.keys(PALETTES), ["white", "black"])

getInstrumentColor = function (instr) {
    return COLORS[_.indexOf(INSTRUMENTS_808, instr) % COLORS.length]
}
