define([
	"ElementSet",
	"Registry",
	"Rebinder"
], function Datum(
	ElementSet,
	Registry,
	Rebinder) {

	function Datum(datum) {

		var dependants = new ElementSet();

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

			dependants.add(dependant);
		}

		function set(value) {

			datum = value;

			dependants.removeOld();
			updateDependants(value);

			new Rebinder().rebindDataStructure();
		}

		function updateDependants(value) {

			var dependantArray = dependants.get();

			for (var i = 0; i < dependantArray.length; i++) {

				dependantArray[i].call(value);
			}
		}

		return provider;
	}

	return Datum;
});
