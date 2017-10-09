define([
	"tracking/Datum",
	"object/ObjectBinding",
	"array/ArrayBinding"
], function(
	Datum,
	ObjectBinding,
	ArrayBinding) {

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

		this.createObjectBinding = function(scope) {

			return new ObjectBinding(scope);
		};

		this.createArrayBinding = function(model) {

			return new ArrayBinding(model, this);
		};
	}

	return PropertyType;
});
