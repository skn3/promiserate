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
		if (source.length > 0) {
			for (var index in source) {
				items.push({index: index, item: source[index]});
			}
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

	//check to see if there is anything to iterate
	if (items.length == 0) {
		//dummy promise!
		return new Promise(function (resolve, reject) {
			resolve();
		})
	} else {
		//start
		return next(0);
	}
};