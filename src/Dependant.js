Datum.Dependant = function(callback, binding, element) {

	this.callback = callback;

	this.binding = binding;

	this.element = element;

	this.equals = function(other) {

		return this.binding == other.binding &&
			this.element == other.element;
	};
};
