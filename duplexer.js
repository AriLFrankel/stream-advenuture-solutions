const { spawn } = require("child_process");
const duplexer = require("duplexer2");

module.exports = function (cmd, args) {
  const child = spawn(cmd, args);
  return duplexer(null, child.stdin, child.stdout);
};
