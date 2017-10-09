#!/usr/bin/env node

const vorpal = require("vorpal")();
const shell = require("shelljs");
const TransmuteCLI = require("./lib").default;
const { TransmuteFramework } = require("./environment.web");
const T = TransmuteFramework;
console.log("👑  Transmute ");
require("./lib/patch").default(vorpal);
require("./lib/ipfs").default(vorpal);
require("./lib/event-store").default(vorpal);
require("./scripts/env")(vorpal);
require("./scripts/serve")(vorpal);

vorpal.command("echo [message]", "echo a message").action((args, callback) => {
  TransmuteCLI.echo(args.message, callback);
});

vorpal
  .command("status", "report on the status of the cli.")
  .action((args, callback) => {
    var unsubscribe = T.firebaseApp.auth().onAuthStateChanged(function(user) {
      // handle it
      if (user) {
        console.log("🔵  Logged in as:", user.uid);
        unsubscribe();
        callback();
      } else {
        console.log("🔴  Logged out.");
        unsubscribe();
        callback();
      }
    });
  });

vorpal
  .command("login", "login to firebase with transmute-framework")
  .action(async (args, callback) => {
    await T.Firebase.login()
    callback()
  });

vorpal.command("accounts", "list accounts").action(async (args, callback) => {
  const accounts = await T.getAccounts();
  accounts.forEach(account => {
    console.log("📮  " + account);
  });
  callback();
});

vorpal
  .command("sign", "sign a message with the default address")
  .option("-m, --message <msg>", "the message text")
  .action(async (args, callback) => {
    const accounts = await T.getAccounts();
    const address = accounts[0];
    const { messageBufferHex, signature } = await T.Toolbox.sign(
      address,
      args.options.message
    );
    console.log("💌  " + messageBufferHex);
    console.log("🔏  " + signature);
    callback();
  });

vorpal
  .command(
    "recover",
    "recover the address used to sign a message from a signature"
  )
  .option("-m, --message <msg>", "the message hex")
  .option("-s, --signature <sig>", "the message signature")
  .types({
    string: ["m", "message", "s", "signature"]
  })
  .action(async (args, callback) => {
    const accounts = await T.getAccounts();
    const address = accounts[0];
    const recoveredAddress = await T.Toolbox.recover(
      args.options.message,
      args.options.signature
    );
    console.log("🔏  " + recoveredAddress);
    callback();
  });

vorpal.command("migrate", "run truffle migrate").action((args, callback) => {
  console.log("🍄  Truffle Migrate ...");
  if (shell.exec("truffle migrate").code !== 0) {
    shell.echo("Error: truffle migrate failed.");
    shell.exit(1);
  }
  callback();
});

vorpal.command("test", "run truffle test").action((args, callback) => {
  console.log("🍄  Truffle Test ...");
  if (shell.exec("truffle test").code !== 0) {
    shell.echo("Error: truffle test failed.");
    shell.exit(1);
  }
  callback();
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

vorpal.delimiter("🦄   $").show().parse(process.argv);
