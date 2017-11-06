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

	DestroyBinding.prototype.test = function(parentModel) {

		return {

			destroy: this.destroy.bind(parentModel)
		};
	};

	return DestroyBinding;
});
