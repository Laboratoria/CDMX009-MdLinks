#!/usr/bin/env node

let {
    hola,
    checkItIsAMarkdownFile,
    readFile
} = require("./app.js")

hola();
checkItIsAMarkdownFile('./README.md');
readFile();