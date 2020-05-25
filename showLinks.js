const { validate } = require('./validate');
function showLinks (file) {
    let regEx= /\bhttps?:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_&#\/]+)([.a-z0-9]+)/gi;
    let result = file.match(regEx);
    validate(result)
}

module.exports = {
    showLinks,
}