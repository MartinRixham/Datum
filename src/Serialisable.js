define([], function() {

	function Serialisable(model) {

		if (!model.toJSON)
		model.toJSON = function() {

			var json = {};

			if (model instanceof Array) {

				json = [];
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

					json[key] = property.toJSON();
				}

				if (!property ||
					(typeof(property) != "object" &&
					typeof(property) != "function")) {

					json[key] = property;
				}
			}

			return json;
		};
	}

	return Serialisable;
});
