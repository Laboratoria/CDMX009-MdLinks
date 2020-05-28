const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound');
const marked = require('marked');


//

const readFile = path => new Promise((resolve, reject) => {
  const links = [];
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      const renderer = new marked.Renderer();
      renderer.link = function (href, text) {
        const pathName = path.split('//');
        links.push({
          href: href,
          text: text,
          file: pathName[pathName.length - 1],
        });
      };
      marked(data, { renderer });
      resolve(links);
    }
  });
});

// filehound retorna una promesa que resuelve en un array
// con archivos de extensión .md que encuentre

const readDir = path => filehound.create()
  .paths(path)
  .ext('md')
  .find();

// validateLinks retorna una promesa con array de links
const validateLinks = links => Promise.all(links.map(link => new Promise((resolve, reject) => {
  fetch(link.href)
    .then((response) => {
      if (response) {
        link.status = response.status;
        link.statusTxt = 'ok';
        resolve(link);
      } else {
        link.statusTxt = 'fail';
        console.log(error);
      }
    })
    .catch((error) => {
      reject(console.log(error));
    });
})));

// Stats permite saber el número total de links
// Si se añade -validate, podemos saber cuáles enlaces están rotos o funcionales.

const stats = (links, validate) => {
  const linkStats = {};
  linkStats.total = links.length;
  const hrefFromLink = links.map(link => link.href);
  const uniqueLinks = new Set(hrefFromLink);
  linkStats.unique = uniqueLinks.size;
  let count = 0;
  if (validate && validate.validate) {
    links.forEach((link) => {
      if (link.statusTxt !== 'ok') {
        count++;
      }
    });
    linkStats.broken = count;
  }
  return linkStats;
};

// mdLinks controla la promesa a ejecutar según el parámetro recibido
// Recibe un path y un objeto a validar

const mdLinks = (path, validate) => new Promise((resolve, reject) => {
  if (validate && validate.validate) {
    readFile(path)
      .then((links) => {
        validateLinks(links)
          .then((validatedLinks) => {
            resolve(validatedLinks);
          });
      });
  } else {
    reject(console.log('error'));
  }
});

module.exports = {
  readFile,
  readDir,
  validateLinks,
  stats,
  mdLinks,
};
