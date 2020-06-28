const { Readable } = require("stream");

class MyStream extends Readable {
  constructor(content, opts = {}) {
    super(opts);
    this.content = content;
  }
  _read(size) {
    if (this.content) {
      this.push(this.content.slice(0, size));
      this.content = this.content.slice(size);
    }
  }
}
const rs = new MyStream();
rs.pipe(process.stdout);
