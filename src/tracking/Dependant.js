define([], function() {

	function Dependant(callback, binding, element) {

		this.call = function(value) {

			callback(value);
		};

		this.removedFromDocument = function() {

			return element.removedFromDocument();
		};

		this.equals = function(other) {

			return other.hasEqual(binding, element);
		};

		this.hasEqual = function(otherBinding, otherElement) {

			return binding == otherBinding && element.equals(otherElement);
		};
	}

	return Dependant;
});
