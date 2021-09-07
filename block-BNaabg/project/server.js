var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var url = require("url");

var server = http.createServer(handleRequest);
let userPath = __dirname + "/users/";

function handleRequest(req, res) {
  var parsedURL = url.parse(res.url, true);
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      var username = JSON.parse(store).username;
      fs.open(userPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (error) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username}Done`);
          });
        });
      });
    }

    if (req.method === "GET" && parsedURL.pathname === "/users") {
      var username = parsedURL.query.username;
      fs.readFile(userPath + username, ".json", (err, content) => {
        if (err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        return res.end(content);
      });
    }

    if (req.method === "PUT" && parsedURL.pathname === "/users") {
      var username = parsedURL.query.username;
      fs.open(userPath + username + ".json", "r+", (err, fd) => {
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} is updated succesfully`);
            });
          });
        });
      });
    }

    if (req.method === "DELETE" && parsedURL.pathname === "./users") {
      var username = parsedURL.query.username;
      fs.unlink(userPath + username + ".json", (err) => {
        return res.end(`${username} is Deleted`);
      });
    }

    res.statusCode = 404;
    res.end("Page not found");
  });
}
server.listen(5000, () => {
  console.log("Sevrer Listin at port 5000");
});
