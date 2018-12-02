define([
	"element/Elements",
	"tracking/Registry"
], function Datum(
	Elements,
	Registry) {

	function Datum(datum) {

		var self = {

			datum: datum,
			dependants: new Elements(),
			registry: new Registry()
		};

		function provider(value) {

			if (isNotValue(value)) {

				return get.call(self);
			}
			else {

				set.call(self, value);
			}
		}

		return provider;
	}

	function isNotValue(value) {

		return typeof value === "undefined" || value instanceof Node;
	}

	function get() {

		var self = this;

		this.registry.registerUpdaterAssigner(function(dependant) {

			self.dependants.add(dependant);
		});

		return this.datum;
	}

	function set(value) {

		this.datum = value;

		this.dependants.removeOld();
		updateDependants.call(this, value);
	}

	function updateDependants(value) {

		var dependantArray = this.dependants.get();

		for (var i = 0; i < dependantArray.length; i++) {

			dependantArray[i].call(value);
		}
	}

	return Datum;
});
