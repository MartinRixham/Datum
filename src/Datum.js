function Datum(datum) {

	var updateCallbacks = [];

	var self = this;

	var provider = function(value) {

		self.rebind();

		if (value) {

			datum = value;

			for (var i = 0; i < updateCallbacks.length; i++) {

				updateCallbacks[i](value);	
			}
		}
		else if (self.registeringAssigners()) {

			self.registerUpdaterAssigner(function(callback) {

				updateCallbacks.push(callback);
			});
		}
			
		return datum;
	};

	provider.isDatum = true;

	return provider;
}

Datum.prototype = new Subscriber();
