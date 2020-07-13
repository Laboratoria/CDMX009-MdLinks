// #1/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const promisefs = require('fs').promises;
const path = require('path');
const args = process.argv;
const index = args.indexOf('--file');
const uri = args[index + 1];
const options = args[index + 2];
const data = fs.readFileSync(uri, 'utf-8')

const isDirectory = (userInput) => {
  try {
    const stat = fs.lstatSync(userInput);
    return stat.isDirectory();
  } catch (err) {
    return false;
  };
};

const isFile = (userInput) => {
  try {
    const stat = fs.lstatSync(userInput);
    return stat.isFile();
  } catch (err) {
    return false;
  };
};

const walkTree = (dirURI) => {
  const files = fs.readdirSync(dirURI);
  const mdFiles = files.map(file => {
    if (file) {

    } else {

    };
  })
  
  return mdFiles;
}

//walkTree("./test/testdir");

const getFiles = (uri) => {
  if (isDirectory(uri) === true) {
    return walkTree(uri);
  }
  if (isFile(uri) === true) {
    [{
      uri: uri,
      content: readFile(uri),
    }];
  }
  return 
};



// getFiles(data);

const isMarkDown = (file) => {
    const fileExt = path.extname(uri);
    console.log(fileExt)
    if (fileExt != '.md') {
        console.log('Invalid file type');
        return false;
    }
    else {
        return data;
    };
};

const getLinks = (file) => {

};

const linkStatus = (links) => {

};

const extractLinks = (data) => {
  const getLinks = /((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+/g;
  const getLinkName = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
  const toString = data.toString();
  const linkFilter = toString.match(getLinks);
  const linkName = toString.match(getLinkName);
  
};

const mdlink = {
    isDirectory, isFile, isMarkDown, getFiles, getLinks, linkStatus, walkTree
};

module.exports = {mdlink};