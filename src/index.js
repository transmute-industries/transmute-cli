const vorpal = require('vorpal')();

vorpal
.command('echo', 'test code gen')
.action((args, callback) => {
    var echo = require('./echo/echo')
    echo(callback)
});

vorpal
    .command('migrate [prefix] [dotenv]', 'converts .env to firebase functions:config:set command and executes it. See https://firebase.google.com/docs/functions/config-env')
    .action((args, callback) => {
        var migrateFirebase = require('./migrators/migrate_firebase')
        migrateFirebase(args.prefix, args.dotenv, callback)
    });

vorpal
    .command('mask [dotenv]', 'masks all values in .env and writes an example.env')
    .action((args, callback) => {
        var maskGenerator = require('./generators/dotenv_mask')
        maskGenerator(args.dotenv, callback);
    });

vorpal
    .command('js-config [prefix] [dotenv]', 'build a js config module from a .env')
    .action((args, callback) => {
        var jsConfigGenerator = require('./generators/javascript_config')
        jsConfigGenerator(args.prefix, args.dotenv, callback);
    });

vorpal
    .delimiter('🔥  $')
    .show()
    .parse(process.argv)