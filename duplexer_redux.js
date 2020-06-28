const duplexer = require("duplexer2");
const through = require("through2");

module.exports = function (counter) {
  const counts = {};
  const writeable = through(
    function write(buf, _, next) {
      counts[buf.short] = (counts[buf.short] || 0) + 1;
      next();
    },
    function end() {
      counter.setCounts(counts);
    }
  );
  return duplexer(writeable, counter);
};
