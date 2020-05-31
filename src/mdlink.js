const path = require('path');
const fs = require('fs');
const glob = require('glob');
const marked = require('marked');

const archiveTrue = (archive) => fs.existsSync(archive);

const absolutePath = (archive) => {
  if (path.isAbsolute(archive) === true) {
    return archive;
  } return (path.resolve(archive));
};
//absolutePath('./test/read.md');

const getDirectory = (src) => new Promise((resolve, reject) => {
  glob(`${src}/**/*.md`, (err, files) => {
    if (err) {
      reject(err);
    } resolve(files);
  });
});
(getDirectory('./test').then((files) => (files)));


const getLinks = (file) => {
  const mdFiles = fs.readFileSync(file).toString();
  const myRen = new marked.Renderer();
  const links = [];

  myRen.link = (href, title, text) => {
    links.push({
      href,
      text,
      file,
    });
  };
  marked(mdFiles, { renderer: myRen });
  return (links);
};
//console.log(getLinks('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md'));

module.exports = {
  archiveTrue, absolutePath, getLinks, getDirectory, 
};