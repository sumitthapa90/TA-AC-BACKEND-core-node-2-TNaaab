var http = require("http");
var qs = require("querystring");
var path = require("path");
var fs = require("fs");
var url = require("url");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      var parsedData = JSON.parse(store).username;
    }
  });
}
server.listen(5000, () => {
  console.log("Sevrer Listin at port 5000");
});
