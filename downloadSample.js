var fs = require("fs"),
	http = require("http");

function downloadString(url, callback) {
	http.get(url, function (res) {
		res.setEncoding("utf8");
		var data = "";
		res.on("data", function (chunk) {
			data += chunk;
		});
		res.on("end", function () {
			callback(data);
		});
	});
}


if (!fs.existsSync("samples")) {
	fs.mkdirSync("samples");
}

var fileIndex = -1;

while (fs.existsSync("samples/" + process.argv[2] + "_sample" + ++fileIndex + ".log")) {
	console.log("samples/" + process.argv[2] + "_sample" + fileIndex + ".log exists");
}

console.log("Downloading " + process.argv[3] + " to " + ("samples/" + process.argv[2] + "_sample" + fileIndex + ".log"));

downloadString(process.argv[3], function (data) {
	fs.writeFileSync("samples/" + process.argv[2] + "_sample" + fileIndex + ".log", data, "utf8");
});