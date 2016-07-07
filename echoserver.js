/**
 * A simple demo with node: a server that echoes your request back at ya.
 * Playing with node, from https://nodejs.org/en/docs/
 */

const http = require ('http');
const hostname = '127.0.0.1';
const port = '8008';

var echo_server = http.createServer(function(request, response) {
	// Error handling: register listener to handle errors in request stream
	request.on ('error', function(err) {
		console.error(err);
		response.statusCode = 400; // bad request
		response.end();
	});
	
	// Error handling: register listener to handle errors in response stream
	response.on('error', function(err) {
		console.error(err);
	});
	
	// echo when request is GET and URL is /echo
	console.log('Checking request...' + request.method + ' ' + request.url);
	if (request.method === 'GET' && request.url === '/echo') {
	// initialize body as an array
	var body = [];
	
	request.on('data', function(chunk) {
		// listener on 'data' coming in
		console.log('data coming in...' + chunk);
		body.push(chunk);
	}).on('end', function() {
		// listener on 'end' of input stream
		body = Buffer.concat(body).toString();
		response.end(body); // send body
	});
	} else {
		response.statusCode = 404;
		response.end();
	}
});

// start me up
echo_server.listen(port, hostname, function() {
	console.log('Server running at http://' + hostname + ':' + port);
});