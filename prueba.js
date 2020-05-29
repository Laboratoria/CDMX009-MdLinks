const https = require('https');
function validate (links){
    console.log(links.length)
    // let results = []
    links.forEach(link => {
        // if( link <= 10) return
            https.get(link, (res) => {
                 // En vez de 10 cómo cuento los links totales
                console.log(res.statusCode + link)
                // if (res.statusCode !== 200){
                //     results.push({
                //         link,
                //         status: 404 + " Break link",
                //         isOk:false
                // })
                // }   
                // // console.log('statusCode:', res.statusCode);
                // else{
                //     results.push({
                //         link,
                //         status: 200 + " Ok",
                //         isOk:true
                //     })    
                // }
            }).on("error", e=>{})

    });
    // console.log(results)
    return results // esto puede fallar porque el push vive dentro de un callback
// 1.- probar este codigo y ver que resulta
// 2.- peensar cómo podemos esperar a que los links se comprueben antes del return results
// 3.- leer la docu de https para ver si existe un metodo sync
// 4.- funcionarioa si uso async /await ?
}
