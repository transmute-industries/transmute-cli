"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var echo_1 = require("./echo/echo");
var TransmuteCLI = (function () {
    function TransmuteCLI() {
        this.echo = echo_1.default;
    }
    return TransmuteCLI;
}());
exports.TransmuteCLI = TransmuteCLI;
var instance = new TransmuteCLI();
exports.default = instance;
//# sourceMappingURL=index.js.map