"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
var ncp = require('ncp').ncp;
ncp.limit = 16;
exports.add = function (src, dst, _callback) {
    ncp(src + '/', dst + '/', _callback);
};
exports.remove = function (dst, _callback) {
    rimraf(dst, _callback);
};
//# sourceMappingURL=moveDirectory.js.map