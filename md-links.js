#!/usr/bin/env node
const fs = require("fs"); // lee los archivos
const marked = require("marked"); // extrae los links y los mete en array
const fileHound = require("filehound"); // lee directory
const path = require("path");
let links = [];

//Si es un archivo o ruta, llama a la función correspondiente
const mdLinks = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!path || !options) {
      throw new Error("INGRESA UNA RUTA VÁLIDA!");
    }

    fs.stat(path, (error, stats) => {
      if (error) {
        throw new Error("Ingresa un archivo/ruta existente");
      }
      if (stats.isFile()) {
        readLinks(path)
          .then((url) => {
            resolve(url);
          })
          .catch((err) => {
            reject(err);
          });
      }
      if (stats.isDirectory()) {
        readRoute(path)
          .then((res) => {
            res.forEach((links) => {
              resolve(readLinks(links));
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};

//lee links convertida en promesa
const readLinks = (files) => {
  return new Promise((resolve, reject) => {
    if (path.extname(files) != ".md") {
      throw new Error("Debes escoger un archivo con extensión MD");
    }

    fs.readFile(files, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      //console.log("Solo los links de ese archivo", data);
      links = [];

      const renderer = new marked.Renderer();

      renderer.link = (href, title, text, ruta) => {
        links.push({
          href: href,
          text: text,
          ruta: files,
        });
        //console.log("links encontrados", links)
      };
      marked(data, { renderer: renderer });
      resolve(links);
    });
  });
};

//lee directorios
const readRoute = (route) => {
  return new Promise((resolve, reject) => {
    fileHound
      .create() //sólo lee directorios
      .discard("node_modules")
      .paths(route)
      .ext("md")
      .find()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = mdLinks;
