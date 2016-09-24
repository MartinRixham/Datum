define([], function() {

	function TextBinding(text) {

		this.setUpElement = function() {};

		this.updateElement = function(parentModel, element) {

			element.textContent = text.call(parentModel, element);
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
