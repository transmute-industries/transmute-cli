const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);
const writeFile = Promise.promisify(require("fs").writeFile);

// yarn transmute gen-web js ../secrets/firebase-client-config.json ./environment.web.js

module.exports = async (args, callback) => {
  let { firebaseConfigPath, outputEnvPath } = args;
  let config = require(firebaseConfigPath)
  let file = await readFile(
    path.join(__dirname, "./templates/js-web-env.handlebars")
  );
  var output = Mustache.render(file.toString(), {
    firebaseConfig: JSON.stringify(config)
  });
  let outputFile = await writeFile(outputEnvPath, output);
  callback();
};
