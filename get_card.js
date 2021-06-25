const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

exports.GetCardList = async function (encName) {
	const res = await fetch("http://whisper.wisdom-guild.net/search.php?format=standard&name=" + encName);
	const html = await res.text();
	const dom = new JSDOM(html);
	const cards = [...dom.window.document.querySelectorAll("#contents .card")];
	
	return cards.map(el => ({
		name: [...el.querySelectorAll("a")].map(el => el.innerHTML).join("　＋　"),
		url : el.querySelector("a").href,
		html: el.outerHTML,
	}));
};

//(async ()=> {
//	var cards = await exports.GetCardList(encodeURIComponent("スカイ"));
//	console.log(cards.map(i=>i.name).join("\n"));
//})();

