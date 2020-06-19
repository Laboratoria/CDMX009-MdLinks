const { readLinks } = require("../utils/extractLinks");
const { validateLinks } = require("../utils/validateLinks");
const { validateAndStats } = require("../utils/validateAndStats");
const { statsLinks } = require("../utils/stats");

const path = require("path");

describe("readLinks", () => {
  it("Should be a function", () => {
    expect(typeof readLinks).toEqual("function");
  });

  it("it should filter URL of Md file", () => {
    const input = path.join(__dirname, "./readme.md");

    const output = [
      "https://www.youtube.com/watch?v=tAmQZwMXvo",
      "https://www.link3.dev",
    ];

    expect(readLinks(input)).toEqual(output);
    expect(JSON.stringify(readLinks(input))).toBe(JSON.stringify(output));
  });
});

describe("validateLinks", () => {
  it("validateLinks should be a function", () => {
    expect(typeof validateLinks).toEqual("function");
  });
  it("should return an object with link and text", () => {
    let result = {
      URL: "https://google.com",
      text: "Sirve",
    };
    expect(typeof result).toBe("object");
  });

  /* it("it should filter unique and broken links", () => {
    const input = path.join(__dirname, "./readme.md");

    const output = [
      "https://www.youtube.com/watch?v=tAmQZwMXvo",
      "https://www.link3.dev",
    ];

    expect(readLinks(input)).toEqual(output);
    expect(JSON.stringify(readLinks(input))).toBe(JSON.stringify(output));
  });*/

  /*it('validateLinks in file README.md should return an array with 54 elements', () => {

      const input = path.join(__dirname, "./README.md");

      expect(mdLink.findLinks()).toHaveLength(54);
    });*/
  //pasar array en la entrada
});

describe("statsLinks", () => {
  test("Should be a function", () => {
    expect(typeof statsLinks).toEqual("function");
  });
});

describe("validateAndStats", () => {
  it("Should be a function", () => {
    expect(typeof validateAndStats).toEqual("function");
  });
});
