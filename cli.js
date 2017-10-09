#!/usr/bin/env node

const vorpal = require("vorpal")();
const shell = require("shelljs");
const path = require("path");
const webEnvPath = path.join(process.cwd(), "./environment.web");

let T;
try {
  T = require(webEnvPath).TransmuteFramework;
} catch (e) {
  console.log(
    "Could not require require transmute framework from a local environment.web"
  );
}

vorpal.T = T;

console.log("👑  Transmute ");

require("./scripts/install")(vorpal);
require("./scripts/env")(vorpal);
require("./scripts/serve")(vorpal);
require("./scripts/patch")(vorpal);
require("./scripts/truffle")(vorpal);
require("./scripts/ipfs")(vorpal);
require("./scripts/event-store")(vorpal);

vorpal
  .command("version", "display version information")
  .action((args, callback) => {
    console.log("Transmute CLI: " + require("./package.json").version);
    console.log("Transmute Framework: " + T.version);
  });

vorpal.command("echo [message]", "echo a message").action((args, callback) => {
  const TransmuteCLI = require("./lib").default;
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
    await T.Firebase.login();
    callback();
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

vorpal.delimiter("🦄   $").show().parse(process.argv);
