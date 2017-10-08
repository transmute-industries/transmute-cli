const path = require("path");

const generateJSEnv = require("./js");
const generateTSEnv = require("./ts");
const generateEnvMask = require("./mask");

module.exports = vorpal => {
  vorpal
    .command(
      "gen-env [type] [prefix] [dotenv] [output]",
      "build a js env module from a .env"
    )
    .action((args, callback) => {
      switch (args.type) {
        case "js":
          generateJSEnv(args.prefix, args.dotenv, args.output, callback);
          break;
        case "ts":
          generateTSEnv(args.prefix, args.dotenv, args.output, callback);
          break;
        case "mask":
          generateEnvMask(args.prefix, args.dotenv, args.output, callback);
          break;
      }
    });

  return vorpal;
};
