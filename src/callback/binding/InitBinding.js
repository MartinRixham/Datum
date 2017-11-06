define([], function() {

	function InitBinding(init) {

		this.init = init;
	}

	InitBinding.prototype.setUpElement = function(model, element) {

		this.init.call(model, element);
	};

	InitBinding.prototype.updateElement = function() {};

	InitBinding.prototype.resetElement = function() {};

	InitBinding.prototype.test = function(parentModel) {

		var self = this;

		return {

			init: function(element) {

				return self.init.call(parentModel, element);
			}
		};
	};

	return InitBinding;
});
