'use strict';

module.exports = function (source, callback) {
	//build iterable items array
	var items = [];
	if (typeof source === 'object') {
		//object
		for (var index in source) {
			if (source.hasOwnProperty(index)) {
				items.push({index: index, item: source[index]});
			}
		}
	} else {
		//array
		for (var index in source) {
			items.push({index: index, item: source[index]});
		}
	}

	//iterate func
	var next = function (offset) {
		return callback(items[offset].index, items[offset].item)
			.then(function () {
				//finished so do we have a next item?
				if (offset < items.length - 1) {
					return next(offset + 1);
				}
			});
	}

	//start to iterate
	return next(0);
};