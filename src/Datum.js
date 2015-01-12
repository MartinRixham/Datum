function Datum(datum) {

	var updateCallbacks = [];

	var dependants = [];

	var self = this;

	var provider = function(value) {

		self.rebindDataStructure();

		if (typeof value != "undefined") {

			datum = value;

			for (var i = 0; i < updateCallbacks.length; i++) {

				updateCallbacks[i](value);	
			}
		}
		else if (self.registeringAssigners()) {

			self.registerUpdaterAssigner(function(callback, binding) {

				if (!binding || !dependants.indexOf(binding) + 1) {

					updateCallbacks.push(callback);

					if (binding) {

						dependants.push(binding);
					}
				}
			});
		}
			
		return datum;
	};

	return provider;
}

Datum.prototype = new Subscriber();
