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

// var http = require("http");
// var qs = require("querystring");

// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var contentType = req.headers["content-type"];
//   var store = "";
//   res.on("data", (chunk) => {
//     store = store + chunk;
//   });
//   res.on("end", () => {
//     if (
//       req.method === "POST" &&
//       req.url === "/" &&
//       contentType === "application/json"
//     ) {
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(store);
//     }
//     if (
//       req.method === "POST" &&
//       req.url === "/" &&
//       contentType === "application/x-www-form-urlencoded"
//     ) {
//       res.writeHead(201, { "Content-Type": "text/plain" });
//       var parsed = qs.parse(store);
//       res.end(JSON.stringify(parsed));
//     }
//   });
// }

// server.listen(2822, () => {
//   console.log("Server listin at port 2822");
// });

//

// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

// var http = require("http");
// var fs = require("querystring");

// var server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var contentType = req.headers["Content-Type"];
//   var store = "";
//   res.on("data", (chunk) => {
//     store = store + chunk;
//   });
//   res.on("end", () => {
//     if (contentType === "application/json") {
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(store);
//     }

//     if (contentType === "application/x-www-form-urlencoded") {
//       res.writeHead(201, {
//         "Content-Type": "text/plain",
//       });
//       res.end(store);
//       var parse = fs.parse(store);
//       res.end(JSON.stringify(parse));
//     }
//   });
// }

// server.listen(9000, () => {
//   console.log("Server listin at port 9000");
// });

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

// format of json data is {name: your name, email: "", }
// Html response format is
// Name
// email
// Q. Follow above question with form data containing fields i.e name and email.

// Parse form-data using querystring module
// respond with HTML page containing only email from data in H2 tag

var http = require("http");
var qs = require("querystring");
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var contentType = req.headers["content-type"];
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    if (contentType === "application/json") {
      res.writeHead(201, { "Content-Type": "text/plain" });
      let parseData = qs.parse(store);
      res.end(`<h1>${parseData.name}</h1> <h2>${parseData.email}</h2>`);
    }
    if (contentType === "application/x-www-form-urlencoded") {
      res.writeHead(201, { "Content-Type": "text/html" });
      let parsedData = qs.parse(store);
      res.end(`<h2>${parsedData.email}</h2>`);
    }
  });
}

server.listen(5000, () => {
  console.log("Server listen at port 5000");
});
