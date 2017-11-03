define([
	"tracking/Datum",
	"object/ObjectBinding",
	"array/ArrayBinding"
], function(
	Datum,
	ObjectBinding,
	ArrayBinding) {

	function PropertyType(createViewModel) {

		this.createViewModelCallback = createViewModel;
	}

	PropertyType.prototype.injectProperty = function(property, model, key) {

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

	PropertyType.prototype.createViewModel = function(model) {

		return this.createViewModelCallback(model);
	};

	PropertyType.prototype.createObjectBinding = function(scope) {

		return new ObjectBinding(scope);
	};

	PropertyType.prototype.createArrayBinding = function(model) {

		return new ArrayBinding(model, this);
	};

	return PropertyType;
});
