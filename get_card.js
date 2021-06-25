const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

async function GetCardList(name) {
	const res = await fetch("http://whisper.wisdom-guild.net/search.php?format=standard&name=" + encodeURIComponent(name));
	const html = await res.text();
	const dom = new JSDOM(html);
	const cards = [...dom.window.document.querySelectorAll("#contents .card")];
	
	return cards.map(el => ({
		name: [...el.querySelectorAll("a")].map(el => el.innerHTML).join("　＋　"),
		url : el.querySelector("a").href,
		html: el.outerHTML,
	}));
}

(async ()=> {
	var cards = await GetCardList("skycla");
	console.log(cards.map(i=>i.name).join("\n"));
})();

