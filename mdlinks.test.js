describe.only("Las funciones principales de mdlinks", () => {
  let mark = `Dentro de una comunidad de código abierto, nos han propuesto crear una
    herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
    en formato markdown, para verificar los links que contengan y reportar
    algunas estadísticas.`;
  const getLinks = (string) => {
    let regEx = /https?:\S+\w/gi;
    let links = string.match(regEx);
    return links;
  };

  test("Evalua que la funcion retorne un valor", () => {
    expect(getLinks(mark)).toEqual(["https://nodejs.org"]);
  });

  test("Evalua getlinks retorne un objeto", () => {
    let arreglo = getLinks(mark)
    expect(typeof arreglo).toEqual("object");
  });

});
