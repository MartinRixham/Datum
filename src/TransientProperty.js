define([], function() {

	function TransientProperty(property, propertyType) {

		var binding;

		if (property && isBinding(property)) {

			binding = property;
		}
		else if (property instanceof Array) {

			binding = propertyType.createArrayBinding(property);
		} else if (property && typeof(property) == "object") {

			binding = propertyType.createViewModel(property);
		}

		this.applyBinding = function(scope, key, model) {

			if (binding) {

				binding.applyBinding(scope, key, model);
			}
		};

		function isBinding(object) {

			return object && object.applyBinding && object.removeBinding;
		}

		this.removeBinding = function() {

			if (binding) {

				binding.removeBinding();
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

	return TransientProperty;
});
