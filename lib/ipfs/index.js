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
var path = require("path");
var T = require("transmute-framework").default.init();
var web3 = T.web3, EventStoreContract = T.EventStoreContract, EventStoreFactoryContract = T.EventStoreFactoryContract;
var getCachedReadModel = T.EventStore.getCachedReadModel;
var _ = require("lodash");
exports.default = function (vorpal) {
    var transmuteIpfsDeploy = function (bindingModel) { return __awaiter(_this, void 0, void 0, function () {
        var ti;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (bindingModel.env === "infura") {
                        ti = T.TransmuteIpfs.init({
                            host: "ipfs.infura.io",
                            port: "5001",
                            options: {
                                protocol: "https"
                            }
                        });
                    }
                    if (bindingModel.env === "local") {
                        ti = T.TransmuteIpfs.init();
                    }
                    if (!ti) {
                        throw Error('transmuteIpfsDeploy requires env: "local"|"infura"');
                    }
                    return [4 /*yield*/, ti.addFromFs(bindingModel.directory)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    vorpal
        .command("ipfs deploy ", "Deploy a directory to ipfs")
        .option("-t, --target <directory>", "the directory you wish to deploy")
        .option("-e, --env <environment>", 'the env to deploy "local"|"infura"...')
        .types({
        string: ["directory", "environment"]
    })
        .action(function (args, callback) { return __awaiter(_this, void 0, void 0, function () {
        var results, pref;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transmuteIpfsDeploy({
                        env: args.options.env,
                        directory: args.options.target
                    })];
                case 1:
                    results = _a.sent();
                    pref = args.options.env === "local"
                        ? "http://localhost:8080/ipfs/"
                        : "https://ipfs.infura.io/ipfs/";
                    results.forEach(function (res) {
                        console.log("⚓  " + pref + res.hash + "\t" + res.path);
                    });
                    callback();
                    return [2 /*return*/];
            }
        });
    }); });
    return vorpal;
};
//# sourceMappingURL=index.js.map