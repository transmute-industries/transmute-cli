"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.default = function (prefix, dotEnvPath, outputConfigPath, callback) {
    fs.readFile(dotEnvPath, 'utf8', function (err, envFile) {
        if (err) {
            throw err;
        }
        var lines = envFile.split('\n');
        var keys = [];
        var exportedConstants = [];
        var firebaseEnvVars = [];
        lines.forEach(function (line) {
            var _a = line.split('='), key = _a[0], value = _a[1];
            keys.push(key);
            exportedConstants.push("const " + key + " = (IS_LOCAL) ? process.env." + key + " : config." + prefix + "." + key.toLowerCase() + ";");
        });
        var result = "\n\nconst functions = require('firebase-functions');\n\nconst SECRET_ENV_PATH = '" + dotEnvPath + "';\nlet IS_LOCAL = true;\nlet config;\ntry {\n    config = functions.config();\n    IS_LOCAL = false;\n} catch (e) {\n    require('dotenv').config({ path: SECRET_ENV_PATH });\n}\n\n" + exportedConstants.join('\n') + "\n\nexport default {\n    " + keys.join(',\n\t') + "\n}\n        \n        ";
        fs.writeFile(outputConfigPath, result, function (err) {
            if (err)
                return console.log(err);
            callback();
        });
    });
};
//# sourceMappingURL=ts.js.map