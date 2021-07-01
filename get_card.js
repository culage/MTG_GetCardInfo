const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

exports.GetCard = async function (encName) {
	const isUrlArgs = decodeURIComponent(encName).startsWith("http://");
	const url = isUrlArgs ? 
	            decodeURIComponent(encName) :
	            "http://whisper.wisdom-guild.net/search.php?format=standard&q=" + encName;
	const res = await fetch(url);
	const html = await res.text();
	const dom = new JSDOM(html);
	
	const detail = dom.window.document.querySelector(".wg-whisper-card-detail");
	if (detail) {
		var name = [...detail.querySelectorAll("th")].filter(el=>el.innerHTML == "カード名"  ).map(el => el.closest("tr").querySelector("td b").innerHTML).join(" // ")
		var cost = [...detail.querySelectorAll("th")].filter(el=>el.innerHTML == "マナコスト").map(el => el.closest("tr").querySelector("td").innerHTML).join(" // ")
		var rarityAndSet = [...detail.querySelectorAll("th")].filter(el=>el.innerHTML == "セット等").map(el => el.closest("tr").querySelector("td").innerHTML).join(" // ")
		var matches = rarityAndSet.match(/(.*), (.*) \([0-9]+/);
		var rarity = matches[1];
		var set = matches[2];
		return { type: "detail", detail: { name, cost, rarity, set, url, html:detail.outerHTML } };
	}
	
	const cards = [...dom.window.document.querySelectorAll("#contents .card")];
	const resultList = cards.map(el => ({
		name: [...el.querySelectorAll("a")].map(el => el.innerHTML).join(" // "),
		url : el.querySelector("a").href,
		html: el.outerHTML,
	}));
	return { type: "cards", cards: resultList }
};

//test
//(async ()=> {
//	var ret = await exports.GetCard(encodeURIComponent("嘘の神、ヴァルキー"));
//	console.log(ret.type);
//	console.log(ret.detail.name);
//	console.log(ret.detail.cost);
//	console.log(ret.detail.rarity);
//	console.log(ret.detail.set);
//
//	var ret = await exports.GetCard(encodeURIComponent("スカイ"));
//	console.log(ret.type);
//	console.log(ret.cards.map(i=>i.name).join("\n"));
//})();
