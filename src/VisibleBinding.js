define([], function() {

	function VisibleBinding(visible) {

		this.setUpElement = function() {};

		this.updateElement = function(model, element) {

			if (visible.call(model, element)) {

				element.style.display = null;
			}
			else {

				element.style.display = "none";
			}
		};

		this.resetElement = function(element) {

			element.style.display = null;
		};

		this.call = function(parentModel, element) {

			visible.call(parentModel, element);
		};
	}

	return VisibleBinding;
});
