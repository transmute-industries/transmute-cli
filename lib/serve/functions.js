"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
exports.default = function (callback) {
    var command = "node ./scripts/server.js";
    if (shell.exec(command).code !== 0) {
        shell.echo("Error: failed to run local functions server.");
        shell.exit(1);
    }
    callback();
};
//# sourceMappingURL=functions.js.map