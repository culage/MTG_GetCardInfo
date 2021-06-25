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
	if (req.url.startsWith("/get_card_list?name=")) {
		console.log(req.url);
		var encEame = req.url.match(/(?<=name=).*/)[0];
		var cards = await whisper.GetCardList(encEame);
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(`<html lang="ja"><head><meta charset="utf-8" /></head><body>${cards.map(i=>i.name).join("<br>")}</body></html>`);
		return;
	}
	if (req.url.startsWith("/get_card_info?url=")) {
		// ★
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end("404 not found.");
})

server.listen(8080);
