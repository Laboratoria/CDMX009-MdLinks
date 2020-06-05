const chalk = require('chalk');
const { showValidate,
    showStats,
    showValidateStats } = require('./utils/mdLinks');


function mdLinks(path, validate, stats){
       
        
       if(validate && !stats) {
            console.log(chalk.cyan.bold('Option: Validate'));
            showValidate(path);
            return;
        }else if (stats && !validate) {    
            console.log(chalk.cyan.bold('Option: Stats'));
            showStats(path);
            return;
        }else if (validate && stats) {    
            console.log(chalk.cyan.bold('Option: ValidateStats'));
            showValidateStats(path);
            return;
        }else {
            console.log('Unrecognized command line');
        }    
   
}

//mdLinks("/home/laboratoria159-pm/CDMX009-MdLinks/file1.md", {validate:true}, {stats:true});