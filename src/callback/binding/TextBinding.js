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

		var self = this;

		return {

			text: function(element) {

				return self.text.call(parentModel, element);
			}
		};
	};

	return TextBinding;
});
