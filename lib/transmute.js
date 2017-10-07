#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var vorpal = require("vorpal")();
var index_1 = require("./index");
var transmute_framework_1 = require("transmute-framework");
exports.signMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
vorpal.command("echo [message]", "echo a message").action(function (args, callback) {
    index_1.default.echo(args.message, callback);
});
vorpal.command("sign [message]", "sign a message").action(function (args, callback) {
    return new Promise(function (resolve, reject) {
        if (!transmute_framework_1.default.config) {
            transmute_framework_1.default.init();
        }
        // const message = args.message;
        // const address = accounts[0];
        // const { messageBufferHex, signature } = await T.Toolbox.sign(
        //   address,
        //   message
        // );
        // console.log({ messageBufferHex, signature });
        // resolve(true);
        transmute_framework_1.default.getAccounts().then(function (accounts) {
            console.log("accounts: ", accounts);
            resolve(true);
        });
    });
});
vorpal
    .command("gen-env [type] [prefix] [dotenv] [output]", "build a js env module from a .env")
    .action(function (args, callback) {
    switch (args.type) {
        case "js":
            index_1.default.generateJSEnv(args.prefix, args.dotenv, args.output, callback);
            break;
        case "ts":
            index_1.default.generateTSEnv(args.prefix, args.dotenv, args.output, callback);
            break;
        case "mask":
            index_1.default.generateEnvMask(args.prefix, args.dotenv, args.output, callback);
            break;
    }
});
vorpal
    .command("mig-env [type] [prefix] [dotenv]", "converts .env to firebase functions:config:set command and executes it. See https://firebase.google.com/docs/functions/config-env")
    .action(function (args, callback) {
    switch (args.type) {
        case "firebase":
            index_1.default.migrateFirebaseEnv(args.prefix, args.dotenv, callback);
            break;
    }
});
vorpal
    .command("install globals", "install all global node dependencies")
    .action(function (args, callback) {
    index_1.default.installGlobals(callback);
});
vorpal
    .command("serve ", "run cloud functions server with env locally.")
    .action(function (args, callback) {
    index_1.default.serveFunctions(callback);
});
vorpal.delimiter("🔥  $").show().parse(process.argv);
//# sourceMappingURL=transmute.js.map