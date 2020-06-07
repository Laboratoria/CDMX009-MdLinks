const chalk = require('chalk');
const { showValidate,
    showStats,
    showValidateStats } = require('./utils/mdLinks');


function mdLinks(path, opts){
        
        if(opts.validate == true && opts.stats == false) {
            console.log(chalk.cyan.bold('Option: Validate'));
            showValidate(path);
            return;
        }else if (opts.validate == false && opts.stats == true) {    
            console.log(chalk.cyan.bold('Option: Stats'));
            showStats(path);
            return;
        }else if (opts.validate == true && opts.stats == true) {    
            console.log(chalk.cyan.bold('Option: ValidateStats'));
            showValidateStats(path);
            return;
        }else {
            console.log('Unrecognized command line');
        } 
}


module.exports = {
    mdLinks
}