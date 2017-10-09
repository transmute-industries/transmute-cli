const path = require("path");

module.exports = vorpal => {
  const logger = vorpal.logger;
  vorpal.command("setup", "build.....").action((args, callback) => {
    logger.info("🤖  Interaction Setup Process Activating...");

    callback();
  });

  return vorpal;
};
