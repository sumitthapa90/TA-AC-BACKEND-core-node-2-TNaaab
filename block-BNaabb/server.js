// Create a basic http server in `stream.js`

// - add a listener on port 3456
// - send text data from postman using `POST` request on `/` route.
// - add `data` and `end` event on request to capture data
// - capture the data sent from postman on server side
// - send captured data in response using `res.write`

var http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  res.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    console.log(store);
  });
}

server.listen(3456, () => {
  console.log("server listin at port 9000");
});
