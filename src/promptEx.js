const inquirer = require('inquirer');
const { findFiles } = require('./app');


console.log('Bienvenid@ al verificador de links');

var questions = [
    {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false
    },
    {
        type: 'input',
        name: 'toBeDelivered',
        message: '¿Cual es el nombre de tu archivo?',
        findFile: function () { // ya retorna el docuemnto 
            let index = process.argv.indexOf('--file');
            let uri = process.argv[index + 1];
            if (index < 0 || !uri) return console.log("no hay archivo") // testing si mando vacio ???
            readFiles(uri) // asi es como brinco a la siguiente
            return uri
        },
    },
];

inquirer.prompt(questions).then(answers => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
});