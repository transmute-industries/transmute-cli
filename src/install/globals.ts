const shell = require("shelljs");

export default callback => {
  let lines = ["npm install -g firebase-tools --engine-strict=false"];
  lines.forEach(line => {
    if (shell.exec(line).code !== 0) {
      shell.echo("Error: failed to install global: " + line);
      shell.exit(1);
    }
  });
  callback();
};
