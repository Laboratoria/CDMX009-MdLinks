const path = require('path');
const fs = require('fs');
const marked = require('marked');

const archiveTrue = (archive) => fs.existsSync(archive);

const absolutePath = (archive) => {
  if (path.isAbsolute(archive) === true) {
    return archive;
  } 
  return (path.resolve(archive));
};
//absolutePath('./test/read.md');

const isDirec = (archive) => fs.lstatSync(archive).isDirectory();
//console.log(isDirec('test/test-API/other.md'));
//console.log(isDirec('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test'));

const walkDir = (archive) => {
  let arrayFile = [];
  if (!isDirec(archive)) {
    arrayFile.push(archive);
  } else {
    const readDirectory = fs.readdirSync(archive);
    readDirectory.map((read) => {
      const next = path.join(archive, read);
      return (isDirec(next)) ? arrayFile = arrayFile.concat(walkDir(next)) : arrayFile.push(next);
    });
  }
  return arrayFile;
};
//console.log(walkDir('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test'));

const mdFilter = (fileArr) => {
  const newArrayFileMd = [];
  fileArr.forEach((item) => {
    if (path.extname(item) === '.md') {
      return newArrayFileMd.push(item);
    }
  });
  return newArrayFileMd;
};
//console.log(mdFilter(['test/out.md', 'test/test-API/other.md', 'test/test-API/prueba.js']));

const readMD = (file) => fs.readFileSync(file, 'utf-8');
//console.log(readMD('test/final.md')); 

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

//console.log(getLinks('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test'));

module.exports = {
  archiveTrue, absolutePath, getLinks, walkDir
}; 