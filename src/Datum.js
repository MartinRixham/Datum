define(["Dependant", "Subscriber"], function Datum(Dependant, Subscriber) {

	function Datum(datum) {

		var dependants = [];

		var self = this;

		function provider(value) {

			if (typeof value != "undefined") {

				self.rebindDataStructure();

				datum = value;

				for (var i = 0; i < dependants.length; i++) {

					var dependant = dependants[i];

					if (!document.contains(dependant.getElement())) {

						dependants.splice(i, 1);
					}
				}

				for (var j = 0; j < dependants.length; j++) {

					dependants[j].getCallback()(value);
				}
			}
			else if (self.registeringAssigners()) {

				self.registerUpdaterAssigner(function(callback, binding, element) {

					var dependant = new Dependant(callback, binding, element);

					var containsBinding = false;

					for (var k = 0; k < dependants.length; k++) {

						if (dependants[k].equals(dependant)) {

							containsBinding = true;
						}
					}

					if (!containsBinding) {

						dependants.push(dependant);
					}
				});
			}

			return datum;
		}

		return provider;
	}

	Datum.prototype = new Subscriber();

	return Datum;
});
