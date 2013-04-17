var classIdentifyer = require("./classIdentifyer");

var causedStr = "Caused by: ";

module.exports = function (exception) {
	var ret = {
		errors: [],
		sources: []
	};
	var lines = exception.split('\n');
	var currentError = {stackTrace: []};
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].length === 0) {
			break;
		}
		if (lines[i][0] != '\t') {
			if (currentError.className !== undefined) {
				ret.errors.push(currentError);
			}
			currentError = {};
			if (lines[i].indexOf(causedStr) === 0) {
				lines[i] = lines[i].substr(causedStr.length);
			}
			if (lines[i].indexOf(':') == -1) {
				currentError.className = lines[i];
			} else {
				currentError.className = lines[i].substr(0, lines[i].indexOf(':'));
				currentError.detail = lines[i].substr(lines[i].indexOf(':') + 2);
			}
			currentError.classNameDetail = classIdentifyer(currentError.className);
			ret.sources.push(currentError.classNameDetail);
			currentError.stackTrace = [];
		} else {
			if (lines[i].trim().indexOf("... ") === 0) {
				continue;
			}
			lines[i] = lines[i].trim().substr(3);
			var stackFrame = {};
			stackFrame.className = lines[i].substr(0, lines[i].indexOf('('));
			stackFrame.classNameDetail = classIdentifyer(stackFrame.className);
			ret.sources.push(stackFrame.classNameDetail);
			currentError.stackTrace.push(stackFrame);
		}
	}
	ret.errors.push(currentError);
	return ret;
}