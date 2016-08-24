define([], function() {

	function ClickBinding(click) {

		var listeners = [];

		this.setUpElement = function(model, element) {

			function listener() {

				click.call(model, element);
			}

			listeners.push({ "element": element, "listener": listener });
			element.addEventListener("click", listener);
		};

		this.updateElement = function() {};

		this.resetElement = function(element) {

			var i;

			for (i = 0; i < listeners.length; i++) {

				var listener = listeners[i];

				if (listener.element == element) {

					element.removeEventListener("click", listener.listener);
					break;
				}
			}

			listeners.splice(i, 1);
		};

		this.call = function(parentModel, element) {

			click.call(parentModel, element);
		};
	}

	return ClickBinding;
});
