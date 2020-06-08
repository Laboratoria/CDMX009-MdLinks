const fetch = require("node-fetch");
const chalk = require("chalk");

function getInfoLink(arrayN, flagValidate, flagStats) {
    let succes = 0;
    let broke = 0;
    let arrayS = [];
    let failedLinks = [];
    let links = arrayN.map((link) => {
      fetch(link.href)
        .then((res) => {
          let objectLinks = {
            href: res.url,
            label: link.label,
            status: res.status,
            statusText: res.statusText,
          };
          arrayS.push(objectLinks);
  
          validateLinks(objectLinks, flagValidate);
        })
  
        .catch((err) => {
          let objetFail = err.message;
          
          failedLinks.push(objetFail);
  
          if (arrayS.length + failedLinks.length === arrayN.length) {
            statsLinks(flagStats, arrayN, failedLinks, arrayS, succes, broke);
          }
        });
    });
  }
  
  function validateLinks(objectLinks, flagValidate) {
    if (flagValidate > 0) {
      if (objectLinks.status === 200) {
        return console.log(
          `${objectLinks.label}`,
          chalk.bgBlue(`${objectLinks.status} ✔ ${objectLinks.statusText}`)
        );
      } else {
        return console.log(
          `${objectLinks.label}`,
          chalk.bgRed(`${objectLinks.status} X ${objectLinks.statusText}`)
        );
      }
    }
  }
  
  function statsLinks(flagStats, arrayN, failedLinks, arrayS, succes, broke) {
    if (flagStats > 0) {
      arrayS.map((link) => {
        if (link.status === 404) {
          broke++;
        } else {
          succes++;
        }
      });
      if (arrayN.length === failedLinks.length + arrayS.length) {
        return console.log(
          chalk.bgCyan(
            chalk.black(`Links Totales: ${arrayN.length}\n`),
            chalk.bgGreen(
              chalk.black(`Links trabanjando de manera correcta: ${succes} \n`)
            ),
            chalk.bgYellow(
              chalk.black(`Links con error de conexión: ${failedLinks.length} \n`)
            ),
            chalk.bgRed(chalk.black(`Links rotos : ${broke} \n`))
          )
        );
      }
    }
  }

  
  module.exports = {
   getInfoLink,
   validateLinks,
   statsLinks
  };