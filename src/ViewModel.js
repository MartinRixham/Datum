// This is just a collection of utility methods that are helpful
// when building applications with Datum.
BindingRoot.ViewModel = function(model) {

	if (!model) {

		model = {};
	}

	if (!model.toJSON)
	model.toJSON = function() {

		var transferObject = {};

		if (model instanceof Array) {

			transferObject = [];
		}

		for (var key in model) {

			var property = model[key];

			if (key == "_scope") {

				continue;
			}

			if (property &&
				property.toJSON &&
				typeof(property) == "object" &&
				(!property.applyBinding || property instanceof Array)) {

				transferObject[key] = property.toJSON();
			}

			if (!property ||
				(typeof(property) != "object" &&
				typeof(property) != "function")) {

				transferObject[key] = property;
			}
		}

		return transferObject;
	};

	return model;
};
