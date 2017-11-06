define([], function() {

	function UpdateBinding(update) {

		this.update = update;
	}

	UpdateBinding.prototype.setUpElement = function() {};

	UpdateBinding.prototype.updateElement = function(parentModel, element) {

		this.update.call(parentModel, element);
	};

	UpdateBinding.prototype.resetElement = function() {};

	UpdateBinding.prototype.test = function(parentModel) {

		var self = this;

		return {

			update: function(element) {

				return self.update.call(parentModel, element);
			}
		};
	};

	return UpdateBinding;
});
