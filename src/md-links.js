const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound');
const marked = require('marked');

// readFile get the links from .md file, creates a promise
// to read and save the links into an array
// marked save the content as a string
// resolved promise gets the new links array

const readFile = path => new Promise((resolve, reject) => {
  const links = [];
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      const renderer = new marked.Renderer();
      renderer.link = function (href, title, text) {
        links.push({
          href,
          text,
          file: path,
        });
      };
      marked(data, { renderer });
      resolve(links);
    }
  });
});

// filehound finds a file with the solicited extension (.md)

const readDir = path => filehound.create()
  .paths(path)
  .ext('md')
  .find();

// validateLinks add the response status from a link.
// with map, every link gets it's status and text status.

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

// stats calculates how many links a file has
// save the info in linkStats, used length to know the total.
// I used Set to get the unique links apart from the total
// If the statusTxt is different from 'ok', it count as a broken link

const stats = (links, validate) => {
  const linkStats = {};
  linkStats.total = links.length;
  const hrefLinks = links.map((link) => {
    return link.href;
  });
  const uniqueLinks = new Set(hrefLinks);
  linkStats.unique = uniqueLinks.size;
  let count = 0;
  if (validate && validate.validate) {
    links.forEach((link) => {
      if (link.statusTxt !== 'ok') {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    linkStats.broken = count;
  }
  return linkStats;
};

// mdLinks connects the upper functions and interacts with index.js

const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
    if (validate && validate.validate) {
      readFile(path)
        .then((links) => {
          validateLinks(links)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            });
        });
    } else {
      readFile(path)
        .then((links) => {
          resolve(links);
        });
    }
  });
};

module.exports = {
  readFile,
  readDir,
  validateLinks,
  stats,
  mdLinks,
};
