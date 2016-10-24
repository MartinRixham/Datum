define([], function() {

	function VisibleBinding(visible) {

		this.setUpElement = function() {};

		this.updateElement = function(parentModel, element) {

			if (visible.call(parentModel, element)) {

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

			return visible.call(parentModel, element);
		};
	}

	return VisibleBinding;
});
