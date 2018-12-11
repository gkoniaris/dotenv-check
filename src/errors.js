class BaseError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DotenvCheckBaseError';
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.BaseError = BaseError

class DotenvCheckConfigurationError extends BaseError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckConfigurationError';
      Object.setPrototypeOf(this, DotenvCheckConfigurationError.prototype);
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckConfigurationError = DotenvCheckConfigurationError

class DotenvCheckFileNotFoundError extends BaseError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckFileNotFoundError';
      Object.setPrototypeOf(this, DotenvCheckFileNotFoundError.prototype);
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckFileNotFoundError = DotenvCheckFileNotFoundError

class DotenvCheckInvalidDotenvFileStructureError extends BaseError {
    constructor(parent) {
        super(parent);
        this.name = 'DotenvCheckInvalidDotenvFileStructureError';
        Error.captureStackTrace(this, this.constructor);
      }
}
module.exports.DotenvCheckInvalidDotenvFileStructureError = DotenvCheckInvalidDotenvFileStructureError

class DotenvCheckInvalidDotenvVariableNameError extends DotenvCheckInvalidDotenvFileStructureError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckInvalidDotenvVariableNameError';
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckInvalidDotenvVariableNameError = DotenvCheckInvalidDotenvVariableNameError

class DotenvCheckDotenvDuplicateVariableError extends DotenvCheckInvalidDotenvFileStructureError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckDotenvDuplicateVariableError';
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckDotenvDuplicateVariableError = DotenvCheckDotenvDuplicateVariableError

class DotenvCheckDotenvFilesMismatchError extends BaseError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckDotenvFilesMismatchError';
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckDotenvFilesMismatchError = DotenvCheckDotenvFilesMismatchError

class DotenvCheckVariableNotExportedError extends BaseError {
    constructor(parent) {
      super(parent);
      this.name = 'DotenvCheckVariableNotExportedError';
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DotenvCheckVariableNotExportedError = DotenvCheckVariableNotExportedError