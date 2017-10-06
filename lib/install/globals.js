"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
exports.default = function (callback) {
    var lines = ["npm install -g firebase-tools --engine-strict=false"];
    lines.forEach(function (line) {
        if (shell.exec(line).code !== 0) {
            shell.echo("Error: failed to install global: " + line);
            shell.exit(1);
        }
    });
    callback();
};
//# sourceMappingURL=globals.js.map