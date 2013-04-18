var fs = require("fs");

function jsonToHTML(obj, head) {
	if (typeof obj == "object") {
		var ret = "";
		if (head) {
			ret = "<!doctype html><html><head><link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap.min.css\"></head><body>\n";
		}
		for (var i in obj) {
			if (i == "Player Count") {
				ret += "<div class=\"well\">\n<p><strong>" + i + "</strong>: ";
				ret += "<table class=\"table\">\n<thead><tr><th>Name</th><th>World</th><th>X</th><th>Y</th><th>Z</th></tr></thead>\n<tbody>";
				for (var x = 0; x < obj[i].length; x++) {
					ret += "<tr>";
					for (var t in obj[i][x]) {
						ret += "<td>" + obj[i][x][t] + "</td>";
					}
					ret += "</tr>\n";
				}
				ret += "</tbody></table>\n"
				ret += "</p>\n</div>\n";
			} else if (i == "FML Mods") {
				ret += "<div class=\"well\">\n<p><strong>" + i + "</strong>: ";
				ret += "<table class=\"table\">\n<thead><tr><th>Mod ID</th><th>Mod Name</th><th>Mod Zip</th></tr></thead>\n<tbody>";
				for (var x = 0; x < obj[i].length; x++) {
					ret += "<tr>";
					for (var t in obj[i][x]) {
						ret += "<td>" + obj[i][x][t] + "</td>";
					}
					ret += "</tr>\n";
				}
				ret += "</tbody></table>\n"
				ret += "</p>\n</div>\n";
			} else if (i == "stackTrace") {
				ret += "<div class=\"well\">\n<p><strong>" + i + "</strong>: ";
				ret += "<table class=\"table\">\n<thead><tr><th>Class Name</th><th>Class Name Detail</th></tr></thead>\n<tbody>";
				for (var x = 0; x < obj[i].length; x++) {
					ret += "<tr>";
					for (var t in obj[i][x]) {
						ret += "<td>" + obj[i][x][t] + "</td>";
					}
					ret += "</tr>\n";
				}
				ret += "</tbody></table>\n"
				ret += "</p>\n</div>\n";
			} else if (i == "Plugins") {
				ret += "<div class=\"well\">\n<p><strong>" + i + "</strong>: ";
				ret += "<table class=\"table\">\n<thead><tr><th>Name</th><th>Version</th><th>ClassName</th><th>Authors</th></tr></thead>\n<tbody>";
				for (var x = 0; x < obj[i].length; x++) {
					ret += "<tr>";
					for (var t in obj[i][x]) {
						ret += "<td>";
						if (t == "authors") {
							ret += JSON.stringify(obj[i][x][t]);
						} else {
							ret += obj[i][x][t];
						}
						ret += "</td>";
					}
					ret += "</tr>\n";
				}
				ret += "</tbody></table>\n"
				ret += "</p>\n</div>\n";
			} else {
				if (typeof i == "number") {
					ret += "<div class=\"well\">\n<p>" + jsonToHTML(obj[i], false) + "</p>\n</div>\n";
				} else {
					ret += "<div class=\"well\">\n<p><strong>" + i + "</strong>: " + jsonToHTML(obj[i], false) + "</p>\n</div>\n";
				}
			}
		}
		if (head) {
			return ret + "</body></html>";
		} else {
			return ret;
		}
	} else {
		return obj;
	}
}

if (require.main === module) {
	if (process.argv.length != 3) {
		console.error("Usage: jsonToHTML filename");
		process.exit(1);
	}
	fs.writeFileSync("out.html",
		jsonToHTML(
			JSON.parse(
				fs.readFileSync(process.argv[2], "utf8")
			),
		true)
	, "utf8");
}

module.exports = jsonToHTML;

