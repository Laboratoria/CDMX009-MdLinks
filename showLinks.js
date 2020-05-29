const { validate } = require('./validate');
function showLinks (file) {
    let arrayLinks= [];
    let regEx= /\bhttps:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_&#\/]+)([.a-z0-9]+)/gi;
    let result = file.match(regEx);
    // console.log(result)
    validate(result)
}

module.exports = {
    showLinks,
}