// const serverJSPath = __filename;
// console.log(serverJSPath);

// //

// const appJSPath = `${__dirname}/app.js`;
// console.log(appJSPath);

// //

// const indexPath = "./index.html";
// console.log(indexPath);

// //

// const indexHtmlPath = path.join(__dirname, "index.html");
// console.log(indexHtmlPath);

// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

var http = require("http");
var qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var contentType = req.headers["content-type"];
  var store = "";
  res.on("data", (chunk) => {
    store = store + chunk;
  });
  res.on("end", () => {
    if (
      req.method === "POST" &&
      req.url === "/" &&
      contentType === "application/json"
    ) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(store);
    }
    if (
      req.method === "POST" &&
      req.url === "/" &&
      contentType === "application/x-www-form-urlencoded"
    ) {
      res.writeHead(201, { "Content-Type": "text/plain" });
      var parsed = qs.parse(store);
      res.end(JSON.stringify(parsed));
    }
  });
}

server.listen(2822, () => {
  console.log("Server listin at port 2822");
});
