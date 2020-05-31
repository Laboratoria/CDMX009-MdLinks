#!/usr/bin/env node
const process = require('process');
const mdLinks = require('./index');

const argv = process.argv.slice(2);
const options = {
  validate: false,
  stats: false,
};

if (argv.length) {
  if (argv[1] === '--stats') {
    mdLinks(argv[0])
      .then((arrobj) => {
        const totalLinks = arrobj.length;
        const uniqueLinks = [...new Set(arrobj.map((obj) => obj.href))].length;
        console.log(`\n Total : ${totalLinks} \n Unique: ${uniqueLinks}`);
      });
  } else if ((argv[1] === '--validate' && argv[2] === '--stats')) {
    mdLinks(argv[0], { validate: true })
      .then((arrobj) => {
        const totalLinks = arrobj.length;
        const uniqueLinks = [...new Set(arrobj.map((obj) => obj.href))].length;
        const broken = arrobj.filter((element) => element.message === 'Fail').length;
        console.log(`\n Total : ${totalLinks}\n Unique: ${uniqueLinks}\n Broken: ${broken}`);
      });
  } else if (argv[1] === '--validate') {
    options.validate = true;
    mdLinks(argv[0], options)
      .then((response) => response.map((links) => {
        console.log(`\n Path :${links.file} \n Link : ${links.href}  ${links.status}  ${links.message} \n File : ${links.text} `);
      }));
  } else {
    mdLinks(argv[0])
      .then((response) => response.forEach((links) => {
        console.log(`\n Path :${links.file}\n Link : ${links.href}  \n Title : ${links.text}`);
      }));
  }
}
