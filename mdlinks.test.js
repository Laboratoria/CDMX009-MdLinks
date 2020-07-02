describe.only("Principal MDlinks functions", () => {
  let mark = `Dentro de una comunidad de código abierto, nos han propuesto crear una
    herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
    en formato markdown, para verificar los links que contengan y reportar
    algunas estadísticas.`;
  const getLinks = (string) => {
    let regEx = /https?:\S+\w/gi;
    let links = string.match(regEx);
    return links;
  };

  test("evaluates the function return a value", () => {
    expect(getLinks(mark)).toEqual(["https://nodejs.org"]);
  });

  test("Evaluates getLinks return an object", () => {
    let obj = getLinks(mark)
    expect(typeof obj).toEqual("object");
  });

});
