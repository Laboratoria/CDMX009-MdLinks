const mdLinks = require("./index");
const fetch = require("node-fetch");
const chalk = require("chalk");
const { parseLinks, extractData } = require("./functions");

const filePath = process.argv[2];
const argument = process.argv[3];
let validate = false;
if (argument && (argument === "--validate" || argument === "v")) {
  validate = true;
}

const resultReadFile = mdLinks(filePath, null);

resultReadFile
  .then((data) => {
    const linkArray = parseLinks(data);
    const objArray = linkArray.map(extractData);
    if (!validate) {
      for (let obj of objArray) {
        console.log(chalk.cyan(obj.link), chalk.yellow(obj.text));
      }
      return;
    }
    for (let obj of objArray) {
      fetch(obj.link)
        .then((response) => {
          if (response.status == 200) {
            console.log(
              chalk.green("[OK]"),
              chalk.cyan(obj.link),
              chalk.bgGreen(`${response.status} ${response.statusText}`),
              chalk.yellow(obj.text)
            );
          } else {
            console.log(
              chalk.red("[X]"),
              chalk.cyan(obj.link),
              chalk.bgRed(`${response.status} ${response.statusText}`),
              chalk.white(obj.text)
            );
          }
        })
        .catch((error) =>
          console.log(
            chalk.gray("[-]"),
            chalk.cyan(obj.link),
            chalk.bgRed(`${error.type} ${error.code} `),
            chalk.white(obj.text)
          )
        );
    }
  })
  .catch((err) => {
    console.error(err);
  });
