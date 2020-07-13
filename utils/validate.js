const fetch = require('node-fetch')

let arrayAllLinks=[
    'https://google.com',
    'https://yahoo.com',
    'https://elgatogrisdemoni.com'
]

let validate=(arrayLinks)=>{
    arrayLinks.map(link=>
        fetch(link)
            .then(result=>{
                console.log(link,result.status)
            })
            .catch(e=>
                console.log(link,"error")
            )
    )
}

//validate(arrayAllLinks)
module.exports={
    validate
}