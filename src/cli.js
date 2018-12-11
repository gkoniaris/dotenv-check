#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const dotenvCheck = require('./index.js')

dotenvCheck(argv).execute()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err)
    process.exit(-1)
})