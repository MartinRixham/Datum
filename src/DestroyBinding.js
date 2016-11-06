define([], function() {

	function DestroyBinding(destroy) {

		var parentModel;

		this.setUpElement = function(model) {

			parentModel = model;
		};

		this.updateElement = function() {};

		this.resetElement = function(element) {

			destroy.call(parentModel, element);
		};

		this.call = function() {

			init.apply(this, arguments);
		};
	}

	return DestroyBinding;
});
