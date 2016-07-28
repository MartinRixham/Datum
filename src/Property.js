define([], function() {

	function Property(property, injectProperty, createViewModel) {

		var binding = null;

		if (property && property.applyBinding && property.removeBinding) {

			binding = property;
		}
		else if (property && typeof(property) == "object") {

			binding = createViewModel(property);
		}

		this.applyBinding = function(scope, key, model) {

			injectProperty(model, key);

			if (binding) {

				binding.applyBinding(scope, key, model);
			}
		};

		this.removeBinding = function() {

			if (binding) {

				binding.removeBinding();
			}
		};

		this.isOlderThan = function(other) {

			return !property || !other || property != other;
		};
	}

	return Property;
});
