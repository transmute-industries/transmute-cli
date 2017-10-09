const path = require("path");
const os = require("os");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const shell = require("shelljs");

module.exports = vorpal => {
  vorpal.command("init [path]", "build.....").action(async (args, callback) => {
    // Copy Create React dApp
    const sourceDappPath = path.join(os.homedir(), ".transmute", "dapp");

    const targetPath = args.path
      ? path.join(process.cwd(), args.path, "./dapp")
      : path.join(process.cwd(), "./dapp");
    let cmd = `cp -r ${sourceDappPath} ${targetPath}`;
    vorpal.logger.warn(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Copy CLI Cloud Functions
    const cliFunctionsDir = path.join(__dirname, "../../functions");
    cmd = `cp -r ${cliFunctionsDir} ${targetPath}`;
    vorpal.logger.warn(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Copy Node Env File from .transmute
    let envFilePath = path.join(
      os.homedir(),
      ".transmute",
      "environment.node.js"
    );
    cmd = `cp ${envFilePath} ${targetPath}/functions/environment.node.js`;
    vorpal.logger.warn(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Copy Web Env File from .transmute
    envFilePath = path.join(os.homedir(), ".transmute", "environment.web.js");
    cmd = `cp ${envFilePath} ${targetPath}/src/environment.web.js`;
    vorpal.logger.warn(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    callback();
  });
  return vorpal;
};
