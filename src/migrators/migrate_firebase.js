
const shell = require('shelljs');
const fs = require('fs');

module.exports = (prefix, dotenv_path, callback) => {
    fs.readFile(dotenv_path, 'utf8', (err, envFile) => {
        let lines = envFile.split('\n')
        let result = 'firebase functions:config:set ';
        lines.forEach((line) => {
            let [key, value] = line.split('=')
            result += `${prefix}.${key.toLowerCase()}='${value}' `
        })
        if (shell.exec(result).code !== 0) {
            shell.echo('Error: failed to set firebase env.');
            shell.exit(1);
        }
        callback();
    });
}