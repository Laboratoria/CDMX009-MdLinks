// Importar modulo file system

const fs = require("fs");

module.exports = (filePath, options) => {
  return new Promise((resolve, reject) => {
    //lee el archivo
    fs.readFile(filePath, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
    });
  });
};
