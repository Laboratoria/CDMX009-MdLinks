const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound');
const marked = require('marked');

// readFile function. TODO: find text.

const readFile = path => new Promise((resolve, reject) => {
  const links = [];
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      const renderer = new marked.Renderer();
      renderer.link = function (href, text) {
        links.push({
          href,
          text,
          file: path,
        });
      };
      marked(data, { renderer: renderer });
      resolve(links);
    }
  });
});

// filehound encuentra el archivo según la extensión que le indique

const readDir = path => filehound.create()
  .paths(path)
  .ext('md')
  .find();

// validateLinks revisa el status de un link
// uno el status text con función Stats para contar los links
const validateLinks = links => Promise.all(links.map(link => new Promise((resolve, reject) => {
  fetch(link.href)
    .then((response) => {
      link.statusCode = response.status;
      link.statusTxt = 'ok';
      resolve(link);
    })
    .catch((error) => {
      if (error) {
        link.statusCode = 0;
        link.statusTxt = 'fail';
        resolve(link);
      } else {
        reject(error.code);
      }
    });
})));

// Stats permite saber el número total de links
// Si se añade --validate, podemos saber cuáles enlaces están rotos o funcionales.

const stats = (links, validate) => {
  const linkStats = {};
  linkStats.total = links.length;
  const hrefFromLink = links.map(link => { 
    return link.href;
  });
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

// mdLinks

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
