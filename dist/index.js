'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @module dotenv-check A module that performs deployment checks, based on info found on your .env files */

require("babel-polyfill");

var Promise = require('bluebird').Promise;
var path = require('path');
var helpers = require('./helpers');
var errors = require('./errors');
var recursiveFileScan = require("recursive-readdir");

/**
 * Reads a .env file and returns its content in utf-8 format
 * 
 * @param {String} fileName The name of the .env file to check
 * 
 * @returns {Promise} Promise object represents the contents of the file
 */
var readDotenv = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileName) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return helpers.readFileAsync(path.resolve(fileName), 'UTF8');

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](0);
                        throw new errors.DotenvCheckFileNotFoundError('File ' + fileName + ' could not be found');

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));

    return function readDotenv(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Splits the file into lines, in every linebreak, and then splits on = character
 * 
 * @param {String} file The .env file as a utf-8 string
 * 
 * @return {Array} An array containing each line formatted
 */
var transformDotenv = function transformDotenv(file) {
    var lines = file.match(/[^\r\n]+/g); //split in new lines
    if (!lines) return [];
    var processedLines = lines.map(function (line) {
        // In case of pure whitespace, ignore
        if (/^(\s)*$/.test(line)) {
            return null;
        }
        var lineParts = helpers.extendedSplit(line, '=', 2);
        return lineParts;
    }).filter(function (line) {
        return line !== null;
    }); // filter out empty lines
    return processedLines;
};

/**
 * Checks if all environment variables passed to the .env file have valid names, and if there are any duplicates
 * 
 * @param {Array} processedLines An array, representing each line of the .env file as an array, that contains the environment variable name in index 0, and the value of the variable in index 1 
 * 
 * @return {Map} A map containing the environment variable names as its keys, and null as the value of these keys
 */
var validateDotenv = function validateDotenv(processedLines) {
    var variables = new _map2.default();
    processedLines.forEach(function (line, idx) {
        var invalidLine = idx + 1;
        // Invalid syntax, correct example: NODE_ENV=production, wrong example: NODE_ENV
        if (line.length !== 2) {
            throw new errors.DotenvCheckInvalidDotenvFileStructureError('Dotenv file is invalid in line ' + invalidLine);
        }
        // Invalid environment variable name
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(line[0])) {
            // Invalid first letter, first letter is more strict and must contain only characters from a-z (upper or lowercase) or an undersoce
            if (!/^[a-zA-Z_]$/.test(line[0].split('')[0])) {
                throw new errors.DotenvCheckInvalidDotenvVariableNameError('Invalid variable name ' + line[0] + ' in line ' + invalidLine + '. First letter allowed characters: latin letters, _');
            }
            // Invalid variable name 
            else {
                    throw new errors.DotenvCheckInvalidDotenvVariableNameError('Invalid variable name ' + line[0] + ' in line ' + invalidLine + '. Allowed characters: latin letters, numbers, _');
                }
        }
        // Duplicate variable error handling
        if (variables.has(line[0])) {
            throw new errors.DotenvCheckDotenvDuplicateVariableError('Variable ' + line[0] + ' used twice in line ' + invalidLine);
        }
        variables.set(line[0], '');
    });
    return variables;
};

/**
 * Checks if the sample and the original .env files contain the exact same variables
 * 
 * @param {Map} sample The variables that were retrieved from the sample .env file
 * @param {Map} original The variables that were retrieved from the .env file
 * 
 * @return {Boolean} Returns true if both files match each other
 */
