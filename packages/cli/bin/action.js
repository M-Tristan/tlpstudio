"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createNode = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var inquirer_1 = __importDefault(require("inquirer"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var createFile = function (componentPath, fileName, componentname) {
    if (fs_extra_1["default"].pathExistsSync(path_1["default"].resolve(process.cwd(), componentPath, componentname + '/' + fileName))) {
        return;
    }
    var filepath = path_1["default"].resolve(__dirname, '../template/node/' + fileName + '.temp');
    var res = fs_extra_1["default"].readFileSync(filepath, { encoding: 'utf-8' });
    res = res.replaceAll("{{:name}}", componentname);
    fs_extra_1["default"].writeFileSync(path_1["default"].resolve(process.cwd(), componentPath, componentname + '/' + fileName), res);
};
var createNode = function () {
    inquirer_1["default"].prompt({
        name: 'componentname',
        type: 'input',
        message: '输入组建名?',
        "default": "testNode" + Date.now()
    }).then(function (res) {
        var config = require(path_1["default"].resolve(process.cwd(), './cilconfig.json'));
        var componentname = res.componentname;
        if (!fs_extra_1["default"].pathExistsSync(path_1["default"].resolve(process.cwd(), config.componentPath, componentname))) {
            fs_extra_1["default"].mkdirsSync(path_1["default"].resolve(process.cwd(), config.componentPath, componentname));
        }
        createFile(config.componentPath, 'config.ts', componentname);
        createFile(config.componentPath, 'edit.vue', componentname);
        createFile(config.componentPath, 'index.ts', componentname);
        createFile(config.componentPath, 'index.vue', componentname);
    });
};
exports.createNode = createNode;
exports["default"] = { createNode: createNode };
