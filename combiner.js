const combine = require("stream-combiner");
const through = require("through2");
const zlib = require("zlib");
const split = require("split2");
const aggregated = {};
let genre = null;
// transform stream
const aggregate = through(
  function (buf, _, cb) {
    let parsed;
    try {
      parsed = JSON.parse(buf.toString());
    } catch (e) {
      console.error("e", e);
    }
    const name = parsed.name;
    if (parsed.type === "genre") {
      genre = name;
    }
    if (parsed.type === "book") {
      aggregated[genre] = (aggregated[genre] || []).concat(name);
    }
    cb();
  },
  function (next) {
    this.push(JSON.stringify(aggregated));
    next();
  }
);

module.exports = function () {
  return combine(
    split(), // split stream by end of line
    aggregate, // do work
    zlib.createGzip() // writable stream to create a gzip
  );
};
