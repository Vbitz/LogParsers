var javaExceptionParser = require("../tools/javaExceptionParser");

module.exports = function (fileData) {
	var ret = {};
	var lines = fileData.split('\r\n');

	if (lines[0] != "---- Minecraft Crash Report ----") { // check magic
		console.log("[" + lines[0] + "]");
		throw new Error("Not a Vannila Minecraft Crash Report")
	}

	ret.time = lines[3].substr(lines[3].indexOf(": ") + 2); // get the log time
	ret.description = lines[4].substr(lines[4].indexOf(": ") + 2); // and description

	var exLogEnd = 6;
	var exLog = lines[exLogEnd] + "\n";
	while (lines[exLogEnd++].length !== 0) {
		exLog += lines[exLogEnd] + "\n";
	}

	ret.mainError = javaExceptionParser(exLog);

	return ret;
}