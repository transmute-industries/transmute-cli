
const fs = require('fs');

module.exports = (prefix, dotenv_path, output_path, callback) => {
    fs.readFile(dotenv_path, 'utf8', (err, envFile) => {
        let lines = envFile.split('\n')
        
        let keys = [];
        let exportedConstants = [];
        let firebaseEnvVars = [];

        lines.forEach((line) => {
            let [key, value] = line.split('=')
            keys.push(key)
            exportedConstants.push(`const ${key} = (IS_LOCAL) ? process.env.${key} : config.${prefix}.${key.toLowerCase()};`)
        })

        let result = `

const functions = require('firebase-functions');

const SECRET_ENV_PATH = '${dotenv_path}';
let IS_LOCAL = true;
let config = null;
try {
    config = functions.config();
    IS_LOCAL = false;
} catch (e) {
    require('dotenv').config({ path: SECRET_ENV_PATH });
}

${exportedConstants.join('\n')}

module.exports = {
    ${keys.join(',\n\t')}
}
        
        `

        fs.writeFile(output_path, result, (err) => {
            if (err) return console.log(err);
            callback();
        });
    });
}