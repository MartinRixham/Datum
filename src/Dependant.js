define([], function() {

	 function Dependant(callback, binding, element) {

		this.getCallback = function() {

			return callback;
		};

		this.getBinding = function() {

			return binding;
		};

		this.getElement = function() {

			return element;
		};

		this.equals = function(other) {

			return binding == other.getBinding() &&
				element == other.getElement();
		};
	}

	return Dependant;
});
