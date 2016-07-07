/**
 * Simple demo server with node
 */

var http = require('http');

//in the following, the server returned by createServer is an EventEmitter
//we attach a function that is executed every request directly or separately
//separately:
//var server = http.createServer(); // this EventEmitter takes a listener
//server.on('request', function(request, response) {

//directly:
//giving the EventEmitter a listener on each request
var server = http.createServer(function(request, response) {
	// note we have the age-old request and response pair
	// request is a ReadableStream
	var body = [];

	request.on('error', function(err) {
		console.error(err);
	});

	body = "There's nothing wrong with your server.\n";
	
	// use our new String outside its defining function:
	var specialMessage = "We now control the communication.";
	console.log(body = String.prototype.fromString.call(body, specialMessage)); // call it with an object

	// lets deal with response too, cause that is the whole purpose here
	// response is a WriteableStream, so we have write(), end(), on() for listeners such as for errors thrown
	response.on('error', function(err) {
		console.error(err);
	});

	response.statusCode = 200;
	response.setHeader('Content-Type', 'application/json');

	response.write(body);
	response.end();

}).listen(8008, '127.0.0.1', function() {
	
	// add a named function to an object prototype
	// just because we can (@todo removeme and all that)
	String.prototype.fromString = function(from) {
		return this.toString() + from;
	};

}); // begin accepting connections

