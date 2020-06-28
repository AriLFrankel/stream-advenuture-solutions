const through = require("through2");
const split = require("split");

let even = false;
const evenUpper = through(function write(buffer, encoding, next) {
  if (even) {
    this.push(`${buffer.toString().toUpperCase()}\n`);
  } else {
    this.push(buffer.toString().toLowerCase() + "\n");
  }
  even = !even;
  next();
});
process.stdin.pipe(split()).pipe(evenUpper).pipe(process.stdout);
