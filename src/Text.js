define(["Binder"], function Text(Binder) {

	function Text(text) {

		this.updateElement = function(model, element) {

			element.textContent = text.call(model, element);
		};

		this.resetElement = function(element) {

			element.textContent = "";
		};

		this.call = function() {

			text.apply(this, arguments);
		};

		return new Binder(this);
	}

	return Text;
});
