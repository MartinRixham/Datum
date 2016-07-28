define(["Datum"], function(Datum) {

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
	}

	return PropertyType;
});
