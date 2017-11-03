define([], function() {

	function InitBinding(init) {

		this.init = init;
	}

	InitBinding.prototype.setUpElement = function(model, element) {

		this.init.call(model, element);
	};

	InitBinding.prototype.updateElement = function() {};

	InitBinding.prototype.resetElement = function() {};

	InitBinding.prototype.call = function() {

		this.init.apply(this, arguments);
	};

	return InitBinding;
});
