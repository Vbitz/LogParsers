module.exports = function (exception) {
	var ret = [];
	var lines = exception.split('\n');
	var currentError = {stackTrace: []};
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].length === 0) {
			break;
		}
	}
	ret.push(currentError);
	return ret;
}