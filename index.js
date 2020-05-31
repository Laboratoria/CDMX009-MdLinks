const { absolutePath, archiveTrue, getLinks } = require('./src/mdlink.js');
const { validate } = require('./src/options.js');

const mdLinks = (path, options) => new Promise((resolve) => {
  const absolute = absolutePath(path);
  const checkpath = archiveTrue(absolute);
   if (checkpath === true && options) {
    if (options.validate === true) {
      validate(absolute).then((res) => resolve(res));
    }
   } else {
    resolve(getLinks(absolute));
  }
  //console.log(checkpath); 
});
mdLinks('./test/read.md').then((res) => console.log(res));

module.exports = mdLinks; 
