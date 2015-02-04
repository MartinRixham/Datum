function Value(value) {

	this.addCallbacks = function(element, model) {

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

		this.assignUpdater(function() {

			element.value = value.call(model, undefined, element);
		},
		this,
		element);
	};

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				this.requestRegistrations();

				var evaluated = value.call(model, undefined, element);

				if (typeof(evaluated) != "undefined") {

					element.value = evaluated;
				}

				this.addCallbacks(element, model);
			}
		}
	};
}

Value.prototype = new Subscriber();
