#!/usr/bin/env node

const vorpal = require('vorpal')();

import TransmuteCLI from './index'

vorpal
    .command('echo [message]', 'echo a message')
    .action((args, callback) => {
        console.log(args)
        TransmuteCLI.echo(args.message, callback)
    });

// vorpal
//     .command('serve ', 'run cloud functions server with env locally.')
//     .action((args, callback) => {
//         const serve = require('./serve/serve')
//         serve(callback)
//     });

// vorpal
//     .command('migrate [prefix] [dotenv]', 'converts .env to firebase functions:config:set command and executes it. See https://firebase.google.com/docs/functions/config-env')
//     .action((args, callback) => {
//         const migrateFirebase = require('./migrators/migrate_firebase')
//         migrateFirebase(args.prefix, args.dotenv, callback)
//     });

// vorpal
//     .command('mask [dotenv]', 'masks all values in .env and writes an example.env')
//     .action((args, callback) => {
//         const maskGenerator = require('./generators/dotenv_mask')
//         maskGenerator(args.dotenv, callback);
//     });

// vorpal
//     .command('js-config [prefix] [dotenv] [output]', 'build a js config module from a .env')
//     .action((args, callback) => {
//         const jsConfigGenerator = require('./generators/javascript_config')
//         jsConfigGenerator(args.prefix, args.dotenv, args.output, callback);
//     });

vorpal
    .delimiter('🔥  $')
    .show()
    .parse(process.argv)