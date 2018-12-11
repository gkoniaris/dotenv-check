'use strict';

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseError = function (_Error) {
    (0, _inherits3.default)(BaseError, _Error);

    function BaseError(message) {
        (0, _classCallCheck3.default)(this, BaseError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseError.__proto__ || (0, _getPrototypeOf2.default)(BaseError)).call(this, message));

        _this.name = 'DotenvCheckBaseError';
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }

    return BaseError;
}(Error);

module.exports.BaseError = BaseError;

var DotenvCheckConfigurationError = function (_BaseError) {
    (0, _inherits3.default)(DotenvCheckConfigurationError, _BaseError);

    function DotenvCheckConfigurationError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckConfigurationError);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckConfigurationError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckConfigurationError)).call(this, parent));

        _this2.name = 'DotenvCheckConfigurationError';
        (0, _setPrototypeOf2.default)(_this2, DotenvCheckConfigurationError.prototype);
        Error.captureStackTrace(_this2, _this2.constructor);
        return _this2;
    }

    return DotenvCheckConfigurationError;
}(BaseError);

module.exports.DotenvCheckConfigurationError = DotenvCheckConfigurationError;

var DotenvCheckFileNotFoundError = function (_BaseError2) {
    (0, _inherits3.default)(DotenvCheckFileNotFoundError, _BaseError2);

    function DotenvCheckFileNotFoundError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckFileNotFoundError);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckFileNotFoundError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckFileNotFoundError)).call(this, parent));

        _this3.name = 'DotenvCheckFileNotFoundError';
        (0, _setPrototypeOf2.default)(_this3, DotenvCheckFileNotFoundError.prototype);
        Error.captureStackTrace(_this3, _this3.constructor);
        return _this3;
    }

    return DotenvCheckFileNotFoundError;
}(BaseError);

module.exports.DotenvCheckFileNotFoundError = DotenvCheckFileNotFoundError;

var DotenvCheckInvalidDotenvFileStructureError = function (_BaseError3) {
    (0, _inherits3.default)(DotenvCheckInvalidDotenvFileStructureError, _BaseError3);

    function DotenvCheckInvalidDotenvFileStructureError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckInvalidDotenvFileStructureError);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckInvalidDotenvFileStructureError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckInvalidDotenvFileStructureError)).call(this, parent));

        _this4.name = 'DotenvCheckInvalidDotenvFileStructureError';
        Error.captureStackTrace(_this4, _this4.constructor);
        return _this4;
    }

    return DotenvCheckInvalidDotenvFileStructureError;
}(BaseError);

module.exports.DotenvCheckInvalidDotenvFileStructureError = DotenvCheckInvalidDotenvFileStructureError;

var DotenvCheckInvalidDotenvVariableNameError = function (_DotenvCheckInvalidDo) {
    (0, _inherits3.default)(DotenvCheckInvalidDotenvVariableNameError, _DotenvCheckInvalidDo);

    function DotenvCheckInvalidDotenvVariableNameError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckInvalidDotenvVariableNameError);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckInvalidDotenvVariableNameError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckInvalidDotenvVariableNameError)).call(this, parent));

        _this5.name = 'DotenvCheckInvalidDotenvVariableNameError';
        Error.captureStackTrace(_this5, _this5.constructor);
        return _this5;
    }

    return DotenvCheckInvalidDotenvVariableNameError;
}(DotenvCheckInvalidDotenvFileStructureError);

module.exports.DotenvCheckInvalidDotenvVariableNameError = DotenvCheckInvalidDotenvVariableNameError;

var DotenvCheckDotenvDuplicateVariableError = function (_DotenvCheckInvalidDo2) {
    (0, _inherits3.default)(DotenvCheckDotenvDuplicateVariableError, _DotenvCheckInvalidDo2);

    function DotenvCheckDotenvDuplicateVariableError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckDotenvDuplicateVariableError);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckDotenvDuplicateVariableError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckDotenvDuplicateVariableError)).call(this, parent));

        _this6.name = 'DotenvCheckDotenvDuplicateVariableError';
        Error.captureStackTrace(_this6, _this6.constructor);
        return _this6;
    }

    return DotenvCheckDotenvDuplicateVariableError;
}(DotenvCheckInvalidDotenvFileStructureError);

module.exports.DotenvCheckDotenvDuplicateVariableError = DotenvCheckDotenvDuplicateVariableError;

var DotenvCheckDotenvFilesMismatchError = function (_BaseError4) {
    (0, _inherits3.default)(DotenvCheckDotenvFilesMismatchError, _BaseError4);

    function DotenvCheckDotenvFilesMismatchError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckDotenvFilesMismatchError);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckDotenvFilesMismatchError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckDotenvFilesMismatchError)).call(this, parent));

        _this7.name = 'DotenvCheckDotenvFilesMismatchError';
        Error.captureStackTrace(_this7, _this7.constructor);
        return _this7;
    }

    return DotenvCheckDotenvFilesMismatchError;
}(BaseError);

module.exports.DotenvCheckDotenvFilesMismatchError = DotenvCheckDotenvFilesMismatchError;

var DotenvCheckVariableNotExportedError = function (_BaseError5) {
    (0, _inherits3.default)(DotenvCheckVariableNotExportedError, _BaseError5);

    function DotenvCheckVariableNotExportedError(parent) {
        (0, _classCallCheck3.default)(this, DotenvCheckVariableNotExportedError);

        var _this8 = (0, _possibleConstructorReturn3.default)(this, (DotenvCheckVariableNotExportedError.__proto__ || (0, _getPrototypeOf2.default)(DotenvCheckVariableNotExportedError)).call(this, parent));

        _this8.name = 'DotenvCheckVariableNotExportedError';
        Error.captureStackTrace(_this8, _this8.constructor);
        return _this8;
    }

    return DotenvCheckVariableNotExportedError;
}(BaseError);

module.exports.DotenvCheckVariableNotExportedError = DotenvCheckVariableNotExportedError;