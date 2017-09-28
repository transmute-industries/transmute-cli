
const shell = require('shelljs');

module.exports = (callback) => {
    const command = `node ./src/serve/server.js`;
    if (shell.exec(command).code !== 0) {
        shell.echo('Error: failed to run local functions server.');
        shell.exit(1);
    }
    callback();
}