var http = require('http');
var whisper = require('./get_card.js');

var server = http.createServer();

server.on('request', async function(req, res) {
	if (req.url == "/") {
		var indexHtml = require('fs').readFileSync('./index.html');
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(indexHtml);
		return;
	}
	if (req.url == "/lib/vue.min.js") {
		var content = require('fs').readFileSync('./lib/vue.min.js');
		res.writeHead(200,{'Content-Type':'text/javascript'});
		res.end(content);
		return;
	}
	if (req.url == "/lib/main.css") {
		var content = require('fs').readFileSync('./lib/main.css');
		res.writeHead(200,{'Content-Type':'text/css'});
		res.end(content);
		return;
	}
	if (req.url.startsWith("/get_card?")) {
		console.log(req.url);
		var param = req.url.substr("/get_card?".length);
		var ret = await whisper.GetCard(param);
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(ret));
		return;
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end("404 not found.");
})

server.listen(8080);
