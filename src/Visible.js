define(["Binder"], function Visible(Binder) {

	function Visible(visible) {

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

		this.call = function() {

			visible.apply(this, arguments);
		};

		return new Binder(this);
	}

	return Visible;
});
