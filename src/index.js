var bumperFactory = require("./bumper-factory"),
    DefaultBumper = bumperFactory(),
    defaultBumper = new DefaultBumper();

module.exports = {
  bumperFactory: bumperFactory,
  DefaultBumper: DefaultBumper,
  defaultBumper: defaultBumper,
  major: defaultBumper.major.bind(defaultBumper),
  minor: defaultBumper.minor.bind(defaultBumper),
  patch: defaultBumper.patch.bind(defaultBumper)
};
