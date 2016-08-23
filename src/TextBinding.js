define([], function() {

	function TextBinding(text) {

		this.setUpElement = function() {};

		this.updateElement = function(model, element) {

			element.textContent = text.call(model, element);
		};

		this.resetElement = function(element) {

			element.textContent = "";
		};

		this.call = function(parentModel, element) {

			text.call(parentModel, element);
		};
	}

	return TextBinding;
});
