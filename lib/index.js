"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var echo_1 = require("./echo/echo");
var globals_1 = require("./install/globals");
var js_1 = require("./generate/env/js");
var ts_1 = require("./generate/env/ts");
var mask_1 = require("./generate/env/mask");
var env_1 = require("./migrate/firebase/env");
var functions_1 = require("./serve/functions");
var TransmuteCLI = (function () {
    function TransmuteCLI() {
        this.echo = echo_1.default;
        this.installGlobals = globals_1.default;
        this.generateJSEnv = js_1.default;
        this.generateTSEnv = ts_1.default;
        this.generateEnvMask = mask_1.default;
        this.migrateFirebaseEnv = env_1.default;
        this.serveFunctions = functions_1.default;
    }
    return TransmuteCLI;
}());
exports.TransmuteCLI = TransmuteCLI;
var instance = new TransmuteCLI();
exports.default = instance;
//# sourceMappingURL=index.js.map