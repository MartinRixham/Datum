define([], function() {

	function UpdateBinding(update) {

		this.setUpElement = function() {};

		this.updateElement = function(model, element) {

			update.call(model, element);
		};

		this.resetElement = function() {};

		this.call = function(parentModel, element) {

			update.call(parentModel, element);
		};
	}

	return UpdateBinding;
});
