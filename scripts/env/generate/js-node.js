const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);
const writeFile = Promise.promisify(require("fs").writeFile);

// yarn transmute gen-node dapp ../secrets/environment.secret.env ./environment.node.js
module.exports = async (args, callback) => {
  let { prefix, secretEnvPath, outputEnvPath } = args;

  let dotEnvFile = await readFile(secretEnvPath, "utf8")
  let constExports = []
  let constDeclarations = []
  let lines = dotEnvFile.split("\n");

  lines.forEach(line => {
    if (line) {
      let [key, value] = line.split("=");
      constExports.push(key);
      constDeclarations.push(
        `const ${key} = (FRAMEWORK_ENV === "NODE_LOCAL") ? process.env.${key} : config.${prefix}.${key.toLowerCase()};`
      );
    }
  });

  let file = await readFile(
    path.join(__dirname, "./templates/js-node-env.handlebars")
  );
  var output = Mustache.render(file.toString(), {
    secretEnvPath,
    constDeclarations,
    constExports
  });
  let outputFile = await writeFile(outputEnvPath, output);
  callback();
};
