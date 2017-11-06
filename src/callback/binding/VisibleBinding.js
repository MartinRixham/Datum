define([], function() {

	function VisibleBinding(visible) {

		this.visible = visible;
	}

	VisibleBinding.prototype.setUpElement = function() {};

	VisibleBinding.prototype.updateElement = function(parentModel, element) {

		if (this.visible.call(parentModel, element)) {

			element.style.display = null;
		}
		else {

			element.style.display = "none";
		}
	};

	VisibleBinding.prototype.resetElement = function(element) {

		element.style.display = null;
	};

	VisibleBinding.prototype.test = function(parentModel) {

		return {

			visible: this.visible.bind(parentModel)
		};
	};

	return VisibleBinding;
});
