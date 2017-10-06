const shell = require("shelljs");
export default callback => {
  const command = `node ./scripts/server.js`;
  if (shell.exec(command).code !== 0) {
    shell.echo("Error: failed to run local functions server.");
    shell.exit(1);
  }
  callback();
};
