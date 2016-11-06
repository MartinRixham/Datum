define([
	"Datum",
	"CallbackBinder",
	"ObjectBinding",
	"ArrayBinding"
], function(
	Datum,
	CallbackBinder,
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

			return new CallbackBinder(new ObjectBinding());
		};

		this.createArrayBinding = function(model) {

			return new CallbackBinder(new ArrayBinding(model, this));
		};
	}

	return PropertyType;
});
