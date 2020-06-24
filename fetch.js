
const fetch = require('node-fetch');

let functionMockFech=elLink=>{
    let nueva=fetch(elLink)
      .then(respuesta=>{
       return(respuesta.status)
      }) 
      return nueva
  }
 
  module.exports={
      functionMockFech
  }
//vamos a testear el fetch
//lo que la funcion hace es ir al servidor a consultar si el link me encontro sirve