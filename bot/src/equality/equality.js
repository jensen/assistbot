const values = [
  true,
  false,
  1,
  0,
  -1,
  "`'true'`",
  "`'false'`",
  "`'1'`",
  "`'0'`",
  "`'-1'`",
  "",
  "`null`",
  "`undefined`",
  Infinity,
  -Infinity,
  "`[]`",
  "`{}`",
  [[]],
  [0],
  [1],
  "`parseFloat('nan')`",
];

function random() {
  return [
    values[Math.floor(Math.random() * values.length)],
    values[Math.floor(Math.random() * values.length)],
  ];
}

function compare(a, b) {
  if (typeof a === "string") {
    if (typeof b === "string") {
      return eval(a) == eval(b);
    }

    return eval(a) == b;
  }

  return a == b;
}

module.exports = {
  compare,
};
