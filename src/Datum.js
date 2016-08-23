define(["Subscriber"], function Datum(Subscriber) {

	function Datum(datum) {

		var dependants = [];

		this.get = function() {

			if (this.registeringAssigners()) {

				this.registerUpdaterAssigner(function(dependant) {

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
		};

		this.set = function(value) {

			this.rebindDataStructure();

			datum = value;

			for (var i = 0; i < dependants.length; i++) {

				var dependant = dependants[i];

				if (dependant.removedFromDocument()) {

					dependants.splice(i, 1);
				}
			}

			for (var j = 0; j < dependants.length; j++) {

				dependants[j].call(value);
			}
		};
	}

	Datum.prototype = new Subscriber();

	return Datum;
});
