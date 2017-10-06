"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require('shelljs');
var fs = require('fs');
exports.default = function (prefix, dotEnvPath, callback) {
    fs.readFile(dotEnvPath, 'utf8', function (err, envFile) {
        if (err) {
            throw err;
        }
        var lines = envFile.split('\n');
        var result = 'firebase functions:config:set ';
        lines.forEach(function (line) {
            var _a = line.split('='), key = _a[0], value = _a[1];
            result += prefix + "." + key.toLowerCase() + "='" + value + "' ";
        });
        if (shell.exec(result).code !== 0) {
            shell.echo('Error: failed to set firebase env.');
            shell.exit(1);
        }
        callback();
    });
};
//# sourceMappingURL=env.js.map