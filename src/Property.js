define([], function() {

	function Property(property, propertyType) {

		var binding;

		var objectBinding;

		var propertyInjected = false;

		if (property && isBinding(property)) {

			binding = property;
		}
		else if (typeof(property) == "object") {

			objectBinding = propertyType.createObjectBinding();

			if (property) {

				binding = propertyType.createViewModel(property);
			}
		}

		this.applyBinding = function(scope, key, model) {

			if (typeof(property) != "function" && !isBinding(property) && !propertyInjected) {

				propertyType.injectProperty(property, model, key);
				propertyInjected = true;
			}

			if (binding) {

				binding.applyBinding(scope, key, model);
			}

			if (objectBinding) {

				objectBinding.applyBinding(scope, key, model);
			}
		};

		function isBinding(object) {

			return object && object.applyBinding && object.removeBinding;
		}

		this.removeBinding = function() {

			if (binding) {

				binding.removeBinding();
			}

			if (objectBinding) {

				objectBinding.removeBinding();
			}
		};

		this.isOlderThan = function(other) {

			if (typeof property == "object" || typeof other == "object") {

				return other && property != other;
			} else {

				return false;
			}
		};
	}

	return Property;
});
