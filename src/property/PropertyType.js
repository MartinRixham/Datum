define([
	"tracking/Datum",
	"object/ObjectBinder",
	"object/ObjectBinding",
	"array/ArrayBinding"
], function(
	Datum,
	ObjectBinder,
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

		this.createObjectBinding = function() {

			return new ObjectBinder(new ObjectBinding());
		};

		this.createArrayBinding = function(model) {

			return new ObjectBinder(new ArrayBinding(model, this));
		};
	}

	return PropertyType;
});
