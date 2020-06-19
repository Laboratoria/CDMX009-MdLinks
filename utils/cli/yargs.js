const options = {
  path: {
    demand: true,
    alias: "p",
  },
};
const argv = require("yargs")
  .command("validate", "Ayuda del validate esto valida links", options)
  .command("stats", "Ayuda del stats esto genera estadisticas", options)
  .command("validatestats", "Valida y hace estadisticas", options)
  .help().argv;

module.exports = {
  argv,
};
