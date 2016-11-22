define([], function() {

	function EventsBinding(callbacks) {

		var listeners = [];

		this.setUpElement = function(model, element) {

			for (var key in callbacks) {

				var callback = callbacks[key];

				var listener = createListener(model, element, callback);

				listeners.push({ key: key, element: element, listener: listener });
				element.addEventListener(key, listener);
			}
		};

		function createListener(model, element, callback) {

			return function listener() {

				callback.call(model, element);
			};
		}

		this.updateElement = function() {};

		this.resetElement = function(element) {

			for (var i = 0; i < listeners.length; i++) {

				var listener = listeners[i];

				if (listener.element == element) {

					element.removeEventListener(listener.key, listener.listener);
				}
			}

			listeners.splice(i, 1);
		};

		this.call = function(parentModel, element) {

			for (var key in callbacks) {

				callbacks[key].call(parentModel, element);
			}
		};
	}

	return EventsBinding;
});
