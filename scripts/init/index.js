const path = require("path");
const os = require("os");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const shell = require("shelljs");

const USE_YARN = "/Users/orie/Code/transmute-cli" === process.cwd();

const COMMAND_BASE = USE_YARN ? "yarn transmute" : "transmute";

module.exports = vorpal => {
  vorpal
    .command("init [path]", "clone a seed project.")
    .option(
      "-b, --basic",
      "Just a front end app, using transmute hosted services."
    )
    .option(
      "-a, --advanced",
      "Dockerized app, api, ipfs and ethereum, fully configurable boilerplate."
    )
    .action(async (args, callback) => {
      // console.log("use args to build basic and advanced dapps...");
      // console.log(args);

      const targetPath = args.path
        ? path.join(process.cwd(), args.path)
        : path.join(process.cwd());

      if (args.options.basic) {
        let repo = "https://github.com/transmute-industries/transmute-dapp.git";

        console.log("git clone into ", targetPath);
        cmd = `
        cd ${targetPath};
        git clone ${repo};
        cd transmute-dapp; 
        rm -rf .git;
        `;
        if (shell.exec(cmd).code !== 0) {
          vorpal.logger.fatal("Error: failed command: " + cmd);
          shell.exit(1);
        }

        vorpal.logger.info(`Star the dapp!`);
        vorpal.logger.info(
          `cd ${path.join(
            targetPath,
            "transmute-dapp"
          )} && yarn install && yarn start`
        );
      }

      if (args.options.advanced) {
        let repo = "https://github.com/transmute-industries/transmute-dapp.git";

        console.log("git clone into ", targetPath);
        cmd = `
                cd ${targetPath};
                git clone -b advanced ${repo};
                cd transmute-dapp; 
                rm -rf .git;
                `;
        if (shell.exec(cmd).code !== 0) {
          vorpal.logger.fatal("Error: failed command: " + cmd);
          shell.exit(1);
        }

        vorpal.logger.info(`Star the dapp!`);
        vorpal.logger.info(`cd ${path.join(targetPath, "transmute-dapp")}`);
        vorpal.logger.info(
          `Add your service account json to functions/.transmute/firebase-service-account.json`
        );
        vorpal.logger.info(
          `See ${path.join(
            targetPath,
            "transmute-dapp",
            "README.md"
          )} for full instructions.`
        );

        vorpal.logger.info(`docker-compose up`);
      }

      callback();
    });

  // vorpal.command("init [path]", "build.....").action(async (args, callback) => {
  //   // Copy Create React dApp
  //   const sourceDappPath = path.join(os.homedir(), ".transmute", "dapp");

  //   const targetPath = args.path
  //     ? path.join(process.cwd(), args.path, "./dapp")
  //     : path.join(process.cwd(), "./dapp");
  //   let cmd = `cp -r ${sourceDappPath} ${targetPath}`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // Copy CLI Cloud Functions
  //   const cliFunctionsDir = path.join(__dirname, "../../functions");
  //   cmd = `cp -r ${cliFunctionsDir} ${targetPath} && rm -rf ${targetPath}/functions/.transmute`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // Create .transmute folder in dapp
  //   cmd = `mkdir ${targetPath}/functions/.transmute`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // Copy all json files into .transmute
  //   cmd = `cp -R ~/.transmute/ ${targetPath}/functions/`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // No Longer needed.
  //   // //Update secret.env paths...
  //   // cmd = `${COMMAND_BASE} patch-secret-env ${targetPath}/functions/.transmute/environment.secret.env --reset ${targetPath}/functions/.transmute/`;
  //   // vorpal.logger.log(cmd);
  //   // if (shell.exec(cmd).code !== 0) {
  //   //   vorpal.logger.fatal("Error: failed command: " + cmd);
  //   //   shell.exit(1);
  //   // }

  //   // Generate Node ENV from ./functions/.transmute/environment.secret.env
  //   cmd = `${COMMAND_BASE} gen-node js dapp ${targetPath}/functions/.transmute/environment.secret.env ${targetPath}/functions/.transmute/environment.node.js`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // Generate Web ENV from ./functions/.transmute/firebase-client-config.json
  //   cmd = `${COMMAND_BASE} gen-web js ${targetPath}/functions/.transmute/firebase-client-config.json ${targetPath}/src/environment.web.js`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // Cleanup .transmute
  //   cmd = `rm -rf ${targetPath}/functions/.transmute/*.ts ${targetPath}/functions/.transmute/dapp`;
  //   vorpal.logger.log(cmd);
  //   if (shell.exec(cmd).code !== 0) {
  //     vorpal.logger.fatal("Error: failed command: " + cmd);
  //     shell.exit(1);
  //   }

  //   // // Copy Node Env File from .transmute
  //   // let envFilePath = path.join(
  //   //   os.homedir(),
  //   //   ".transmute",
  //   //   "environment.node.js"
  //   // );
  //   // cmd = `cp ${envFilePath} ${targetPath}/functions/environment.node.js`;
  //   // vorpal.logger.log(cmd);
  //   // if (shell.exec(cmd).code !== 0) {
  //   //   vorpal.logger.fatal("Error: failed command: " + cmd);
  //   //   shell.exit(1);
  //   // }

  //   // // Copy Web Env File from .transmute
  //   // envFilePath = path.join(os.homedir(), ".transmute", "environment.web.js");
  //   // cmd = `cp ${envFilePath} ${targetPath}/src/environment.web.js`;
  //   // vorpal.logger.log(cmd);
  //   // if (shell.exec(cmd).code !== 0) {
  //   //   vorpal.logger.fatal("Error: failed command: " + cmd);
  //   //   shell.exit(1);
  //   // }

  //   callback();
  // });
  return vorpal;
};
