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

  return vorpal;
};
