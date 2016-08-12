define(["Binder"], function Value(Binder) {

	function Value(value) {

		this.setUpElement = function() {};

		this.updateElement = function(model, element) {

			var evaluated = value.call(model, undefined, element);

			if (typeof(evaluated) != "undefined") {

				element.value = evaluated;
			}

			addCallbacks(element, model);
		};

		this.resetElement = function() {};

		this.call = function() {

			value.apply(this, arguments);
		};

		function addCallbacks(element, model) {

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(value) + 1;

			if (!alreadyBound) {

				element.addEventListener("change", function(event) {

					value.call(model, event.target.value, element);
				});

				element.callbacks.push(value);
			}
		}

		return new Binder(this);
	}

	return Value;
});
