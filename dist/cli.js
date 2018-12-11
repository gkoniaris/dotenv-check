#! /usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2));
var dotenvCheck = require('./index.js');

dotenvCheck(argv).execute().then(function () {
    process.exit(0);
}).catch(function (err) {
    console.error(err);
    process.exit(-1);
});