//Este archivo retorna links
const fs = require("fs");

function readLinks(fileMd) {
  let markdown = fs.readFileSync(fileMd, "utf8");
  let regExpres = /https?:\S+\w/g;
  let foundLink = markdown.match(regExpres);
  return foundLink;
}

module.exports = {
  readLinks,
};
