/**
 * Simple demo server with node
 */

var http = require('http');

// in the following, the server returned by createServer is an EventEmitter
// we attach a function that is executed every request directly or separately
// separately:
// var server = http.createServer(); // this EventEmitter takes a listener
// server.on('request', function(request, response) {

// directly:
// giving the EventEmitter a listener on each request
var server = http.createServer(function(request, response) {
  // note we have the age-old request and response pair
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];

  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // lets deal with response too, cause that is the whole purpose here

    response.on('error', function(err) {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
 
    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))
  });
}).listen(8008); // begin accepting connections