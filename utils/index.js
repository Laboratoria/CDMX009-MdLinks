#!/usr/bin/env node

const argv = require("./cli/yargs").argv;
const {
  integrationValidate,
  integrationStats,
  integrationValidationStats,
} = require("./utils");

let comand = argv._[0];

switch (comand) {
  case "validate":
    integrationValidate(argv.path);
    break;
  case "stats":
    integrationStats(argv.path);
    break;
  case "validatestats":
    integrationValidationStats(argv.path);
    break;
  default:
    console.log("Pide ayuda con --help");
}
