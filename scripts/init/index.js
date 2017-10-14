const path = require("path");
const os = require("os");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const shell = require("shelljs");

const USE_YARN = '/Users/orie/Code/transmute-cli' === process.cwd();

const COMMAND_BASE = USE_YARN ? 'yarn transmute' : 'transmute'

module.exports = vorpal => {
  vorpal.command("init [path]", "build.....").action(async (args, callback) => {
    // Copy Create React dApp
    const sourceDappPath = path.join(os.homedir(), ".transmute", "dapp");

    const targetPath = args.path
      ? path.join(process.cwd(), args.path, "./dapp")
      : path.join(process.cwd(), "./dapp");
    let cmd = `cp -r ${sourceDappPath} ${targetPath}`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Copy CLI Cloud Functions
    const cliFunctionsDir = path.join(__dirname, "../../functions");
    cmd = `cp -r ${cliFunctionsDir} ${targetPath} && rm -rf ${targetPath}/functions/.transmute`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Create .transmute folder in dapp
    cmd = `mkdir ${targetPath}/functions/.transmute`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Copy all json files into .transmute
    cmd = `cp -R ~/.transmute/ ${targetPath}/functions/`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // No Longer needed. 
    // //Update secret.env paths...
    // cmd = `${COMMAND_BASE} patch-secret-env ${targetPath}/functions/.transmute/environment.secret.env --reset ${targetPath}/functions/.transmute/`;
    // vorpal.logger.log(cmd);
    // if (shell.exec(cmd).code !== 0) {
    //   vorpal.logger.fatal("Error: failed command: " + cmd);
    //   shell.exit(1);
    // }

    // Generate Node ENV from ./functions/.transmute/environment.secret.env
    cmd = `${COMMAND_BASE} gen-node js dapp ${targetPath}/functions/.transmute/environment.secret.env ${targetPath}/functions/.transmute/environment.node.js`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Generate Web ENV from ./functions/.transmute/firebase-client-config.json
    cmd = `${COMMAND_BASE} gen-web js ${targetPath}/functions/.transmute/firebase-client-config.json ${targetPath}/src/environment.web.js`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // Cleanup .transmute
    cmd = `rm -rf ${targetPath}/functions/.transmute/*.ts ${targetPath}/functions/.transmute/dapp`;
    vorpal.logger.log(cmd);
    if (shell.exec(cmd).code !== 0) {
      vorpal.logger.fatal("Error: failed command: " + cmd);
      shell.exit(1);
    }

    // // Copy Node Env File from .transmute
    // let envFilePath = path.join(
    //   os.homedir(),
    //   ".transmute",
    //   "environment.node.js"
    // );
    // cmd = `cp ${envFilePath} ${targetPath}/functions/environment.node.js`;
    // vorpal.logger.log(cmd);
    // if (shell.exec(cmd).code !== 0) {
    //   vorpal.logger.fatal("Error: failed command: " + cmd);
    //   shell.exit(1);
    // }

    // // Copy Web Env File from .transmute
    // envFilePath = path.join(os.homedir(), ".transmute", "environment.web.js");
    // cmd = `cp ${envFilePath} ${targetPath}/src/environment.web.js`;
    // vorpal.logger.log(cmd);
    // if (shell.exec(cmd).code !== 0) {
    //   vorpal.logger.fatal("Error: failed command: " + cmd);
    //   shell.exit(1);
    // }

    callback();
  });
  return vorpal;
};
