const through = require("through2");
const fs = require("fs");

const fileRead = fs.createReadStream(process.argv[2]);

let headers = null;
const join = (array) => array.join(",");
const transformWrite = function (buffer, encoding, next) {
  // set headers on first line
  const values = buffer.toString().split(",");
  if (!headers) {
    headers = [...values, "col3"];
    this.push(join(headers));
  } else {
    this.push(join([...values, values[0] + values[1]]));
  }
  next();
};

const transformEnd = function (next) {
  next();
};
const transform = through(transformWrite, transformEnd);

fileRead.pipe(transform).pipe(process.stdout);
