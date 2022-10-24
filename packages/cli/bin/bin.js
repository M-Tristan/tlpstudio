"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var action_1 = require("./action");
// import {prompt} from 'inquirer'
var program = new commander_1.Command();
program
    .command('create:node')
    .description('Create a component').action(action_1.createNode);
program.on('command:*', function () {
    program.outputHelp();
    process.exitCode = 1;
});
program.parse();
