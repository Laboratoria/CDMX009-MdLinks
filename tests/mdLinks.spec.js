const { readLinks } = require("../utils/extractLinks");
const { validateLinks } = require("../utils/validateLinks");

const path = require("path");

describe("readLinks", () => {
  it("Should be a function", () => {
    expect(typeof readLinks).toEqual("function");
  });

  it("it should filter Md file", () => {
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
    let links = ["https://google.com https://nodejs.org/"];
    let result = {
      URL: "https://google.com",
      text: "Sirve",
    };
    validateLinks(links);
    expect(typeof result).toBe("object");
  });
});
