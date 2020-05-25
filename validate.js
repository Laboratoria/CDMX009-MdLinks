const url = require('url');
function validate (links){
    links.forEach(link => {
        console.log(url.parse(link));
    });
}
module.exports = {
    validate,
}