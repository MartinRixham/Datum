define([], function() {

	function PermanentProperty(property, propertyType, scope) {

		this.scope = scope;

		this.property = property;

		this.propertyType = propertyType;

		this.propertyInjected = false;

		if (typeof(property) == "object" && !this.isBinding(property)) {

			this.objectBinding = propertyType.createObjectBinding(scope);
		}
	}

	PermanentProperty.prototype.applyBinding = function(element, model, key) {

		if (typeof(this.property) != "function" &&
			!this.isBinding(this.property) &&
			!this.propertyInjected) {

			this.propertyType.injectProperty(this.property, model, key);
			this.propertyInjected = true;
		}

		if (this.objectBinding) {

			this.objectBinding.applyBinding(element, model, key);
		}
	};

	PermanentProperty.prototype.isBinding = function(object) {

		return object && object.applyBinding && object.removeBinding;
	};

	PermanentProperty.prototype.removeBinding = function() {

		if (this.objectBinding) {

			this.objectBinding.removeBinding();
		}
	};

	PermanentProperty.prototype.hasScope = function(element) {

		return this.scope.equals(element);
	};

	return PermanentProperty;
});
