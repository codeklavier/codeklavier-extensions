// CodeKlavier-Mercury Extension
// trillmapping parameter ranges

const fs = require('fs');
// const json = require('jsonfile');
let table = require('markdown-table');

let scalings = {
	"gain" : [1, 15, 0, 2, 1, false],
	"time" : [1, 16, 0, 1, 1, false],
	"shape.attack" : [1, 16, 1, 5000, 3, false],
	"shape.release" : [1, 16, 1, 5000, 3, false],
	"reverb.amp" : [1, 16, 0.25, 2, 2, false],
	"reverb.length" : [1, 16, 1, 16, 1, false],
	"delay.division" : [1, 16, 0.0625, 1, 2, false],
	"delay.feedback" : [1, 16, 0.2, 0.99, 1, true],
	"lfo.division" : [1, 16, 0.0625, 1, 1, false],
	"lfo.shape" : [1, 5, 0, 4, 1, true],
}

let trills = [];
for (let i=0; i<16; i++){ trills.push(i+1); }

let trillMap = {};
trillMap["trills"] = trills.map(x => "~" + x);

let scl = Object.keys(scalings);
for (let key in scl){
	let arr = [];
	for (let i in trills){
		arr.push(scale(trills[i], ...scalings[scl[key]]).toFixed(2));
	}
	trillMap[scl[key]] = arr;
}
trillMap["speed"] = ["1/32", "1/24", "1/16", "1/8", "1/6", "1/4", "1/3", "1/2", "1" ,"2", "3", "4", "5", "6", "7", "8"];

let table1 = [];
let table2 = [];
let keys = Object.keys(trillMap);
for (let i=0; i<keys.length; i++){
	table1.push([keys[i], ...trillMap[keys[i]].slice(0, 8)]);
	table2.push([keys[i], ...trillMap[keys[i]].slice(8, 16)]);
}

write("./lib/trillmap-list.md", table(table1) + "\n\n\n\n" + table(table2));

function write(file, text){
	fs.writeFile(file, text, "utf8", (err) => {
		if (err) console.error(err);
		else console.log("File: " + file + " written successfully");
	});
}

// scale a value from input range to output range with exponent
function scale(v, inLo, inHi, outLo, outHi, exp=1, clp){
	let val = (clp)? clip(v, inLo, inHi) : v;
	let downScl = Math.pow((val - inLo) / (inHi - inLo), exp);
	return downScl * (outHi - outLo) + outLo;
}

// clip a value between lo and hi range
function clip(v, lo, hi){
	return Math.max(Math.min(v, hi), lo);
}