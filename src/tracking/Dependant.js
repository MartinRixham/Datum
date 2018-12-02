define([], function() {

	function Dependant(callback, binding, element) {

		this.callback = callback;

		this.binding = binding;

		this.element = element;
	}

	Dependant.prototype.call = function(value) {

		this.callback(value);
	};

	Dependant.prototype.removedFromDocument = function() {

		return this.element.removedFromDocument();
	};

	Dependant.prototype.equals = function(other) {

		return other.hasEqual(this.binding, this.element);
	};

	Dependant.prototype.hasEqual = function(otherBinding, otherElement) {

		return this.binding === otherBinding && this.element.equals(otherElement);
	};

	return Dependant;
});
