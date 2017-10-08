const fs = require("fs");

module.exports = (prefix, dotEnvPath, outputConfigPath, callback) => {
  fs.readFile(dotEnvPath, "utf8", (err, envFile) => {
    if (err) {
      throw err;
    }
    let lines = envFile.split("\n");

    let keys = ["firebaseAdmin", "firebaseApp"];
    let exportedConstants = [];
    let firebaseEnvVars = [];

    lines.forEach(line => {
      if (line) {
        let [key, value] = line.split("=");
        keys.push(key);

        exportedConstants.push(
          `const ${key} = (IS_LOCAL) ? process.env.${key} : config.${prefix}.${key.toLowerCase()};`
        );
      }
    });
    // console.log(exportedConstants);
    let result = `

const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const firebaseApp = require("firebase");
// Required for side-effects
require("firebase/firestore");

const SECRET_ENV_PATH = '${dotEnvPath}';
let IS_LOCAL = true;
let config = null;
try {
    config = functions.config();
    IS_LOCAL = false;
} catch (e) {
    require('dotenv').config({ path: SECRET_ENV_PATH });
}

${exportedConstants.join("\n")}

if (IS_LOCAL){
  const serviceAccount = require(GOOGLE_PROJECT_SERVICE_ACCOUNT_ABS_PATH);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
}

if (!IS_LOCAL){
  firebaseAdmin.initializeApp(functions.config().firebase);
}

const firebaseConfig = require(GOOGLE_PROJECT_FIREBASE_CONFIG_ABS_PATH);

firebaseApp.initializeApp(firebaseConfig);

module.exports = {
    ${keys.join(",\n\t")}
}
        
        `;
    fs.writeFile(outputConfigPath, result, err => {
      if (err) return console.log(err);
      callback();
    });
  });
};
