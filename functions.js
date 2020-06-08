//Funcion para encontrar links en el archivo
const parseLinks = (data) => {
    const regExp = /\[(.+)\]\((.+)\)\g;
    const matchLinks = data.match(regExp);
    return matchLinks;
};

//Funcion que crea el objeto con texto y los enlances
const extracData = (mdLink) => {
    const regExp = /\[(.+)\]\((.+)\)\g;
    const obj = {};
    const groups = regExp.exec(mdLink);

    obj.text = groups[1].substring(0,50);
    obj.link = groups[2];
    return obj;
};
module.exports = {parseLinks, extracData};