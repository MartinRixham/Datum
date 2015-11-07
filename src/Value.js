function Value(value) {

	var parentModel = null;

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
		value,
		element);
	};

	this.applyBinding = function(scope, name, model) {

		parentModel = model;

		var elements = this.matchingElements(scope, name);

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

	this.test = {

		call: function(element) {

			value.call(parentModel, element);
		}
	};
}

Value.prototype = new Subscriber();
