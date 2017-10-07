const vorpal = require("vorpal")();
const TransmuteCLI = require("./lib");
const T = require("transmute-framework").default.init();

vorpal.command("echo [message]", "echo a message").action((args, callback) => {
  TransmuteCLI.echo(args.message, callback);
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
      args.message
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

vorpal.parse(process.argv);
