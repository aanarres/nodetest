/**
 * A simple demo with node: a server that echoes your request back at ya.
 * Playing with node, from https://nodejs.org/en/docs/
 */

var http = require ('http');

var echo_server = http.createServer(function(request, response) {
	// initialize body as an array
	var body = [];
	
	request.on('data', function(chunk) {
		// listener on 'data' coming in
		body.push(chunk);
	}).on('end', function() {
		// listener on 'end' of input stream
		body = Buffer.concat(body).toString();
		response.end(body); // send body
	});
});

// start me up
echo_server.listen(8008);