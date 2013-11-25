var bumperFactory = require("bumper-factory"),
    DefaultBumper = bumperFactory(),
    defaultBumper = new DefaultBumper();

module.exports = {
  bumperFactory: bumperFactory,
  DefaultBumper: DefaultBumper,
  defaultBumper: defaultBumper,
  major: defaultBumper.major,
  minor: defaultBumper.minor,
  patch: defaultBumper.patch
};
