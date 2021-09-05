var relativePath = "../clint/index.js";
console.log(relativePath);

var absolutePath = __dirname;
console.log(__dirname + "../clint/index.js");



var http = require("http");
var fs = require("fs");
var qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    if (req.method === "GET" && req.url === "./form.html") {
      fs.readFile("./form", (err, content) => {
        if (err) console.log(err);
        res.end(content);
      });

      if (req.method === "POST" && req.url === "./form.html") {
        let parsedData = qs.parse(store);
        res.setHeader("Content-Type", "text/html");
        res.end(
          `<h2> name: ${parsedData.name}</h2><h3>email:${parsedData.email}</h3> <h4>${parsedData.age}</h4>`
        );
      }
    }
  });
}
server.listen(5000, () => {
  console.log("Server listin at port 5000");
});
