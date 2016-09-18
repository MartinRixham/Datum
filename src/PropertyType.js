define(["Datum", "Binder", "ObjectBinding"], function(Datum, Binder, ObjectBinding) {

	function PropertyType(createViewModel) {

		var injectedProperties = [];

		this.injectProperty = function(model, key) {

			if (injectedProperties.indexOf(key) == -1) {

				var datum = new Datum(model[key]);
				injectedProperties.push(key);

				Object.defineProperty(model, key, {

					get: function() {

						return datum();
					},
					set: function(value) {

						datum(value);
					}
				});
			}
		};

		this.createViewModel = function(model) {

			return createViewModel(model);
		};

		this.createObjectBinding = function() {

			return new Binder(new ObjectBinding());
		};
	}

	return PropertyType;
});
