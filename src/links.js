const chalk = require('chalk');
const figlet = require('figlet');


console.log(chalk.cyan(figlet.textSync('md-links')));

const inquirer = require('inquirer');
const questions = [
  {
    type: 'input',
    name: 'select-file',
    message: 'What do you want to analize?',
  },
  {
    type: 'checkbox',
    name: 'many-options',
    message: 'What do you want to know about this file?',
    choices: ['links', 'stats', 'validate'],
  },
];

inquirer.prompt(questions).then
