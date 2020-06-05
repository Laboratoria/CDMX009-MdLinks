const path = require('path');
const fs = require('fs');
const marked = require('marked');

const fileTrue = (file) => fs.existsSync(file);

const absolutePath = (file) => {
  if (path.isAbsolute(file) === true) {
    return file;
  } 
  return (path.resolve(file));
};

const isDirec = (file) => fs.lstatSync(file).isDirectory();

const walkDir = (file) => {
  let arrayFile = [];
  if (!isDirec(file)) {
    arrayFile.push(file);
  } else {
    const readDirectory = fs.readdirSync(file);
    readDirectory.map((read) => {
      const next = path.join(file, read);
      let result= (isDirec(next)) ? arrayFile = arrayFile.concat(walkDir(next)) : arrayFile.push(next);
      return result
    });
  }
  return arrayFile;
};

const mdFilter = (fileArr) => {
  const newArrayFileMd = [];
  fileArr.forEach((item) => {
    if (path.extname(item) === '.md') {
      return newArrayFileMd.push(item);
    }
  });
  return newArrayFileMd;
};

const readMD = (file) => fs.readFileSync(file, 'utf-8');

const getLinks = (file) => {
  const mdFiles = walkDir(file);
  const arrayMd = mdFilter(mdFiles);
  const myRen = new marked.Renderer();
  const links = [];
  arrayMd.forEach((file) => {
    myRen.link = (href, title, text) => {
      links.push({
        href,
        text,
        file,
      });
    };
    marked(readMD(file), { renderer: myRen });
  });
  return (links);
};


module.exports = {
  fileTrue, 
  absolutePath, 
  getLinks,
   walkDir
}; 