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
    ];
  },
};
