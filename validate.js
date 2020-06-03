const fetch = require('node-fetch')

let validated = [];

function validate(links){
    let promises = links.map(link=>fetch(link)
                                    .then(res=> validated.push(({url: link,text:res.statusText,status:res.status, boolean:true })))
                                    .catch(err=>validated.push(({url: link,status:"Error",text:err.message, boolean: false})))) 
    return Promise.all(promises)
        .then(results=>{
            console.log("total:",validated.length);
            console.log("Buenos: ",validated.reduce((acc, el)=>{
                if(el.status<400) return acc+=1
                return acc
            },0))
            console.log("Malos: ",validated.reduce((acc, el)=>{
                 if(el.status>=400 || el.status==="Error") return acc+=1
                 return acc
             },0))
             console.log(validated)
          return results
        })
}

module.exports = {
    validate,
}