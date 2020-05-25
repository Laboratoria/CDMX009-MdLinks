//console.log("hola mundo")

const fs = require("fs")
const fetch = require('node-fetch');
//const readLine = require ("readline").createInterface({
    //input : process.stdin,
    //output : process.stdout
//})
//const check = require ("check-broken-links")
//const hljs   = require('highlight.js');
//const marked = require('marked');

let data = fs.readFileSync("new.md","utf-8");


function urlify(data) {
    let urlRegex = /(https?:\/\/[^\s)]+)/gi;
    return data.match(urlRegex)
   // console.log(url.length)
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
console.log(urlify(data).length);
console.log(urlify(data));
let work = 0;
    let broke = 0;

function isValidURL(){
    
    for(let i=0;i < urlify(data).length;i++){
        fetch(urlify(data)[i]).then(function(response) {
            //console.log(response.status +" "`${i}` ); // returns 200
            if (response.status == 200) {
                work += 1;
            }else if (response.status == 404) {
                broke +=1;
            }
            console.log("funciona:"+`${work}`+" " + "roto:"+`${broke}`)
          }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
          //console.log("work:"+`${work}`+" " + "broke:"+`${broke}`)

          //return "work:"+`${work}`+" " + "broke:"+`${broke}`
    }
   // console.log("work:"+`${work}`+" " + "broke:"+`${broke}`)
}
isValidURL()


/*
function isValidURL(){
    let work = 0;
    let broke = 0;
    
    for(let i=0;i < urlify(data).length;i++){
        fetch(urlify(data)[i]).then(function(response) {
            //console.log(response.status +" "`${i}` ); // returns 200
            if (response.status == 200) {
                work += 1;
            }else if (response.status == 404) {
                broke +=1;
            }
            //console.log("work:"+`${work}`+" " + "broke:"+`${broke}`)
          }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
          //console.log("work:"+`${work}`+" " + "broke:"+`${broke}`)

          //return "work:"+`${work}`+" " + "broke:"+`${broke}`
    }
    //console.log("work:"+`${work}`+" " + "broke:"+`${broke}`)
}
isValidURL()*/


//console.log(urlify(data)[1].status)
//console.log(urlify(data)[0].hostname);



/*function isValidURL(){
    for(let i=0;i < urlify(data).length;i++){

    }
    
} 
isValidURL()*/
/*
check( urlify(data), containsBroken ).then( brokenlinks => {
    console.log( brokenlinks )
    /*
    { top: [ { url: 'https://www.iAMbroken.com', err: [Object] } ],
      crawled:
       [ { link: 'https://iwasinside.com/iCONTAINbrokenlinks ',
           sources: [ 'https://iwasfoundinthislinkyou supplied.com', 'https://butalsointhisone.com' ] }
      ] },
      allchecked: { [ link: '', sources: [] ] } // This would obviously be populated
    
} )*/