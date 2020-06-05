const { absolutePath, fileTrue, getLinks } = require('./src/mdlink.js');
const { validate } = require('./src/options.js');

const mdLinks = (path, options) => new Promise((resolve) => {
  const absolute = absolutePath(path);
  let checkpath = fileTrue(absolute);
  if (checkpath === true && options) {
    if (options.validate === true) {
      validate(absolute).then((res) => resolve(res));
    }
   } else {
    resolve(getLinks(absolute));
  }
});

module.exports = mdLinks; 
