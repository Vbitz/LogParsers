var javaExceptionParser = require("../tools/javaExceptionParser");

function map(arr, func) {
	var ret = [];
	for (var i = 0; i < arr.length; i++) {
		ret.push(func(arr[i]));
	}
	return ret;
}

function parseBukkitPlugin(line) {
	var ret = {};
	ret.name = line.substr(0, line.indexOf(' v'));
	line = line.substr(line.indexOf(' v') + 1);
	ret.version = line.substr(1, line.indexOf(' ') - 1);
	line = line.substr(line.indexOf(' ') + 1);
	ret.className = line.substr(0, line.indexOf('[') - 1);
	ret.authors = map(line.split('[')[1].split(','), function (i) {return i.trim();});
	return ret;
}

function parseFMLMod(line) {
	if (line.substr(0, 5) == "LWJGL") {
		return {};
	}
	var ret = {};
	ret.modId = line.substr(0, line.indexOf(" ["));
	line = line.substr(line.indexOf(" [") + 2);
	ret.modName = line.substr(0, line.indexOf("]"));
	line = line.substr(line.indexOf("]") + 3);
	ret.modZipName = line.substr(0, line.indexOf(")"));
	return ret;
}

module.exports = function (fileData) {
	var ret = {};
	var lines = fileData.split('\r\n');

	if (lines[0] != "---- Minecraft Crash Report ----") { // check magic
		console.log("[" + lines[0] + "]");
		throw new Error("Not a Vannila Minecraft Crash Report");
	}

	ret.time = lines[3].substr(lines[3].indexOf(": ") + 2); // get the log time
	ret.description = lines[4].substr(lines[4].indexOf(": ") + 2); // and description

	var exLogEnd = 6;
	var exLog = lines[exLogEnd] + "\n";
	while (lines[exLogEnd++].length !== 0) {
		exLog += lines[exLogEnd] + "\n";
	}

	ret.mainError = javaExceptionParser(exLog);

	if (lines[exLogEnd + 1] != "A detailed walkthrough of the error, its code path and all known details is as follows:") { // second check
		console.log("[" + lines[exLogEnd + 1] + "]");
		throw new Error("Not a Vannila Minecraft Crash Report");
	}

	var currentPos = exLogEnd + 4;

	while (currentPos < lines.length) {
		if (lines[currentPos] == "-- System Details --") {
			currentPos += 2;
			while (currentPos < lines.length && lines[currentPos].trim().length > 0) {
				var line = lines[currentPos].trim();
				if (line.indexOf(":") !== -1) {
					var key = line.substr(0, line.indexOf(":"));
					if (key.length > 34) {
						currentPos++;
						continue;
					}
					if (key == "Plugins") {
						var data = line.substr(line.indexOf(":") + 2);
						data = data.substr(0, data.length - 3);
						ret[key] = map(data.split('], '), function (i) {
							i = i.replace(/\{/, '').trim();
							return parseBukkitPlugin(i);
						});
					} else if (key == "Player Count") {
						var data = line.substr(line.indexOf(":") + 2);
						ret[key] = map(data.split("), EntityPlayer"), function (i) {
							return map(i.replace(/.*\[EntityPlayer/, '').substr(1).split('](')[0].split(','), function (i) {return i.trim()});
						});
					} else if (key == "FML") {
						var fmlMods = [];
						key = lines[currentPos].substr(0, lines[currentPos++].indexOf(":")).trim();
						while (key != "LWJGL") {
							fmlMods.push(lines[currentPos]);
							key = lines[currentPos].substr(0, lines[currentPos++].indexOf(":")).trim();
						}
						ret["FML Mods"] = map(fmlMods, function (i) {
							return parseFMLMod(i.trim());
						});
						currentPos--;
						ret[key] = lines[currentPos].substr(lines[currentPos].indexOf(":") + 2);
					} else if (key == "Threads") {
					} else if (key == "Suspicious classes") {
					} else {
						ret[key] = line.substr(line.indexOf(":") + 2);
					}
				} else {

				}
				currentPos++;
			}
		} else if (lines[currentPos] == "-- Head --") {
			while (lines[currentPos++].length > 0) {}
		} else if (lines[currentPos] == "-- Affected level --") {
			currentPos += 2;
			while (lines[currentPos].trim() != "Stacktrace:") {
				var line = lines[currentPos].trim();
				if (line.indexOf(":") !== -1) {
					var key = line.substr(0, line.indexOf(":"));
					if (key.length > 34) {
						currentPos++;
						continue;
					}
					if (key == "All players") {

					} else {
						ret[key] = line.substr(line.indexOf(":") + 2);
					}
				} else {

				}
				currentPos++;
			}
			while (lines[currentPos++].length > 0) {}
		} else if (lines[currentPos] == "-- Screen render details --") {
			currentPos += 2;
			while (lines[currentPos].length > 0) {
				var line = lines[currentPos].trim();
				if (line.indexOf(":") !== -1) {
					var key = line.substr(0, line.indexOf(":"));
					if (key.length > 34) {
						currentPos++;
						continue;
					}
					ret[key] = line.substr(line.indexOf(":") + 2);
				} else {

				}
				currentPos++;
			}
		} else if (lines[currentPos].length === 0) {
			currentPos++;
		} else {
			throw lines[currentPos];
		}
	}

	return ret;
}