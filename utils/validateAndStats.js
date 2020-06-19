// esta funcion hace las Valida los links y da las estadisticas

//Funcion que da las estadisticas

const fetch = require("node-fetch");
const chalk = require("chalk");

function validateAndStats(links) {
  let functionalLinks = 0;
  let brokenLinks = 0;

  const promises = [];
  links.forEach((link) => {
    const p = fetch(link)
      .then((res) => {
        let status = res.status;
        if (status === 200) {
          functionalLinks++;
          console.log(chalk.green("✔ Unique:", link));
          return status;
        } else if (status === 404) {
          brokenLinks++;
          console.log(chalk.red("✖ broken :", link));
          return status;
        }
      })

      .catch((e) => {
        brokenLinks++;
        console.log(chalk.red("✖ broken :", link));
        let status = 404;
        return status;
      });
    promises.push(p);
  });

  //return
  Promise.all(promises).then((results) => {
    //return results;
    let goodLinks = 0;
    let failLinks = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] === 200) {
        goodLinks++;
      } else if (results[i] === 404) {
        failLinks++;
      }
      /*return {
        Unique: goodLinks,
        Broken: failLinks,
      };*/
    }
    console.log(
      chalk.yellowBright("Total de links encontrados", results.length)
    );
    console.log(chalk.greenBright("✔ Unique =", goodLinks));
    console.log(chalk.redBright("✖ broken =", failLinks));
  });
}

module.exports = {
  validateAndStats,
};
