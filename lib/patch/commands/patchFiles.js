"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require('bluebird');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var frameworkName = 'Transmute Framework';
var patchBegin = "\uD83E\uDD84 " + frameworkName;
var patchEnd = "\uD83D\uDC29 " + frameworkName;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
var backupPatchTarget = function (targetPath) {
    var contents;
    return fs.readFileAsync(targetPath, "utf8")
        .then(function (_contents) {
        contents = _contents;
        return fs.writeFileAsync(targetPath + '.transmute.bak', contents, {});
    })
        .then(function () {
        return contents;
    });
};
var buildPatch = function (fileString) {
    // Fix path to match result of copyTransmuteContracts
    // fileString = fileString.replace(/\.\//g, "./TransmuteFramework/");
    // convert deployer
    fileString = fileString.replace(/module\.exports/g, "const transmuteDeployer");
    fileString = "// BEGIN " + patchBegin + " \n" + fileString;
    fileString = fileString + ("// END " + patchEnd + " \n");
    return fileString;
};
var patchFileAsync = function (targetPath, patchFileString) {
    return fs.readFileAsync(targetPath, "utf8")
        .then(function (contents) {
        return patchFileString + '\n' + contents;
    })
        .then(function (contents) {
        var target = 'module.exports = function(deployer) {';
        var patchCall = '\ttransmuteDeployer(deployer)\n';
        var comment = '\t// Patched by Transmute Framework\n';
        var patch = target + '\n' + comment + patchCall;
        return contents = contents.replace(target, patch);
    })
        .then(function (result) {
        return fs.writeFileAsync(targetPath, result, {});
    });
};
exports.patchFiles = function (patchTargetPath, transmuteMigrations) {
    return backupPatchTarget(patchTargetPath)
        .then(function (contents) {
        // console.log('got here...')
        if (contents.indexOf(patchBegin) !== -1) {
            throw Error('Already patched, aborting... consider unpatch');
        }
        else {
            return fs.readFileAsync(transmuteMigrations, "utf8")
                .then(function (contents) {
                return buildPatch(contents);
            });
        }
    })
        .then(function (patch) {
        return patchFileAsync(patchTargetPath, patch);
        // console.log("PATCH", result);
    });
};
var deleteFile = function (file) {
    return fs.unlink(file, function (err) {
    });
};
exports.unpatchFiles = function (patchedFilePath, backupFilePath) {
    var contents;
    return fs.readFileAsync(backupFilePath, "utf8")
        .then(function (_contents) {
        contents = _contents;
        return fs.writeFileAsync(patchedFilePath, contents, {});
    })
        .then(function () {
        return deleteFile(backupFilePath);
    });
};
//# sourceMappingURL=patchFiles.js.map