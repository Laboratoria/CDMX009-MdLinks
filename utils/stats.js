//Funcion que da las estadisticas

const fetch = require("node-fetch");
const chalk = require("chalk");

function statsLinks(links) {
  let functionalLinks = 0;
  let brokenLinks = 0;

  const promises = [];
  links.forEach((link) => {
    const p = fetch(link)
      .then((res) => {
        let status = res.status;
        if (status === 200) {
          functionalLinks++;
          return status;
        } else if (status === 404) {
          brokenLinks++;
          return status;
        }
      })

      .catch((e) => {
        brokenLinks++;
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
  statsLinks,
};
