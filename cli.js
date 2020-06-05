#!/usr/bin/env node
const process = require('process');
const mdLinks = require('./index');
const chalk = require('chalk'); 

const argv = process.argv.slice(2);
const options = {
  validate: false,
  stats: false,
};

const blue = chalk.bold.blueBright;
const green = chalk.italic.greenBright;
const red = chalk.italic.redBright;
const yellow  = chalk.italic.yellowBright;  
if (argv.length) {
  if (argv[1] === '--stats') {
    mdLinks(argv[0])
      .then((arrobj) => {
        const totalLinks = arrobj.length;
        const uniqueLinks = [...new Set(arrobj.map((obj) => obj.href))].length;
        console.log(blue(`\nTOTAL:   `) + green( totalLinks) ); 
        console.log(blue(`\nUNIQUE:   `) + green( uniqueLinks) ); 
      });
  } else if ((argv[1] === '--validate' && argv[2] === '--stats')) {
    mdLinks(argv[0], { validate: true })
      .then((arrobj) => {
        const totalLinks = arrobj.length;
        const uniqueLinks = [...new Set(arrobj.map((obj) => obj.href))].length;
        const broken = arrobj.filter((element) => element.message === 'Fail').length;
        console.log(blue(`\nTOTAL:   `) + green( totalLinks) ); 
        console.log(blue(`\nUNIQUE:   `) + green( uniqueLinks) ); 
        console.log(blue(`\nBROKEN:   `) + red( broken) ); 
      });
  } else if (argv[1] === '--validate') {
    options.validate = true;
    mdLinks(argv[0], options)
      .then((response) => response.map((links) => {
        console.log(blue(`\nPATH:  `) + green(links.file)); 
        console.log(blue(`LINK:  `) + green(`${links.href}  `) + yellow (`${links.status}  ${links.message} `));
        console.log(blue(`TITLE:  `) + green(links.text));
      }));
  } else {
    mdLinks(argv[0])
      .then((response) => response.forEach((links) => {
        console.log(blue(`\nPATH:  `) + green(links.file)); 
        console.log(blue(`\nLINK:  `) + green(links.href));
        console.log(blue(`\nTITLE:  `) + green(links.text));
      }));
  }
}

