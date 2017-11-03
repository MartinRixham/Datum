define([], function() {

	function EventsBinding(callbacks) {

		this.callbacks = callbacks;

		this.listeners = [];
	}

	EventsBinding.prototype.setUpElement = function(model, element) {

		for (var key in this.callbacks) {

			var callback = this.callbacks[key];

			var listener = this.createListener(model, element, callback);

			this.listeners.push({ key: key, element: element, listener: listener });
			element.addEventListener(key, listener);
		}
	};

	EventsBinding.prototype.createListener = function(model, element, callback) {

		return function listener() {

			callback.call(model, element);
		};
	};

	EventsBinding.prototype.updateElement = function() {};

	EventsBinding.prototype.resetElement = function(element) {

		for (var i = 0; i < this.listeners.length; i++) {

			var listener = this.listeners[i];

			if (listener.element == element) {

				element.removeEventListener(listener.key, listener.listener);
				break;
			}
		}

		this.listeners.splice(i, 1);
	};

	EventsBinding.prototype.call = function(parentModel, element) {

		for (var key in this.callbacks) {

			this.callbacks[key].call(parentModel, element);
		}
	};

	return EventsBinding;
});
