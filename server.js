var http = require('http');
var html = require('fs').readFileSync('index.html');

var server = http.createServer();

server.on('request', function(req, res) {
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(html);
})

server.listen(8080);
