'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

module.exports.extendedSplit = function (str, separator, max) {
    var out = [],
        index = 0,
        next;

    while (!max || out.length < max - 1) {
        next = str.indexOf(separator, index);
        if (next === -1) {
            break;
        }
        out.push(str.substring(index, next));
        index = next + separator.length;
    }
    out.push(str.substring(index));
    return out;
};

module.exports.readFileAsync = function () {
    var _arguments = arguments;

    return new _promise2.default(function (resolve, reject) {
        fs.readFile.apply(fs, Array.prototype.slice.call(_arguments).concat([function (err, file) {
            if (err) return reject(err);
            return resolve(file);
        }]));
    });
};