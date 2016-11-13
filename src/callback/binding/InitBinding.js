define([], function() {

	function InitBinding(init) {

		this.setUpElement = function(model, element) {

			init.call(model, element);
		};

		this.updateElement = function() {};

		this.resetElement = function() {};

		this.call = function() {

			init.apply(this, arguments);
		};
	}

	return InitBinding;
});
