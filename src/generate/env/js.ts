
const fs = require('fs');

export default (prefix, dotEnvPath, outputConfigPath, callback) => {
    fs.readFile(dotEnvPath, 'utf8', (err, envFile) => {
        if (err){
            throw err
        }
        let lines = envFile.split('\n')
        
        let keys: any = [];
        let exportedConstants: any = [];
        let firebaseEnvVars = [];

        lines.forEach((line) => {
            let [key, value] = line.split('=')
            keys.push(key)
            exportedConstants.push(`const ${key} = (IS_LOCAL) ? process.env.${key} : config.${prefix}.${key.toLowerCase()};`)
        })

        let result = `

const functions = require('firebase-functions');

const SECRET_ENV_PATH = '${dotEnvPath}';
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

        fs.writeFile(outputConfigPath, result, (err) => {
            if (err) return console.log(err);
            callback();
        });
    });
}