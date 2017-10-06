"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.default = function (prefix, dotEnvPath, outputConfigPath, callback) {
    fs.readFile(dotEnvPath, 'utf8', function (err, envFile) {
        if (err) {
            throw err;
        }
        var lines = envFile.split('\n');
        var result = '';
        lines.forEach(function (line) {
            var _a = line.split('='), key = _a[0], value = _a[1];
            result += key + "='EXAMPLE' \n";
        });
        fs.writeFile(outputConfigPath, result, function (err) {
            if (err)
                return console.log(err);
            callback();
        });
    });
};
//# sourceMappingURL=mask.js.map