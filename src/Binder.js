define([
	"Rebinder",
	"Dependant",
	"Registry",
	"DOMElement"
], function(
	Rebinder,
	Dependant,
	Registry,
	DOMElement) {

	function Binder(binding) {

		var parentModel;

		var boundElements = [];

		var running = false;

		new Rebinder().requestRebind();

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			removeOldBindings();

			if (scope) {

				var elements = new DOMElement(scope).getMatchingElements(name);

				bindElements(elements, scope, model, name);
				addElements(elements);
			}
		};

		function addElements(elements) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (boundElements.indexOf(element) < 0) {

					boundElements.push(element);
				}
			}
		}

		function removeOldBindings() {

			for (var i = 0; i < boundElements.length; i++) {

				var boundElement = boundElements[i];

				if (boundElement.removedFromDocument()) {

					binding.resetElement(boundElement.get());
					boundElements.splice(i, 1);
				}
			}
		}

		function bindElements(elements, scope, model, name) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (element.isInScope(scope)) {

					if (boundElements.indexOf(element) + 1) {

						binding.updateElement(model, element.get(), model && model[name]);
					}
					else {

						binding.setUpElement(model, element.get(), model && model[name]);
						new Registry().requestRegistrations();
						binding.updateElement(model, element.get(), model && model[name]);
						createCallback(model, element);
					}
				}
			}
		}

		function createCallback(model, element) {

			function callback(value) {

				if (!running) {

					running = true;
					binding.updateElement(model, element.get(), value);
					running = false;
				}
			}

			new Registry().assignUpdater(new Dependant(callback, binding, element.get()));
		}

		this.removeBinding = function() {

			for (var i = 0; i < boundElements.length; i++) {

				binding.resetElement(boundElements[i].get());
			}

			boundElements = [];
			parentModel = null;
		};

		this.test = {

			call: function() {

				var testArguments = [].slice.call(arguments);
				testArguments.unshift(parentModel);

				return binding.call.apply(binding, testArguments);
			}
		};
	}

	return Binder;
});
