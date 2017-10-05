define([
	"tracking/Datum",
	"object/ObjectBinder",
	"array/ArrayBinder"
], function(
	Datum,
	ObjectBinder,
	ArrayBinder) {

	function PropertyType(createViewModel) {

		this.injectProperty = function(property, model, key) {

			var datum = new Datum(property);

			Object.defineProperty(model, key, {

				get: function() {

					return datum();
				},
				set: function(value) {

					datum(value);
				}
			});
		};

		this.createViewModel = function(model) {

			return createViewModel(model);
		};

		this.createObjectBinding = function() {

			return new ObjectBinder();
		};

		this.createArrayBinding = function(model) {

			return new ArrayBinder(model, this);
		};
	}

	return PropertyType;
});
