/* if (textLink != null) {
            textLink.forEach(text => {
                //console.log(text);
                textUrls = text
                console.log(textUrls);
            });
        } */
if (trueLink === true) {
    /* let arrLinks = [elementFile]
    console.log(arrLinks.length); */


    let urls = elementFile
    console.log(`${uri} ${urls}`);
    //verifyLinks(urls)
}
function verifyLinks(urls) {
    let protocol = urls.slice(0, 5)
    //console.log(protocol);

    if (protocol === 'https') {
        https.get(urls, (res) => {
            //console.log(res);
            let statusUrl = res.statusCode
            //console.log('statusCode:', statusUrl);
            console.log(statusUrl);


            if (statusUrl === 400) {
                //console.log('error', res.href);
                let result = `${uri} ${urls} fail ${statusUrl}`
                showLinks(result)
            } else {
                let result = `${uri} ${urls} ok ${statusUrl}`
                showLinks(result)
            }
            //showLinks(result)
            //console.log('headers:', res.headers);

            /* res.on('data', (d) => {
                process.stdout.write(d);
            }); */
        })

    } else {
        http.get(urls, (res) => {
            //console.log(res);
            let statusUrl = res.statusCode
            //let linkRes = res.href
            //console.log('statusCode:', statusUrl);
            if (statusUrl === 400) {
                let result = `${uri} ${urls} fail ${statusUrl}`
                showLinks(result)
            } else {
                let result = `${uri} ${urls} ok ${statusUrl}`
                showLinks(result)
            }
            //console.log('headers:', res.headers);
            /* res.on('data', (d) => {
                process.stdout.write(d);
            }); */
        })
    }

}

}

function showLinks(result) {
    console.log(result);
    let space = " "
    let cutResult = result.split(space)
    statsLinks(cutResult)

    /* console.log(statusUrl);
    console.log(linkRes); */
}
function showLinks(result) {
    console.log(result);

    /* console.log(statusUrl);
    console.log(linkRes); */


}


< !-- - [Node.js](https://nodejs.org/es/)
    -[Markdown](https://es.wikipedia.org/wiki/Markdown)
        -[Node.js](https://nodejs.org/es/) -->