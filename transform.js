const through = require("through2");
function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}
const stream = through(write);
process.stdin.pipe(stream).pipe(process.stdout);
