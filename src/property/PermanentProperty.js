define([], function() {

	function PermanentProperty(property, propertyType) {

		var objectBinding;
		var propertyInjected = false;

		if (typeof(property) == "object" && !isBinding(property)) {

			objectBinding = propertyType.createObjectBinding();
		}

		this.applyBinding = function(scope, key, model) {

			if (typeof(property) != "function" &&
				!isBinding(property) &&
				!propertyInjected) {

				propertyType.injectProperty(property, model, key);
				propertyInjected = true;
			}

			if (objectBinding) {

				objectBinding.applyBinding(scope, key, model);
			}
		};

		function isBinding(object) {

			return object && object.applyBinding && object.removeBinding;
		}

		this.removeBinding = function() {

			if (objectBinding) {

				objectBinding.removeBinding();
			}
		};
	}

	return PermanentProperty;
});
