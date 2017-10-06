#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vorpal = require("vorpal")();
var index_1 = require("./index");
vorpal.command("echo [message]", "echo a message").action(function (args, callback) {
    index_1.default.echo(args.message, callback);
});
vorpal
    .command("gen-env [type] [prefix] [dotenv] [output]", "build a js env module from a .env")
    .action(function (args, callback) {
    switch (args.type) {
        case "js":
            index_1.default.generateJSEnv(args.prefix, args.dotenv, args.output, callback);
            break;
        case "ts":
            index_1.default.generateTSEnv(args.prefix, args.dotenv, args.output, callback);
            break;
        case "mask":
            index_1.default.generateEnvMask(args.prefix, args.dotenv, args.output, callback);
            break;
    }
});
vorpal
    .command("mig-env [type] [prefix] [dotenv]", "converts .env to firebase functions:config:set command and executes it. See https://firebase.google.com/docs/functions/config-env")
    .action(function (args, callback) {
    switch (args.type) {
        case "firebase":
            index_1.default.migrateFirebaseEnv(args.prefix, args.dotenv, callback);
            break;
    }
});
vorpal
    .command("install globals", "install all global node dependencies")
    .action(function (args, callback) {
    index_1.default.installGlobals(callback);
});
vorpal
    .command("serve ", "run cloud functions server with env locally.")
    .action(function (args, callback) {
    index_1.default.serveFunctions(callback);
});
vorpal.delimiter("🔥  $").show().parse(process.argv);
//# sourceMappingURL=transmute.js.map