function Datum(datum) {

	var updateCallbacks = [];

	var self = this;

	var provider = function(value) {

		if (value) {

			datum = value;

			for (var i = 0; i < updateCallbacks.length; i++) {

				updateCallbacks[i](value);	
			}
		}
		else if (self.registeringUpdates()) {

			self.registerUpdaterAssigner(function(callback) {

				updateCallbacks.push(callback);
			});
		}
			
		return datum;
	};

	provider.isDatum = true;

	provider.update = function(callback) {

		updateCallbacks.push(callback);
	};

	return provider;
}

Datum.prototype = new Subscriber();
