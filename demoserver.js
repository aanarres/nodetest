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
	// request is a ReadableStream
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
		// response is a WriteableStream, so we have write(), end(), on() for listeners such as for errors thrown
		response.on('error', function(err) {
			console.error(err);
		});

		// the following can also be written as:
		// response.writeHead(200, {
		// 'Content-Type': 'application/json',
		// });

		response.statusCode = 200;
		response.setHeader('Content-Type', 'application/json');

		var responseBody = {
			headers : headers,
			method : method,
			url : url,
			body : body
		};

		response.write(JSON.stringify(responseBody));
		response.end();
		// Note: the 2 lines above could be replaced with this next one:
		// response.end(JSON.stringify(responseBody))
	});
}).listen(8008, '127.0.0.1', function() {
	randomFunc();
	
	// use our new String outside its defining function:
	var myStr = "Amsterdam is a beautiful city in Northern Europe.";
	console.log(String.prototype.fromString.apply(myStr, [myStr])); // call it with an array
}); // begin accepting connections

function randomFunc() {
	// add a named function to an object prototype
	String.prototype.fromString = function(from) {
		return from + 'Composed String.';
	};
	
	var myStr = "Amsterdam is a city in Northern Europe.";
	console.log(myStr.fromString(myStr));
	
	// calls via reflection ftw
	console.log(String.prototype.fromString.call(myStr, myStr)); // with an object
}