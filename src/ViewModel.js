function ViewModel(model) {

	if (!model) {

		model = {};
	}

	this.toJSON = function(model) {

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
				typeof(property) == "object" && 
				(!property.isBinding || property instanceof Array)) {

				transferObject[key] = this.toJSON(property);
			}

			if (!property || 
				(typeof(property) != "object" && 
				typeof(property) != "function")) {

				transferObject[key] = property;
			}
		}

		return transferObject;
	};

	var self = this;

	model.toJSON = function() {

		return JSON.stringify(self.toJSON(model));
	};

	return model;	
}
