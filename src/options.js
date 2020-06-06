const fetch = require('node-fetch');
const { getLinks } = require('./mdlink.js');

const validate = (archive) => {
  const linksMd = getLinks(archive);
  const validateLinks = linksMd.map((element) => new Promise((resolve) => (
    fetch(element.href)
      .then((res) => {
        const objLink = {
          href: element.href,
          text: element.text,
          file: element.file,
        };
        if (res.status >= 200 && res.status < 400) {
          objLink.status = res.status;
          objLink.message = res.statusText;
          resolve(objLink);
        } else {
          objLink.status = res.status;
          objLink.message = 'Fail';
          resolve(objLink);
        }
      })
  )));
  return Promise.all(validateLinks);
};

const getLinksStats = (path) => new Promise((resolve) => {
  validate(path)
    .then((response) => {
      let totalLinks = response.length;
      let uniqueLinks = [...new Set(response.map((response) => response.href))].length;
      resolve(`Total : ${totalLinks} Unique: ${uniqueLinks}`);
    });
});

const getBrokenLinksStats = (path) => new Promise((resolve) => {
  validate(path)
    .then((response) => {
      const brokenLinks = response.filter((element) => element.message === 'Fail').length;
      resolve(`Broken: ${brokenLinks}`);
    });
});

module.exports = { 
  validate, 
  getLinksStats, 
  getBrokenLinksStats 
};