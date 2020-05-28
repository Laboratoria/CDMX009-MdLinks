const findLinks = (datos) => {
    let joinArray = []
    return new Promise((resolve) => {
        let regularE = /(http|https):\/\/.*\)/gi;
        let noStr = datos;
        let str = noStr.toString();
        let myArray;
        while ((myArray = regularE.exec(str)) !== null) {

            // let joinData= myArray[0].replace(")", " ")
            let joinData = {
                link: myArray[0].replace(")", " "),

            };
            joinArray.push(joinData);
        }
        //console.log(joinArray)
        resolve(joinArray);
        console.log(typeof joinArray)

    })
}

module.exports = findLinks;