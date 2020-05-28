var argvd = require('../index');

function anyfunction(a, b, array, param4, param5) {
  var result = argvd.desc(arguments); //List

  console.log("Arguments described:\n", JSON.stringify(result, null, 2));
  console.log("hasNumbers?: ", argvd.hasNumbers(arguments));
  console.log("hasString?: ", argvd.hasString(arguments));
  console.log("hasArray?: ", argvd.hasArray(arguments));
  console.log("hasFunction?: ", argvd.hasFunction(arguments));
  console.log("hasObject?: ", argvd.hasObject(arguments));
  console.log("Count: ", argvd.count(arguments));
}


var arr = [1, 2, 3, 4];

anyfunction(2, 4, arr, "Hello", function(){}, Object());
