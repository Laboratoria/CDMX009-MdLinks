exports.desc = function (argv) {
  if (argv.length == 0) {
    return "No arguments";
  } else {
    var descr = [];
    for (var prop in argv) {
      descr.push({
        key: prop,
        value: argv[prop],
        type: type(argv[prop])
      });
    }
    return descr;
  }
};

exports.count = function (argv) {
  return argv.length;
};

exports.hasNumbers = function (argv) {
  return this.has(argv, 'number');
};

exports.hasString = function (argv) {
  return this.has(argv, 'string');
};

exports.hasArray = function (argv) {
  return this.has(argv, 'array');
};

exports.hasFunction = function (argv) {
  return this.has(argv, 'function');
};

exports.hasObject = function (argv) {
  return this.has(argv, 'object');
};

exports.has = function (argv, type_) {
  if (argv.length == 0) {
    return false;
  } else {
    for (var prop in argv) {
      if (type(argv[prop]) == type_) {
        return true;
      }
    }
    return false;
  }
};

function type(content) {
  var typ = typeof content;
  switch (typ) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'number':
    case 'function':
      return typ;
      break;
    case 'object':
      var obj = Object.prototype.toString.call(content);
      switch (obj) {
        case "[object Timestamp]":
          return "timestamp"
          break;
        case "[object Date]":
          return "date"
          break;
        case "[object Double]":
          return "double"
          break;
        case "[object Array]":
          return "array"
          break;
        case "[object Object]":
          return "object"
          break;
        default:
          return "Object";
          break;
      }
    default:
      return typeof content;
  }
}
