const fetch = require('node-fetch')
const { stats } = require('./stats')
const { validate } = require('./validate')

function array(links){
    let validated = [];
    let promises = links.map(link=>fetch(link)
                                    .then(res=> validated.push(({url: link,text:res.statusText,status:res.status, boolean:true })))
                                    .catch(err=>validated.push(({url: link,status:"Error",text:err.message, boolean: false})))) 
    return Promise.all(promises)
        .then(
            results => {
                validate(validated)
                stats(validated)
            return results
        }
        )
}


module.exports = {
    array,
}