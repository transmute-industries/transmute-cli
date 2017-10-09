const path = require("path");
const os = require("os");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const shell = require("shelljs");

module.exports = vorpal => {
  const getOrCreateRCDir = async () => {
    try {
      const rc_path = path.join(os.homedir(), ".transmute");
      let data = await fs.readdirAsync(rc_path);
      vorpal.logger.log(".transmute detected! Aborting setup.");
      vorpal.logger.info("transmute setup --reset");
    } catch (e) {
      let cmd = "mkdir ~/.transmute";
      vorpal.logger.log(cmd);
      if (shell.exec(cmd).code !== 0) {
        vorpal.logger.fatal("Error: failed command: " + cmd);
        shell.exit(1);
      }

      let template_dir = path.join(__dirname, "../../.transmute-template/*");
      cmd = `cp -r ${template_dir} ~/.transmute/`;
      vorpal.logger.log(cmd);
      if (shell.exec(cmd).code !== 0) {
        vorpal.logger.fatal("Error: failed command: " + cmd);
        shell.exit(1);
      }
    }
  };

  const destroyRCDir = async () => {
    try {
      const rc_path = path.join(os.homedir(), ".transmute");
      let cmd = "rm -rf " + rc_path;
      vorpal.logger.warn(cmd);
      if (shell.exec(cmd).code !== 0) {
        vorpal.logger.fatal("Error: failed command: " + cmd);
        shell.exit(1);
      }
      vorpal.logger.info("TransmuteCLI has been reset.");
    } catch (e) {
      vorpal.logger.warn("No .transmute directory... ");
    }
  };

  vorpal
    .command("setup", "build.....")
    .option("-r, --reset", "reset transmute framework.")
    .action(async (args, callback) => {
      if (args.options.reset) {
        await destroyRCDir();
      }

      if (!args.options.reset) {
        await getOrCreateRCDir();

        // console.log(require("../env/generate/js-web"));

        //OVERWRITE WITH REAL SECRETS
        let cmd = `cp /Users/orie/Code/secrets/environment.secret.env ${path.join(
          os.homedir(),
          ".transmute",
          "environment.secret.env"
        )}`;
        if (shell.exec(cmd).code !== 0) {
          vorpal.logger.fatal("Error: failed command: " + cmd);
          shell.exit(1);
        }
      
        let prefix = "dapp";

        let secretEnvPathAbs = path.join(
          os.homedir(),
          ".transmute",
          "environment.secret.env"
        );

        let firebaseJsonConfigAbsPath = path.join(
          os.homedir(),
          ".transmute",
          "firebaseConfig.json"
        );

        let environmentWebAbsPath = path.join(
          os.homedir(),
          ".transmute",
          "environment.web"
        );

        let environmentNodeAbsPath = path.join(
          os.homedir(),
          ".transmute",
          "environment.node"
        );

        let langs = ["ts", "js"];

        await Promise.all(
          langs.map(async lang => {
            await require(`../env/generate/${lang}-web`)(
              {
                firebaseConfigPath: firebaseJsonConfigAbsPath,
                outputEnvPath: environmentWebAbsPath + `.${lang}`
              },
              () => {
                vorpal.logger.log(
                  `transmute gen-web ${lang} ${firebaseJsonConfigAbsPath} ${environmentWebAbsPath}.${lang}`
                );
              }
            );

            return await require(`../env/generate/${lang}-node`)(
              {
                prefix: prefix,
                secretEnvPath: secretEnvPathAbs,
                outputEnvPath: environmentNodeAbsPath + `.${lang}`
              },
              () => {
                vorpal.logger.log(
                  `transmute gen-node ${lang} ${prefix} ${secretEnvPathAbs} ${environmentNodeAbsPath}.${lang}`
                );
              }
            );
          })
        );
      }
      callback();
    });

  return vorpal;
};
