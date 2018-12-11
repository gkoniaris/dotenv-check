Dotenv Check
============

This is a node.js cli module, performing various checks on the environment variables that your application uses. It's functionality is based on the dotenv module's .env file structure, but it can also be used without it 

---

## Features
- Validates .env files structure and variable names
- Performs similarity checks on main and sample .env files
- Checks if envs are correctly exported in your current environment
- Scans your source code and checks that you have not used any variables that are not defined in your .env files

## Installation

Install the module by running `npm install dotenv-check`

## Prerequisites

For this module to work, you must create a .env.sample file with the environment variables that you use in your application. The file should keep the dotenv module file format. If you are already using dotenv module, you are good to go.

## Configuration

In your package.json, create a script called `dotenvCheck` and make it run the following command `dotenv-check`
You can now use the script wherever you want. We recommend that you use it in the post install hook, in your package.json file

This module takes four optional arguments

- `envFile` [default: null] The env file that is used in your current environment. If you don't use dotenv in your staging/production environment, but export the variables in some other way, leave this empty
- `sampleEnvFile` [default: '.env.sample'] // The sample dotenv file.
- `checkEnvsExported` [default: false] // Whether to check that the vars found in your .env.sample file have been exported in your current environment
- `sourceCode` [default: null]

The arguments must be passed in the npm script like this

`dotenv-check --envFile=".env" --sampleEnvFile=".env.sample"`

## How it works

The module checks that the structure and the environemnt variables in your .env.sample (and your current environment .env file if envFile is provided) file(s) are correct.
If you provided the `envFile`, it will also check that these two files have exactly the same variables
If `checkEnvsExported` is set to true, it will try to find every variable name that was parsed from the .env.sample file in the process.env node.js variable
If you provide a `sourceCode` folder, it will scan all files with a .js extension recursively, and checks if there is any environment variable that is not present in the .env.sample file is used in the code (it excludes the comments)

If any of these checks fail, it will exit with a status of 1, else it will exit with a status of 0

---

## License
This project is licensed under the terms of the **MIT** license.