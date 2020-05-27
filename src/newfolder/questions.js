const inquirer = require('inquirer');

module.exports = {
  askFor: () => {
    const questions = [
      {
        name: 'userfile',
        type: 'input',
        message: 'Please, type the relative path to your file:',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please type a valid path';
        },
      },
  },
];
return inquirer.prompt(questions);
},
askingValidate: () => {
const questions = [
  {
    name: 'validate',
    type: 'list',
    message: 'Do you want to know the validate links?',
    choices: ['yes', 'no']
    validate: function(value) {
      if (value.length && (value === "yes" || value === "no")) {
        return true;
      } else {
        return 'select valid answer';
      }
    }
  }
];
return inquirer.prompt(questions);
},
askingStats: () => {
const questions = [
  {
    name: "stats",
    type: "list",
    message: 'Do you want to know the stats?',
    choices: ['yes', 'no']
    validate: function(value) {
      if (value.length && (value === "yes" || value === "no")) {
        return true;
      } else {
        return "Porfavor ingresa una respuesta con y/n";
      }
    }
  }
];
return inquirer.prompt(questions);
}
};
};
