const { validateFile, 
        readFile, 
        getLinks, 
        validateAndStats, 
        statsLinksValidate, 
        onlyValidate, 
        onlyStats } = require('../index.js')


        
describe('Probar que el archivo tenga una terminación .md', () => {
        test('Prueba de extensión .md', () => {
                expect(validateFile('path.extname(file)')).toBe('.md')
        })
})

//Probar que read file devuelve un string
/* describe('Comprobar cadena de texto', () => {
        test('El texto dede ser un string')
        test('El texto dede de contener los links obtenidos con la expresión regular').toMatch(/(https?:)([\w\.\/\-\#\?\=\&]+)/g)
}) */
/* 
describe('Comprobar cadena de texto', () => {
        test(readFile).toMatch(/(https?:)([\w\.\/\-\#\?\=\&]+)/g)
})

//Comprobar los links

describe('Comprobando validaciond e links', () => {
        test('REalizando peticiones', () => {
                validateAndStats().then(data => {
                        expect (data).toBeGreaterThan(0);
                });
        });
});  */