const assert = require('chai').assert
const mock = require('mock-fs')
const dotenvCheck = require('../src')

describe('Dotenv Check module', function () {
    describe('Called with null in sampleEnvFile configuration', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO'
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: null, checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckConfigurationError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env file that doesnt exist', function() {
        beforeEach(function() {
            mock({
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckFileNotFoundError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with a custom .env file that doesnt exist', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO'
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env.custom', sampleEnvFile: '.env.sample'})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckFileNotFoundError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with a custom .env.sample file that doesnt exist', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO'
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample.custom'})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckFileNotFoundError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env.sample file that doesnt exist', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckFileNotFoundError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env.sample that is invalid', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                '.env.sample': 'DotenvCheck_VARIABLE_1',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvFileStructureError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env that is invalid', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvFileStructureError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env that has an invalid variable name', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck!_VARIABLE_1=hallo',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvVariableNameError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env that has an invalid variable name, and the problem exists in the first letter', function() {
        beforeEach(function() {
            mock({
                '.env': '1DotenvCheck_VARIABLE_1=hallo',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.include(err.message, 'First')
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvVariableNameError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env.sample that has an invalid variable name', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=hallo',
                '.env.sample': 'DotenvCheck!_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvVariableNameError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env.sample that has an invalid variable name, and the problem exists in the first letter', function() {
        beforeEach(function() {
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=hallo',
                '.env.sample': '1DotenvCheck_VARIABLE_1=HALLO',
            })
        })
        
        it('should throw an exception', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .catch(err => {
                assert.include(err.message, 'First')
                assert.equal(err.constructor.name, "DotenvCheckInvalidDotenvVariableNameError")
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with an .env that constains duplicate variables', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=hallo\nDotenvCheck_VARIABLE_1=hallo1',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvDuplicateVariableError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=hallo\rDotenvCheck_VARIABLE_1=hallo1',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvDuplicateVariableError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })
    })

    describe('Called with an .env that constains duplicate variables', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo\nDotenvCheck_VARIABLE_1=hallo1'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvDuplicateVariableError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo\rDotenvCheck_VARIABLE_1=hallo1'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvDuplicateVariableError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })
    })

    describe('Called with an .env that constains a variable that doesnt exist in .env.sample', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO\nDotenvCheck_VARIABLE_2=hallo',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvFilesMismatchError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO\rDotenvCheck_VARIABLE_2=hallo',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvFilesMismatchError")
                    done()
                })
            })

            afterEach(function() {
                mock.restore()
            })
        })
    })

    describe('Called with an .env.sample that constains a variable that doesnt exist in .env', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo\nDotenvCheck_VARIABLE_2=hallo'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvFilesMismatchError")
                    done()
                })
            })
    
            afterEach(function() {
                mock.restore()
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=hallo\rDotenvCheck_VARIABLE_2=hallo'
                })
            })
            
            it('should throw an exception', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .catch(err => {
                    assert.equal(err.constructor.name, "DotenvCheckDotenvFilesMismatchError")
                    done()
                })
            })
    
            afterEach(function() {
                mock.restore()
            })
        })
    })

    // We allow empty .env files
    describe('Called with an .env and a .env.sample that are empty', function() {
        beforeEach(function() {
            mock({
                '.env': '',
                '.env.sample': ''
            })
        })
        
        it('should resolve', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .then(() => {
                done()
            })
        })

        afterEach(function() {
            mock.restore()
        })
    })

    describe('Called with a valid .env and .env.sample file', function() {
        beforeEach(function() {
            delete process.env.DotenvCheck_VARIABLE_1
            mock({
                '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
            })
        })
               
        it('should resolve if called with no check for exported variables', function (done) {
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
            .execute()
            .then(() => {
                done()
            })
        })
        
        it('should resolve called with a check for exported variables, and the variables exist', function (done){
            process.env.DotenvCheck_VARIABLE_1 = 'HALLO'
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: true})
            .execute()
            .then(() => {
                done()
            })
        })
        
        it('should throw an exception if called with a check for exported variables, and the variables dont exist', function (done){
            delete process.env.DotenvCheck_VARIABLE_1
            dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: true})
            .execute()
            .catch(err => {
                assert.equal(err.constructor.name, "DotenvCheckVariableNotExportedError")
                done()
            })
        })

        afterEach(function() { 
            mock.restore() 
        })
    })

    describe('Called with a valid .env with empty lines', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                delete process.env.DotenvCheck_VARIABLE_1
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO\n\n \n  \n   \n',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
                })
            })
                
            it('should resolve if called with no check for exported variables', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .then(() => {
                    done()
                })
            })

            afterEach(function() { 
                mock.restore() 
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                delete process.env.DotenvCheck_VARIABLE_1
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO\r\r \r  \r   \r',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO',
                })
            })
                
            it('should resolve if called with no check for exported variables', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .then(() => {
                    done()
                })
            })

            afterEach(function() { 
                mock.restore() 
            })
        })
    })

    describe('Called with a valid .env.sample with empty lines', function() {
        describe('Using \n as the new line delimiter', function() {
            beforeEach(function() {
                delete process.env.DotenvCheck_VARIABLE_1
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO\n\n \n  \n   \n',
                })
            })
                
            it('should resolve if called with no check for exported variables', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .then(() => {
                    done()
                })
            })

            afterEach(function() { 
                mock.restore() 
            })
        })

        describe('Using \r as the new line delimiter', function() {
            beforeEach(function() {
                delete process.env.DotenvCheck_VARIABLE_1
                mock({
                    '.env': 'DotenvCheck_VARIABLE_1=HALLO',
                    '.env.sample': 'DotenvCheck_VARIABLE_1=HALLO\r\r \r  \r   \r',
                })
            })
                
            it('should resolve if called with no check for exported variables', function (done) {
                dotenvCheck({envFile: '.env', sampleEnvFile: '.env.sample', checkEnvsExported: false})
                .execute()
                .then(() => {
                    done()
                })
            })

            afterEach(function() { 
                mock.restore() 
            })
        })
    })
});