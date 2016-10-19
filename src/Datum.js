define(["Registry", "Rebinder"], function Datum(Registry, Rebinder) {

	function Datum(datum) {

		var dependants = [];

		function provider(value) {

			if (typeof value == "undefined") {

				return get();
			}
			else {

				set(value);
			}
		}

		function get() {

			new Registry().registerUpdaterAssigner(assigner);

			return datum;
		}

		function assigner(dependant) {

			if (dependantNotRegistered(dependant)) {

				dependants.push(dependant);
			}
		}

		function dependantNotRegistered(dependant) {

			var containsDependant = false;

			for (var i = 0; i < dependants.length; i++) {

				if (dependants[i].equals(dependant)) {

					containsDependant = true;
				}
			}

			return !containsDependant;
		}

		function set(value) {

			datum = value;

			forgetRemovedDependants();
			updateDependants(value);

			new Rebinder().rebindDataStructure();
		}

		function forgetRemovedDependants() {

			for (var i = 0; i < dependants.length; i++) {

				var dependant = dependants[i];

				if (dependant.removedFromDocument()) {

					dependants.splice(i, 1);
				}
			}
		}

		function updateDependants(value) {

			for (var i = 0; i < dependants.length; i++) {

				dependants[i].call(value);
			}
		}

		return provider;
	}

	return Datum;
});
