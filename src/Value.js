define(["Subscriber"], function Value(Subscriber) {

	function Value(value) {

		var parentModel = null;

		var self = this;

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			var elements = this.getMatchingElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (this.isInScope(element, scope)) {

					this.requestRegistrations();

					var evaluated = value.call(model, undefined, element);

					if (typeof(evaluated) != "undefined") {

						element.value = evaluated;
					}

					addCallbacks(element, model);
				}
			}
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

			createCallback(element, model);
		}

		function createCallback(element, model) {

			self.assignUpdater(function() {

				if (!value._running) {

					value._running = true;

					element.value = value.call(model, undefined, element);

					value._running = false;
				}
			},
			value,
			element);
		}

		this.removeBinding = function() {
		};

		this.test = {

			call: function(element) {

				value.call(parentModel, element);
			}
		};
	}

	Value.prototype = new Subscriber();

	return Value;
});
