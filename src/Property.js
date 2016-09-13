define([], function() {

	function Property(property, propertyType) {

		var binding;

		var objectBinding;

		if (property && property.applyBinding && property.removeBinding) {

			binding = property;
		}
		else if (typeof(property) == "object") {

			objectBinding = propertyType.createObjectBinding();

			if (property) {

				binding = propertyType.createViewModel(property);
			}
		}

		this.applyBinding = function(scope, key, model) {

			if (typeof(property) != "function") {

				propertyType.injectProperty(property, model, key);
			}

			if (binding) {

				binding.applyBinding(scope, key, model);
			}

			if (objectBinding) {

				objectBinding.applyBinding(scope, key, model);
			}
		};

		this.removeBinding = function() {

			if (binding) {

				binding.removeBinding();
			}

			if (objectBinding) {

				objectBinding.removeBinding();
			}
		};

		this.isOlderThan = function(other) {

			return !property || !other || property != other;
		};
	}

	return Property;
});
