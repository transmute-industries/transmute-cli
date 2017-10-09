
const shell = require("shelljs");

module.exports = vorpal => {
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

  return vorpal;
};
