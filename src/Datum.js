function Datum(datum) {

	var updateCallbacks = [];

	var dependants = [];

	var self = this;

	var provider = function(value) {

		if (typeof value != "undefined") {

			self.rebindDataStructure();

			datum = value;

			for (var i = 0; i < updateCallbacks.length; i++) {

				var callback = updateCallbacks[i];

				if (!document.contains(callback.element)) {

					updateCallbacks.splice(i, 1);
				}
			}

			for (var j = 0; j < updateCallbacks.length; j++) {

				updateCallbacks[j](value);
			}
		}
		else if (self.registeringAssigners()) {

			self.registerUpdaterAssigner(function(callback, binding, element) {

				if (!dependants.indexOf(binding) + 1) {

					callback.element = element;

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
