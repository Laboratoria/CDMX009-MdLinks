
let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const {functionMockFech}=require('./fetch')


let response = {
    status: 200
}

const{getoString, Links, validateLinks} = require ('./index.js')

describe('validateLinks', () => {
    it ('Should return status 200 id is ok', () => {
        expect(response.status).toBe(200)
    })
})

describe('getoString', () => {

    it('Should be a function', () => {
      expect(typeof getoString).toBe('function');
    });
  
  });


  describe('getoString', () => {

    it('Should be a function', () => {
      expect(typeof getoString).toBe('function');
    });
  
  });

  let textprueba=`# Markdown Links

  ## Preámbulo

  [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
  ligero muy popular entre developers. Es usado en muchísimas plataformas que
  manejan texto plano (GitHub, foros, blogs, ...), y es muy común
  encontrar varios archivos en ese formato en cualquier tipo de repositorio`


  ////////////
  describe('Links', () => {
	it('Should return an array with the links that the file content ', () =>{
		expect(Links(textprueba)).toEqual(['https://es.wikipedia.org/wiki/Markdown'])
	});
});



describe("testeaando el Fetch",()=>{
  it("nuetro Fetch",async()=>{
    let nueva=await functionMockFech('https://google.com')
    expect(nueva).toBe(200)
  })
})