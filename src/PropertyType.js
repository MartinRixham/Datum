define([
	"Datum",
	"Binder",
	"ObjectBinding",
	"ArrayBinding"
], function(
	Datum,
	Binder,
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

			return new Binder(new ObjectBinding());
		};

		this.createArrayBinding = function() {

			return new Binder(new ArrayBinding());
		};
	}

	return PropertyType;
});
