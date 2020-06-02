const { absolutePath, archiveTrue, getLinks } = require('./src/mdlink.js');
const { validate } = require('./src/options.js');

const mdLinks = (path, options) => new Promise((resolve) => {
  const absolute = absolutePath(path);
 //console.log(absolute); 
  const checkpath = archiveTrue(absolute);
  //console.log(checkpath);  
  if (checkpath === true && options) {
    if (options.validate === true) {
      validate(absolute).then((res) => resolve(res));
    }
   } else {
    resolve(getLinks(absolute));
  }
  //console.log(checkpath); 
});
//mdLinks('./test/final.md', { validate: true }).then((res) => console.log(res));
//mdLinks('test', { validate: true }).then((res) => console.log(res));
module.exports = mdLinks; 
