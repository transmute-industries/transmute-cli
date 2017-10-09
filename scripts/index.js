module.exports = vorpal => {
  vorpal.logger.log("👑  Transmute ");
  vorpal
    .command("version", "display version information")
    .action((args, callback) => {
      console.log("Transmute CLI: " + require("../package.json").version);
      console.log("Transmute Framework: " + vorpal.T.version);
      callback();
    });

  vorpal
    .command("echo [message]", "echo a message")
    .action((args, callback) => {
      const TransmuteCLI = require("./lib").default;
      TransmuteCLI.echo(args.message, callback);
    });

  vorpal.command("accounts", "list accounts").action(async (args, callback) => {
    const accounts = await vorpal.T.getAccounts();
    accounts.forEach(account => {
      vorpal.logger.log("📮  " + account);
    });
    callback();
  });

  require("./install")(vorpal);
  require("./setup")(vorpal);
  require("./init")(vorpal);
  require("./env")(vorpal);
  require("./serve")(vorpal);
  require("./patch")(vorpal);
  require("./truffle")(vorpal);
  require("./ipfs")(vorpal);
  require("./event-store")(vorpal);
  require("./ecrecover")(vorpal);
  require("./firebase")(vorpal);

  return vorpal;
};
