define([], function() {

	function Serialisable(model) {

		if (!model.toJSON)
		model.toJSON = function() { return toJSON(model); };
	}

	function toJSON(model) {

		var json = {};

		if (model instanceof Array) {

			json = [];
		}

		for (var key in model) {

			var property = model[key];

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
	}

	return Serialisable;
});
