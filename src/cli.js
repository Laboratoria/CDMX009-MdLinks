const figlet = require('figlet');

figlet('Howdy', (err, result) => {
    console.log(err || result)
});
 