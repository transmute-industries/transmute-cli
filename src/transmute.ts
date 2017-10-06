#!/usr/bin/env node

const vorpal = require("vorpal")();

import TransmuteCLI from "./index";

vorpal.command("echo [message]", "echo a message").action((args, callback) => {
  TransmuteCLI.echo(args.message, callback);
});

vorpal
  .command(
    "gen-env [type] [prefix] [dotenv] [output]",
    "build a js env module from a .env"
  )
  .action((args, callback) => {
    switch (args.type) {
      case "js":
        TransmuteCLI.generateJSEnv(
          args.prefix,
          args.dotenv,
          args.output,
          callback
        );
        break;
      case "ts":
        TransmuteCLI.generateTSEnv(
          args.prefix,
          args.dotenv,
          args.output,
          callback
        );
        break;
      case "mask":
        TransmuteCLI.generateEnvMask(
          args.prefix,
          args.dotenv,
          args.output,
          callback
        );
        break;
    }
  });

vorpal
  .command(
    "mig-env [type] [prefix] [dotenv]",
    "converts .env to firebase functions:config:set command and executes it. See https://firebase.google.com/docs/functions/config-env"
  )
  .action((args, callback) => {
    switch (args.type) {
      case "firebase":
        TransmuteCLI.migrateFirebaseEnv(args.prefix, args.dotenv, callback);
        break;
    }
  });

vorpal
  .command("install globals", "install all global node dependencies")
  .action((args, callback) => {
    TransmuteCLI.installGlobals(callback);
  });

vorpal
  .command("serve ", "run cloud functions server with env locally.")
  .action((args, callback) => {
    TransmuteCLI.serveFunctions(callback);
  });

vorpal.delimiter("🔥  $").show().parse(process.argv);
