define([], function() {

	function ValueBinding(value) {

		this.value = value;

		this.listeners = [];
	}

	ValueBinding.prototype.setUpElement = function(parentModel, element) {

		var self = this;

		function listener(event) {

			self.value.call(parentModel, event.target.value, element);
		}

		this.listeners.push({ element: element, listener: listener });
		element.addEventListener("change", listener);
	};

	ValueBinding.prototype.updateElement = function(parentModel, element) {

		element.value = this.value.call(parentModel, undefined, element);
	};

	ValueBinding.prototype.resetElement = function(element) {

		for (var i = 0; i < this.listeners.length; i++) {

			var listener = this.listeners[i];

			if (listener.element == element) {

				element.removeEventListener("change", listener.listener);
				element.value = "";
				break;
			}
		}

		this.listeners.splice(i, 1);
	};

	ValueBinding.prototype.call = function(parentModel, val, element) {

		return this.value.call(parentModel, val, element);
	};

	return ValueBinding;
});
