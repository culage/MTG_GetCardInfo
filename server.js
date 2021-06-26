var http = require('http');
var indexHtml = require('fs').readFileSync('index.html');
var whisper = require('./get_card.js');

var server = http.createServer();

server.on('request', async function(req, res) {
	if (req.url == "/") {
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(indexHtml);
		return;
	}
	if (req.url.startsWith("/get_card?q=")) {
		console.log(req.url);
		var encEame = req.url.match(/(?<=q=).*/)[0];
		var ret = await whisper.GetCard(encEame);
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(ret));
		return;
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end("404 not found.");
})

server.listen(8080);
