const { readLinks } = require("./extractLinks");
const { validateLinks } = require("./validateLinks");
const { statsLinks } = require("./stats");
const { validateAndStats } = require("./validateAndStats");

async function integrationValidate(pathOrFile) {
  let links = await readLinks(pathOrFile);
  let validate = await validateLinks(links);
  return validate;
}

async function integrationStats(pathOrFile) {
  let links = await readLinks(pathOrFile);
  let stats = await statsLinks(links);
  return stats;
}

async function integrationValidationStats(pathOrFile) {
  let links = await readLinks(pathOrFile);
  let validateStats = await validateAndStats(links);
  return validateStats;
}

module.exports = {
  integrationValidate,
  integrationStats,
  integrationValidationStats,
};
