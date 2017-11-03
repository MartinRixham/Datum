define([], function() {

	function DestroyBinding(destroy) {

		this.destroy = destroy;
	}

	DestroyBinding.prototype.setUpElement = function(model) {

		this.parentModel = model;
	};

	DestroyBinding.prototype.updateElement = function() {};

	DestroyBinding.prototype.resetElement = function(element) {

		this.destroy.call(this.parentModel, element);
	};

	DestroyBinding.prototype.call = function() {

		init.apply(this, arguments);
	};

	return DestroyBinding;
});
