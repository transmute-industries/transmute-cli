"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var moveDirectory_1 = require("./commands/moveDirectory");
var patchFiles_1 = require("./commands/patchFiles");
exports.default = function (vorpal) {
    vorpal
        .command("patch", "Patch Truffle Migrations")
        .action(function (args, callback) {
        console.log("patching...");
        var sourceDirectory = path.resolve(__dirname, "../../contracts/");
        var destinationDirectory = path.resolve(__dirname, "../../../../../contracts/TransmuteFramework/");
        moveDirectory_1.add(sourceDirectory, destinationDirectory, function (err) {
            if (err) {
                throw err;
            }
            var sourceDirectory = path.resolve(__dirname, "../../test/");
            var destinationDirectory = path.resolve(__dirname, "../../../../../test/TransmuteFramework/");
            moveDirectory_1.add(sourceDirectory, destinationDirectory, function (err) {
                if (err) {
                    throw err;
                }
                var patchTargetPath = path.resolve(__dirname, "../../../../../migrations/2_deploy_contracts.js");
                var transmuteMigrations = path.resolve(__dirname, "../../migrations/2_deploy_contracts.js");
                // console.log(patchTargetPath)
                // console.log(transmuteMigrations)
                patchFiles_1.patchFiles(patchTargetPath, transmuteMigrations).then(function () {
                    callback();
                });
            });
        });
    });
    vorpal
        .command("unpatch", "UnPatch Truffle Migrations")
        .action(function (args, callback) {
        console.log("unpatching...");
        var destinationDirectory = path.resolve(__dirname, "../../../../../test/TransmuteFramework/");
        moveDirectory_1.remove(destinationDirectory, function (err) {
            if (err) {
                throw err;
            }
            // remove tests
        });
        destinationDirectory = path.resolve(__dirname, "../../../../../contracts/TransmuteFramework/");
        moveDirectory_1.remove(destinationDirectory, function (err) {
            if (err) {
                throw err;
            }
            var patchFilePath = path.resolve(__dirname, "../../../../../migrations/2_deploy_contracts.js");
            var backupPath = path.resolve(__dirname, "../../../../../migrations/2_deploy_contracts.js.transmute.bak");
            patchFiles_1.unpatchFiles(patchFilePath, backupPath);
        });
    });
    return vorpal;
};
//# sourceMappingURL=index.js.map