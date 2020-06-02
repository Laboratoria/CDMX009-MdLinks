let { mdLinks } = require('./app.js')

mdLinks('ExamplesMd/file.md', { validate: true })
    .then(resp => console.log(resp))
    .catch(err => console.log('error:', err))



