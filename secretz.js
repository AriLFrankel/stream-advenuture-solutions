const tar = require("tar");
const parser = new tar.Parse();
const crypto = require("crypto");
const concat = require("concat-stream");
const decrypt = crypto.createDecipheriv(
  process.argv[2],
  process.argv[3],
  process.argv[4]
);
// for each entry in a tarball an entry event is emitted
parser.on("entry", (e) => {
  if (e.type !== "File") return e.resume();
  // creates a readable stream with the results of the hasing operation
  const hasher = crypto.createHash("md5", { encoding: "hex" });
  e.pipe(hasher).pipe(
    // concat joins all the parts of the stream and calls the cb with the concatenated contents after the stream has finished
    // in this case it's more idiomatic than through, but either would work because the md5 hash will be less than the standard 16kb chunk size
    // so only one chunk would be passed anyway before ending
    concat(function (hash) {
      process.stdout.write(`${hash} ${e.path}\n`);
    })
  );
});

process.stdin.pipe(decrypt).pipe(parser);
