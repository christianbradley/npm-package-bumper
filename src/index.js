var bumper = require("./bumper"),
    DefaultBumper = bumper.createClass(),
    defaultBumper = new DefaultBumper();

module.exports = {
  bumper: bumper,
  major: defaultBumper.major.bind(defaultBumper),
  minor: defaultBumper.minor.bind(defaultBumper),
  patch: defaultBumper.patch.bind(defaultBumper)
};
