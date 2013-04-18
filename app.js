if (process.argv.length != 4) {
	console.error("Usage: node app [parser]|auto [filename]");
	process.exit(1);
}

var fs = require("fs"),
	jsonToHTML = require("./tools/jsonToHTML");

function json(obj, tidy) {
	if (typeof obj == "string") {

	} else if (typeof obj == "object") {
		if (tidy) {
			return JSON.stringify(obj, 0, '\t');
		} else {
			return JSON.stringify(obj);
		}
	}
}

function parseItem(parserType, filename) {
	if (filename.indexOf(".out.json") != -1 || filename.indexOf(".out.html") != -1) {
		return; // don't want to try and parse my own output
	}

	console.log("Parsing " + filename + " with " + parserType);

	if (!fs.existsSync("parsers/" + parserType + ".js")) {
		throw new Error("Parser does not Exist");
	}

	var parser = require("./parsers/" + parserType);

	var fileData = parser(fs.readFileSync(filename, "utf8"));

	fs.writeFileSync(filename + ".out.html", jsonToHTML(fileData, true));
}

function parseAllItems(parserType, files) {
	for (var i = 0; i < files.length; i++) {
		parseItem(parserType, files[i]);
	}
}

var parserTypes = (function () {
	var files = fs.readdirSync("parsers/");
	for (var i = 0; i < files.length; i++) {
		files[i] = files[i].substr(0, files[i].length - 3);
	}
	return files;
})();

var filename = process.argv[3];
var parserType = process.argv[2];

var files = [];

if (fs.statSync(filename).isDirectory()) {
	files = fs.readdirSync(filename);
	for (var i = 0; i < files.length; i++) {
		files[i] = filename + files[i];
	}
} else {
	files.push(filename);
}

if (parserType != "auto") {
	parseAllItems(parserType, files);
} else {
	for (var i = 0; i < files.length; i++) {
		for (var x = 0; x < parserTypes.length; x++) {
			if (files[i].indexOf(parserTypes[x]) != -1) {
				parseItem(parserTypes[x], files[i]);
				break;
			}
		}
	}
}