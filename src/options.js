const fetch = require('node-fetch');
const { getLinks } = require('./mdlink.js');

const validate = (archive) => {
  const linksMd = getLinks(archive);
  const validateLinks = linksMd.map((element) => new Promise((resolve) => (
    fetch(element.href)
      .then((res) => {
        const obj = {
          href: element.href,
          text: element.text,
          file: element.file,
        };
        if (res.status >= 200 && res.status < 400) {
          obj.status = res.status;
          obj.message = res.statusText;
          resolve(obj);
        } else {
          obj.status = res.status;
          obj.message = 'Fail';
          resolve(obj);
        }
      })
  )));
  return Promise.all(validateLinks);
};

validate('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\read.md')
.then((res) => console.log (res))
.catch((err) => console.log("NO SE PUEDE VERIFICAR EL STATUS DE LOS LINKS, VERIFICA TU ARCHIVO"));

const getLinksStats = (path) => new Promise((resolve) => {
  validate(path)
    .then((response) => {
      const totalLinks = response.length;
      const uniqueLinks = [...new Set(response.map((response) => response.href))].length;
      resolve(`Total : ${totalLinks} Unique: ${uniqueLinks}`);
    });
});
getLinksStats('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\read.md')
.then((res) => console.log (res))
.catch((err) => console.log("NO SE PUEDE HACER CONTEO LINKS, VERIFICA TU ARCHIVO"));

const getBrokenLinksStats = (path) => new Promise((resolve) => {
  validate(path)
    .then((response) => {
      const brokenLinks = response.filter((element) => element.message === 'Fail').length;
      resolve(`Broken: ${brokenLinks}`);
    });
});


getBrokenLinksStats('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\read.md')
 .then((res) => (res));
 
module.exports = { validate, getLinksStats, getBrokenLinksStats };