define([], function() {

	function UpdateBinding(update) {

		this.update = update;
	}

	UpdateBinding.prototype.setUpElement = function() {};

	UpdateBinding.prototype.updateElement = function(parentModel, element) {

		this.update.call(parentModel, element);
	};

	UpdateBinding.prototype.resetElement = function() {};

	UpdateBinding.prototype.call = function(parentModel, element) {

		this.update.call(parentModel, element);
	};

	return UpdateBinding;
});
