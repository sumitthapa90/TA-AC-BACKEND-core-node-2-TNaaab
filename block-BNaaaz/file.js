// - create file.js
// - create readme.txt
// - create a server in `file.js`
// - Use createReadStream method in file.js to read a file(readme.txt) and send data to response one chunk at a time.

var http = require("http");

var server = http.createServer(handleRequest);

var path = require("path");
var fs = require("fs");

function handleRequest(req, res) {
  console.log(path.join(__dirname, "./readme.txt"));
  fs.createReadStream(path.join(__dirname, "./readme.txt")).pipe(res);
}
server.listen(5000, () => {
  console.log("server listi at port 5000");
});
