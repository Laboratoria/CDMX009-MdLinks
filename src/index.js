#!/usr/bin/env node  //Shebang 

const mdLinks = require('./md.js')
const fetch = require('node-fetch');
const chalk = require('chalk');
const pathDoc = process.argv[2];
let options = {
  validate: false,
  stats: false
}

mdLinks(pathDoc, options).then((arrayLinksMd) => {

  if (process.argv[3] === '--validate' && process.argv[4] === '--stats' || process.argv[4] === '--validate' && process.argv[3] === '--stats') {
    options.validate = true;
    options.stats = true;
    let urlArray = [];
    let arrayStatusOk = 0;
    let arrayStatusFail = [];

    arrayLinksMd.forEach(element => {

      urlArray.push(element.href)

      fetch(element.href).then(res => {
        if (res.status >= 200 && res.status <= 309) {
          arrayStatusOk = arrayStatusOk + 1;

        } else if (res.status >= 400) {
          arrayStatusFail.push(res.status);

        }
      });
    })
   
  let uniqs = new Set(urlArray);

    setTimeout(function () {
      console.log(`|Links: ${chalk.cyanBright(pathDoc)} |ALL| ${chalk.yellowBright(arrayLinksMd.length)} `);
      console.log(`|Links: ${chalk.cyanBright(pathDoc)} |UNIQS | ${chalk.blueBright(uniqs.size)} `);
      console.log(`|Links: ${chalk.cyanBright(pathDoc)} |OK     | ${chalk.green(arrayStatusOk)}`);
      console.log(`|Links: ${chalk.cyanBright(pathDoc)} |FAIL   | ${chalk.red(arrayStatusFail.length)} `);


    }, 4000);

  } else if (process.argv[3] === '--validate') {
    options.validate = true;
    arrayLinksMd.forEach((element) => {
      fetch(element.href).then(res => {

        if (res.status >= 200 && res.status <= 309) {
          console.log(`|Status:(YES!) ${chalk.greenBright(res.status)} ${chalk.green(res.statusText)}  | File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.blueBright(res.url)} `);

        } else if (res.status >= 400) {
          console.log(`|Status:(ÑO)  ${chalk.redBright(res.status)} ${chalk.red("PÁGINA NO ENCONTRADA")}| File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.redBright(res.url)} `);

        }
      }).catch(err => {
        console.log(`|Status:(NO SIRVE) |File: ${chalk.cyanBright(element.file)} | Text: ${chalk.yellowBright(element.text)} | Link: ${chalk.underline.yellowBright(res.url)}<---NOT FOUND` + err);
      });

    });
  } else if (process.argv[3] === '--stats') {
    options.stats = true;
    let urlArray = [];
    arrayLinksMd.forEach(element => {
      urlArray.push(element.href)
    })

module.exports = mdLinks;