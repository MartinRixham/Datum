define([], function() {

	function TextBinding(text) {

		this.text = text;
	}

	TextBinding.prototype.setUpElement = function() {};

	TextBinding.prototype.updateElement = function(parentModel, element) {

		element.textContent = this.text.call(parentModel, element);
	};

	TextBinding.prototype.resetElement = function(element) {

		element.textContent = "";
	};

	TextBinding.prototype.test = function(parentModel) {

		return {

			text: this.text.bind(parentModel)
		};
	};

	return TextBinding;
});
