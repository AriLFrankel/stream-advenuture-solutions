const trumpet = require("trumpet");
const through = require("through2");
const tr = trumpet();
tr.pipe(process.stdout);

tr.selectAll(".loud", function (el) {
  const elStream = el.createStream();
  elStream
    .pipe(
      through(function (buf, _, next) {
        this.push(buf.toString().toUpperCase());
        next();
      })
    )
    .pipe(elStream);
});
process.stdin.pipe(tr);
