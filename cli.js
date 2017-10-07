const vorpal = require("vorpal")();
const TransmuteCLI = require("./lib").default;
const T = require("transmute-framework").default.init();
const shell = require("shelljs");
const firebase = require("firebase");

var rp = require("request-promise");

console.log("👑  Transmute ");

firebase.initializeApp({
  apiKey: "AIzaSyAz5HkV4suTR49_1Cj40bQYd9Jgiv634qQ",
  authDomain: "transmute-framework.firebaseapp.com",
  databaseURL: "https://transmute-framework.firebaseio.com",
  projectId: "transmute-framework",
  storageBucket: "transmute-framework.appspot.com",
  messagingSenderId: "191884578641"
});

require("./lib/patch").default(vorpal);
require("./lib/ipfs").default(vorpal);
require("./lib/event-store").default(vorpal);

vorpal.command("echo [message]", "echo a message").action((args, callback) => {
  TransmuteCLI.echo(args.message, callback);
});

vorpal
  .command("status", "report on the status of the cli.")
  .action((args, callback) => {
    var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
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
    const accounts = await T.getAccounts();
    const address = accounts[0];
    console.log("🔏  Logging into Firebase with transmute-framework...");
    const sigObj = await T.Toolbox.sign(address, "transmute.cli.login");
    let challengeFromSignature = await rp({
      uri: "http://localhost:3001/token",
      qs: {
        method: "challenge",
        address: address,
        message_raw: sigObj.messageBufferHex,
        message_hex: sigObj.messageHex,
        message_signature: sigObj.signature
      },
      headers: {
        "User-Agent": "Transmute CLI"
      },
      json: true // Automatically parses the JSON string in the response
    });
    if (
      !challengeFromSignature.body.conditions.didClientAddressSignMessageRaw
    ) {
      throw Error(
        "Server does not trust signature. didClientAddressSignMessageRaw: false"
      );
    }
    const message_raw = challengeFromSignature.body.challenge;
    const signedChallange = await T.Toolbox.sign(address, message_raw);
    let tokenFromSignedChallenge = await rp({
      uri: "http://localhost:3001/token",
      qs: {
        method: "verify",
        address: address,
        message_raw: signedChallange.messageBufferHex,
        message_hex: signedChallange.messageHex,
        message_signature: signedChallange.signature
      },
      headers: {
        "User-Agent": "Transmute CLI"
      },
      json: true // Automatically parses the JSON string in the response
    });

    // console.log(tokenFromSignedChallenge.body);

    await firebase
      .auth()
      .signInWithCustomToken(tokenFromSignedChallenge.body.token)
      .then(data => {
        if (data.uid === address) {
          console.log("🏡  Logged in as:", address);
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
      });

    // const success =
    //   tokenFromSignedChallenge.body.result.hasClientSignedChallenge;
    // console.log("success: ", success);
    // console.log("tokenFromSignedChallenge: ", tokenFromSignedChallenge);

    // TransmuteCLI.echo(args.message, callback);
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

vorpal.delimiter("🦄   $").show().parse(process.argv);
