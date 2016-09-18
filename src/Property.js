define([], function() {

	function Property(property, propertyType) {

		var bindings = [];

		if (property && isBinding(property)) {

			bindings.push(property);
		}
		else if (typeof(property) == "object") {

			bindings.push(propertyType.createObjectBinding());

			if (property) {

				bindings.push(propertyType.createViewModel(property));
			}
		}

		this.applyBinding = function(scope, key, model) {

			if (typeof(property) != "function" && !isBinding(model[key])) {

				propertyType.injectProperty(model, key);
			}

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].applyBinding(scope, key, model);
			}
		};

		function isBinding(object) {

			return object && object.applyBinding && object.removeBinding;
		}

		this.removeBinding = function() {

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].removeBinding();
			}
		};
	}

	return Property;
});
