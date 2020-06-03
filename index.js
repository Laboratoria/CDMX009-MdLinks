#!/usr/bin/env node

const path = require('path')
//file path 
let uri = process.argv[2]

let absolutePath = path.resolve(uri)

console.log(absolutePath)