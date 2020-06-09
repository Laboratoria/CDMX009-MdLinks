const options = {
    path: {
        demand: true,
        alias: 'p',
        default: "README.md"
    },
}
const argv = require('yargs')
    .command('validate', 'With this command you will be able to see the result of the validated links inside a Markdown File', options)
    .command('stats', 'With this command you will be able to know the stats of the links(total, broken and useful', options)
    .command('validateStats', 'With this command you will be able to know both, the validated links and the stats', options)
    .help()
    .argv;

module.exports = {
    argv
}