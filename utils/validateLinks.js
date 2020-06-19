//Esta funcion valida los links
const fetch = require("node-fetch");
const chalk = require("chalk");

function validateLinks(links) {
  links.forEach((link) => {
    fetch(link)
      .then((res) => {
        let status = res.status;
        if (status === 200) {
          console.log(chalk.green(link, "Si funciona"));
        } else if (status === 404) {
          console.log(chalk.red(link, "No sirve"));
        }
      })

      .catch((e) => {
        console.log(chalk.red(link, "No sirve"));
      });
  });
}

module.exports = {
  validateLinks,
};
