#!/usr/bin/env node

// some fancy modules just because
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const path = require('path');
const mdlinks = require('./md-links.js');

// I have a crush on figlet
console.log(chalk.bold.cyan(figlet.textSync('md-links', {
  font: 'ANSI Shadow',
  horizontalLayout: 'default',
})));

const spinner = ora();
let userPath = process.argv[2];


if (path.isAbsolute(userPath)) {
  userPath = path.resolve(userPath);
}

if (userPath.includes('.')) {
  if ((process.argv[3] === '--stats' && process.argv[4] === '--validate')) {
    spinner.start();
    mdlinks.connector(userPath, { validate: true })
      .then((links) => {
        spinner.stop();
        const showStats = mdlinks.getStats(links, { validate: true });
        console.log(chalk.bold.cyan('Your file contains:'), showStats.total, 'links');
        console.log(chalk.bold.blue('Unique:'), showStats.unique, 'links');
        console.log(chalk.bold.red('Broken:'), showStats.broken, 'links');
      });
  } else if (process.argv[3] === '--validate') {
    spinner.start();
    mdlinks.connector(userPath, { validate: true })
      .then((links) => {
        if (links.length >= 0) {
          spinner.stop();
          console.log(links);
        } else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      });
  } else if (process.argv[3] === '--stats') {
    mdlinks.connector(userPath, { validate: false })
      .then((links) => {
        const stats = mdlinks.getStats(links, { validate: false });
        console.log(chalk.bold.cyan('Your file contains:'), stats.total, 'links');
        console.log(chalk.bold.blue('Unique:'), stats.unique, 'links');
      });
  } else {
    mdlinks.connector(userPath, { validate: false })
      .then((links) => {
        if (links.length > 0) {
          console.log(links);
        } else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      });
  }
} else {
  mdlinks.readDir(userPath)
    .then((files) => {
      if (files.length > 0) {
        if ((process.argv[3] === '--stats' && process.argv[4] === '--validate')) {
          spinner.start();
          files.forEach((file) => {
            mdlinks.connector(file, { validate: true })
              .then((links) => {
                spinner.stop();
                const showStats = mdlinks.getStats(links, { validate: true });
                console.log(chalk.bold.cyan('Your file contains:'), showStats.total, 'links');
                console.log(chalk.bold.blue('Unique links:'), showStats.unique);
                console.log(chalk.bold.red('Broken links:'), showStats.broken);
              });
          });
        } else if (process.argv[3] === '--validate') {
          spinner.start();
          files.forEach((file) => {
            mdlinks.connector(file, { validate: true })
              .then((links) => {
                if (links) {
                  spinner.stop();
                  console.log(links);
                } else {
                  console.log(chalk.bold.red('No links were found in your file.'));
                }
              });
          });
        } else if (process.argv[3] === '--stats') {
          files.forEach((file) => {
            mdlinks.connector(file, { validate: false })
              .then((links) => {
                const stats = mdlinks.getStats(links, { validate: false });
                console.log(chalk.bold.cyan('Your file contains:'), stats.total, 'links');
                console.log(chalk.bold.blue('Unique links:'), stats.unique);
              });
          });
        } else {
          files.forEach((file) => {
            mdlinks.connector(file, { validate: false })
              .then((links) => {
                console.log(links);
              });
          });
        }
      } else {
        console.log(chalk.bold.red('No files with extension .md were found in the directory'));
      }
    })
    .catch((error) => {
      console.log(error, 'no such directory found');
    });
}
