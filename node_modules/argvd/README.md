# Argvd
Argvd, describe all parameters of a function.

## Installation ##

```bash
$> npm install argvd --save
```

## Examples ##

```js
var argvd = require('argvd');

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

/*
Arguments described:
 [
  {
    "key": "0",
    "value": 2,
    "type": "number"
  },
  {
    "key": "1",
    "value": 4,
    "type": "number"
  },
  {
    "key": "2",
    "value": [
      1,
      2,
      3,
      4
    ],
    "type": "array"
  },
  {
    "key": "3",
    "value": "Hello",
    "type": "string"
  },
  {
    "key": "4",
    "type": "function"
  },
  {
    "key": "5",
    "value": {},
    "type": "object"
  }
]
hasNumbers?:  true
hasString?:  true
hasArray?:  true
hasFunction?:  true
hasObject?:  true
Count:  6
*/
```
