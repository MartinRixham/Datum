define([], function() {

	function TransientProperty(property, propertyType) {

		this.property = property;

		this.propertyType = propertyType;

		if (property && this.isBinding(property)) {

			this.binding = property;
		}
		else if (property instanceof Array) {

			this.binding = propertyType.createArrayBinding(property);
		}
		else if (property && typeof(property) === "object") {

			this.binding = propertyType.createViewModel(property);
		}
	}

	TransientProperty.prototype.isBinding = function(object) {

		return object && object.applyBinding && object.removeBinding;
	};

	TransientProperty.prototype.applyBinding = function(element, model, key) {

		if (this.binding) {

			this.binding.applyBinding(element, model, key);
		}
	};

	TransientProperty.prototype.removeBinding = function() {

		if (this.binding) {

			this.binding.removeBinding();
		}
	};

	TransientProperty.prototype.isOlderThan = function(other) {

		if (typeof this.property === "object" || typeof other === "object") {

			return other && this.property !== other;
		}
		else {

			return false;
		}
	};

	return TransientProperty;
});
