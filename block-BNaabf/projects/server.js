var http = require("http");
var fs = require("fs");
var path = require("path");
const { strict } = require("assert");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    if (req.method === "GET" && req.url === "./form") {
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    }
    if (req.method === "POST" && req.url === "./form") {
      var parsedData = qs.parse(store);
      res.setHeader("Content-Type", "text/html");
      res.end(`<h2>${parsedData.name}</h2> <h3>${parsedData.email}</h3><h4>${parsedData.age}</h4>`)
    }
  });
}
server.listen(5678, () => {
  console.log("Server listin at port 5678");
});
