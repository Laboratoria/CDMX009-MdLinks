#!/usr/bin/env node
const colors = require('colors');
const path = require('path');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');

let inputDoc = process.argv[2];
let options = process.argv[3];

const validateArgvExist = (inputFile) => {
    if (inputFile === undefined) {
        console.log('You need to enter a correct filename to continue'.brightRed);
    } else validateExt(inputFile);
};

const validateExt = (inputFile) => {
    let mdExt = path.extname(inputFile);
        if (mdExt === '.md') {
            readFiles(inputFile);
        } else console.log('invalid format, only MD files are supported, try again'.brightRed); 
};

const readFiles = (inputFile) => {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } selectOption(data);
    });
};

const selectOption = async (inputFile) => {
    let links = markdownLinkExtractor(inputFile);
    switch (options) {
        case '--validate': {
            validateLinks(links);
            break;
        }
        case '--stats': {
            stats(links);
            break;
        }
        case '--validate--stats':
        case '--stats--validate': {
            await stats(links);
            await validateLinks(links);
            break;
        }
        default: {
            getLinks(links);
            break;
        }
    }
};

const getLinks = (links) => {
    links.forEach(link => {
        console.log('Path: '.brightBlue + path.resolve(inputDoc).brightWhite + ' Link: '.brightBlue + link.brightWhite)
    })
}

const validateLinks = (links) => {
    console.log('VALIDATE'.rainbow.bold)
    links.forEach(link => {
        fetch(link).then((res) => {
            console.log('STATUS: '.brightBlue + `${res.status} ${res.statusText}`.brightGreen + ' - URL: '.brightBlue + res.url.brightWhite);
        }).catch((err) => console.log('STATUS: '.brightBlue + '404 Fail'.red + ' - URL: '.brightBlue + link.brightWhite))      
    });
}

const stats = async (links) => {
    console.log('STATS'.rainbow.bold)
    let okLinks = []
    let brokenLinks = []
    console.log('Total: '.brightMagenta + links.length)
    let unique = links.filter((item, index, array) => {
        return array.indexOf(item) === index;
      })
    const urls = links.map(async url => {
      try {
        const response = await fetch(url)
        if (response.status < 400) {
          okLinks.push(response.url)
        } else {
          brokenLinks.push(response.url)
          await reject(response.statusText)
        }
      } catch (error) {
        brokenLinks.push(url)
      }
    })
    await Promise.all(urls)
    console.log('Unique Links: '.brightYellow + unique.length);
    console.log('Ok Links: '.brightGreen + okLinks.length);
    console.log('Broken Links: '.brightRed + brokenLinks.length);
}

validateArgvExist(inputDoc);
