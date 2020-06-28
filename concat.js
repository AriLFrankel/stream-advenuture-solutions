// concat concatenates the chunks of a stream and passes the concatenated contents of the stream to a callback after the stream finishes
const concat = require("concat-stream");

process.stdin.pipe(
  concat(function (buffer) {
    process.stdout.write(buffer.toString().split("").reverse().join(""));
  })
);
