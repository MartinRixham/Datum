define([], function() {

	function UpdateBinding(update) {

		this.setUpElement = function() {};

		this.updateElement = function(model, element) {

			update.call(model, element);
		};

		this.resetElement = function() {};

		this.call = function() {

			update.apply(this, arguments);
		};
	}

	return UpdateBinding;
});
