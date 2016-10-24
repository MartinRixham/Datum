define([], function() {

	function ValueBinding(value) {

		var listeners = [];

		this.setUpElement = function(parentModel, element) {

			function listener(event) {

				value.call(parentModel, event.target.value, element);
			}

			listeners.push({ "element": element, "listener": listener });
			element.addEventListener("change", listener);
		};

		this.updateElement = function(parentModel, element) {

			element.value = value.call(parentModel, undefined, element);
		};

		this.resetElement = function(element) {

			var i;

			for (i = 0; i < listeners.length; i++) {

				var listener = listeners[i];

				if (listener.element == element) {

					element.removeEventListener("change", listener.listener);
					element.value = "";
					break;
				}
			}

			listeners.splice(i, 1);
		};

		this.call = function(parentModel, val, element) {

			return value.call(parentModel, val, element);
		};
	}

	return ValueBinding;
});
