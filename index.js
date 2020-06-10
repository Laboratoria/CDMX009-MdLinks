#!/usr/bin/env node
const mdLinks = require("./md-links");
const chalk = require("chalk");
const process = require("process");
const fetch = require("node-fetch"); //links status

let commandUser = []; //array process vacío.
let urlCounter; //Var vacía que tomará el valor que se asignará luego
let uniqueLinks; //Var vacía que tomará el valor que se asignará luego
let brokenLinks; //Var vacía que tomará el valor que se asignará luego

//forEach de lo que se captura en consola
process.argv.forEach((val, index) => {
  commandUser.push(process.argv[index]);
});

//Options user
//Si el usuario escribe md-links <path/file> '--validate --stats'
if (commandUser[3] === "--validate" && commandUser[4] === "--stats") {
  mdLinks(commandUser[2], { validate: true })
    .then((url) => {
      urlCounter = url.map((element) => element.href);
      uniqueLinks = [...new Set(urlCounter)].length;
      brokenLinks = urlCounter.filter((el) => el.status > 0 || el.status > 400);
      console.log(`Links Totales:  ${chalk.bold.blue(urlCounter.length)}.`);
      console.log(`Links únicos:  ${chalk.bold.green(uniqueLinks)}.`);
      console.log(`Links rotos:  ${chalk.red(brokenLinks).length}.`);
    })
    .catch((error) => {
      console.log(error);
    });

  //Si el usuario escribe md-links <path/file> '--validate
} else if (commandUser[3] === "--validate") {
  mdLinks(commandUser[2], { validate: true })
    .then((url) => {
      url.forEach((element) => {
        //console.log("Estadísticas", element)
        fetch(element.href).then((res) => {
          console.log(
            ` Url => ${res.url} | Boolean => ${res.ok} | Code=> ${res.status} | Its Ok? => ${res.statusText}|`
          );
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  //Si el usuario escribe md-links <path/file> '--stats'
} else if (commandUser[3] === "--stats") {
  mdLinks(commandUser[2], { validate: false })
    .then((url) => {
      urlCounter = url.map((element) => element.href);
      uniqueLinks = [...new Set(urlCounter)].length;
      console.log(`Links Totales:  ${chalk.bold.blue(urlCounter.length)}.`);
      console.log(`Links únicos:  ${chalk.bold.green(uniqueLinks)}.`);
    })
    .catch((error) => {
      console.log(error);
    });

  //Si el usuario escribe md-links <path/file>
} else if (commandUser.length <= 3) {
  return mdLinks(commandUser[2]).then((res) => {
    console.log("Links encontrados en tu MD", res);
  });
}
