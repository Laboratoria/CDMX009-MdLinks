const path = require('path');
const fs = require('fs');
const marked = require('marked');

let fileTrue = (fileTrue) => fs.existsSync(fileTrue);

const absolutePath = (fileTrue) => {
  if (path.isAbsolute(fileTrue) === true) {
    return fileTrue;
  } 
  return (path.resolve(fileTrue));
};

const isDirec = (fileTrue) => fs.lstatSync(fileTrue).isDirectory();

const walkDir = (fileTrue) => {
  let arrayFile = [];
  if (!isDirec(fileTrue)) {
    arrayFile.push(fileTrue);
  } else {
    const readDirectory = fs.readdirSync(fileTrue);
    readDirectory.map((read) => {
      const next = path.join(fileTrue, read);
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