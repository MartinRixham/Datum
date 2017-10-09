define([], function() {

	function PermanentProperty(property, propertyType, scope) {

		var objectBinding;
		var propertyInjected = false;

		if (typeof(property) == "object" && !isBinding(property)) {

			objectBinding = propertyType.createObjectBinding(scope);
		}

		this.applyBinding = function(element, model, key) {

			if (typeof(property) != "function" &&
				!isBinding(property) &&
				!propertyInjected) {

				propertyType.injectProperty(property, model, key);
				propertyInjected = true;
			}

			if (objectBinding) {

				objectBinding.applyBinding(element, model, key);
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
