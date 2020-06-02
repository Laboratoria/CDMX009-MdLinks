let { mdLinks } = require('../app.js')

mdLinks('mdExample/myFile.md', { validate: true }).then(resp => console.log(resp)).catch(err => console.log('error:', err))