var compareDotenvs = function compareDotenvs(sample, original) {
    var sampleVariableNames = sample.keys();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(sampleVariableNames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var name = _step.value;

            if (!original.has(name)) throw new errors.DotenvCheckDotenvFilesMismatchError('Variable: ' + name + ' is missing in the original .env file');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var originalVariableNames = original.keys();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)(originalVariableNames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var name = _step2.value;

            if (!sample.has(name)) throw new errors.DotenvCheckDotenvFilesMismatchError('Variable: ' + name + ' is missing in the sample .env file');
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return true;
};

/**
 * Checks if the variables retrieved from the .env file, exist in the current node running instance
 * 
 * @param {Map} variables A Map of the variables that were retrieved from the .env file
 */
var checkEnvsAreExported = function checkEnvsAreExported(variables) {
    var variableNames = variables.keys();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = (0, _getIterator3.default)(variableNames), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var name = _step3.value;

            if (!process.env[name]) {
                throw new errors.DotenvCheckVariableNotExportedError('Environment variable ' + name + ' has not been exported correctly');
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return variables;
};

/**
 * Scans source code files, finds used environment variables, and if there are variables that dont exist in the .env
 * file, throws an error
 * 
 * @param {*} sourceCodeFolder 
 * @param {*} originalVariables 
 */
var checkSourceCode = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(sourceCodeFolder, originalVariables) {
        var ignoreFunc, sourceCodePath, files;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        ignoreFunc = function ignoreFunc(file, stats) {
                            return !stats.isDirectory() && path.extname(file) !== ".js";
                        };
                        /**
                         * Function to ignore all files, except javascript ones
                         * @param {String} file 
                         * @param {Object} stats 
                         */


                        sourceCodePath = path.resolve(sourceCodeFolder);
                        _context3.next = 4;
                        return recursiveFileScan(sourceCodePath, [ignoreFunc]);

                    case 4:
                        files = _context3.sent;
                        return _context3.abrupt('return', Promise.map(files, function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file) {
                                var fileContents, variableMatchesInCode;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                fileContents = null;
                                                // Read each file

                                                _context2.prev = 1;
                                                _context2.next = 4;
                                                return helpers.readFileAsync(file, 'UTF8');

                                            case 4:
                                                fileContents = _context2.sent;
                                                _context2.next = 9;
                                                break;

                                            case 7:
                                                _context2.prev = 7;
                                                _context2.t0 = _context2['catch'](1);

                                            case 9:
                                                if (fileContents) {
                                                    variableMatchesInCode = fileContents.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '').match(/((process\.env\.){1}([a-zA-Z_1-9]*))\b/g);

                                                    if (variableMatchesInCode) {
                                                        variableMatchesInCode.forEach(function (item) {
                                                            var variableName = item.substring(12);
                                                            if (!originalVariables.has(variableName)) throw new Error('Unknown variable ' + variableName + ' found in code');
                                                        });
                                                    }
                                                }

                                            case 10:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this, [[1, 7]]);
                            }));

                            return function (_x4) {
                                return _ref3.apply(this, arguments);
                            };
                        }(), { concurrency: 5 }));

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function checkSourceCode(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * @constructor
 * 
 * @param {Object} [configuration] An object containing configuration about how the module will run
 * @param {String} [configuration.envFile=null] - The path to the .env file, relative to the project path
 * @param {String} [configuration.sampleEnvFile=.env.sample] The path to the .env.sample file, relative to the project path
 * @param {Boolean} [configuration.checkEnvsExported=false] Whether the module should check if the environment variables from the .env file exist in the current node running instance 
 * @param {String} [configuration.sourceCode=null] The path of the source code to check, leave null if you dont want to check
 */
module.exports = function (configuration) {
    var _this = this;

    this.configuration = (0, _assign2.default)({}, {
        envFile: null,
        sampleEnvFile: '.env.sample',
        checkEnvsExported: false,
        sourceCode: null
    }, configuration);

    return {
        /**
         * Executes all validations
         */
        execute: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;

                                if (_this.configuration.sampleEnvFile) {
                                    _context4.next = 3;
                                    break;
                                }

                                throw new errors.DotenvCheckConfigurationError('Sample .env file does not exist in your configuration');

                            case 3:
                                _context4.next = 5;
                                return readDotenv(_this.configuration.sampleEnvFile).then(transformDotenv).then(validateDotenv).then(function (variables) {
                                    return _this.sampleVariables = variables;
                                });

                            case 5:
                                if (!_this.configuration.envFile) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 8;
                                return readDotenv(_this.configuration.envFile).then(transformDotenv).then(validateDotenv).then(function (variables) {
                                    return _this.variables = variables;
                                });

                            case 8:
                                compareDotenvs(_this.sampleVariables, _this.variables);

                            case 9:

                                if (_this.configuration.checkEnvsExported) checkEnvsAreExported(_this.sampleVariables);

                                if (!_this.configuration.sourceCode) {
                                    _context4.next = 13;
                                    break;
                                }

                                _context4.next = 13;
                                return checkSourceCode(_this.configuration.sourceCode, _this.sampleVariables);

                            case 13:
                                return _context4.abrupt('return', true);

                            case 16:
                                _context4.prev = 16;
                                _context4.t0 = _context4['catch'](0);
                                throw _context4.t0;

                            case 19:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this, [[0, 16]]);
            }));

            function execute() {
                return _ref4.apply(this, arguments);
            }

            return execute;
        }()
    };
}.bind({}); // Bind an empty object for babel to work correctly