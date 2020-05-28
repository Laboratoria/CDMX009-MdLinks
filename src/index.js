#!/usr/bin/env node

// some fancy modules just because
const chalk = require('chalk');
const figlet = require('figlet');
const path = require('path');
const mDLinks = require('./md-links.js');

// I have a crush on figlet
console.log(chalk.bold.cyan(figlet.textSync('md-links', {
  font: 'ANSI Shadow',
  horizontalLayout: 'default',
})));


let userPath = process.argv[2];

if (path.isAbsolute(userPath)) {
  userPath = path.resolve(userPath);
}

if (userPath.includes('.')) {
  if ((process.argv[3] === '-validate' && process.argv[4] === '-stats')
  || (process.argv[3] === '-stats' && process.argv[4] === '-validate')) {
    mDLinks.mdLinks(userPath, { validate: true })
      .then((links) => {
        const stats = mDLinks.stats(links, { validate: true });
        console.log(chalk.bold.cyan('Your file contains:'), stats.total, 'links');
        console.log(chalk.bold.blue('Unique:'), stats.unique, 'links');
        console.log(chalk.bold.red('Broken:'), stats.broken, 'links');
      });
  } else if (process.argv[3] === '-validate') {
    mDLinks.mdLinks(userPath, { validate: true })
      .then((links) => {
        if (links.length > 0) {
          console.log(links);
        } else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      });
  } else if (process.argv[3] === '-stats') {
    mDLinks.mdLinks(userPath, { validate: false })
      .then((links) => {
        const stats = mDLinks.stats(links, { validate: false });
        console.log(chalk.bold.cyan('Your file contains:'), stats.total, 'links');
        console.log(chalk.bold.blue('Unique:'), stats.unique, 'links');
      });
  } else {
    mDLinks.mdLinks(userPath, { validate: false })
      .then((links) => {
        if (links.length > 0) {
          console.log(links);
        } else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      });
  }
} else {
  mDLinks.readDir(userPath)
    .then((files) => {
      if (files.length > 0) {
        if ((process.argv[3] === '-validate' && process.argv[4] === '-stats')
        || (process.argv[3] === '-stats' && process.argv[4] === '-validate')) {
          files.forEach((file) => {
            mDLinks.mdLinks(file, { validate: true })
              .then((links) => {
                const stats = mDLinks.stats(links, { validate: true });
                console.log(chalk.bold.cyan('Your file contains:'), stats.total, 'links');
                console.log(chalk.bold.blue('Unique:'), stats.unique, 'links');
                console.log(chalk.bold.red('Broken:'), stats.broken, 'links');
              });
          });
        } else if (process.argv[3] === '-validate') {
          files.forEach((file) => {
            mDLinks.mdLinks(file, { validate: true })
              .then((links) => {
                if (links) {
                  console.log(links);
                } else {
                  console.log(chalk.bold.red('No links were found in your file.'));
                }
              });
          });
        } else if (process.argv[3] === '-stats') {
          files.forEach((file) => {
            mDLinks.mdLinks(file, { validate: false })
              .then((links) => {
                const stats = MDLinks.stats(links, { validate: false });
                console.log(chalk.bold.green('Total links:'), stats.total);
                console.log(chalk.bold.blue('Unique links:'), stats.unique);
              });
          });
        } else {
          files.forEach((file) => {
            mDLinks.mdLinks(file, { validate: false })
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
      console.log('no such directory found');
    });
} 


