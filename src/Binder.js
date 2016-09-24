define(["Rebinder", "Dependant", "Registry"], function(Rebinder, Dependant, Registry) {

	function Binder(binding) {

		var parentModel;

		var boundElements = [];

		var running = false;

		new Rebinder().requestRebind();

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			var elements = getMatchingElements(scope, name);

			removeOldBindings(elements);
			bindElements(elements, scope, model, name);

			boundElements = elements;
		};

		function getMatchingElements(scope, key) {

			if (isNaN(key)) {

				return [].slice.call(scope.querySelectorAll("[data-bind=" + key + "]"));
			}
			else {

				return [scope.children[key]];
			}
		}

		function removeOldBindings(elements) {

			for (var i = 0; i < boundElements.length; i++) {

				var boundElement = boundElements[i];

				if (doesNotContain(elements, boundElement)) {

					binding.resetElement(boundElement);
				}
			}
		}

		function doesNotContain(array, element) {

			var contains = array.indexOf(element) + 1;

			return !contains;
		}

		function bindElements(elements, scope, model, name) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (isInScope(element, scope)) {

					if (boundElements.indexOf(element) + 1) {

						binding.updateElement(model, element, model && model[name]);
					}
					else {

						binding.setUpElement(model, element, model && model[name]);
						new Registry().requestRegistrations();
						binding.updateElement(model, element, model && model[name]);
						createCallback(model, element);
					}
				}
			}
		}

		function isInScope(element, scope) {

			element = element.parentElement;

			if (!element) {

				return true;
			}
			else if (element._rebind) {

				return element == scope;
			}
			else {

				return isInScope(element, scope);
			}
		}

		function createCallback(model, element) {

			function callback(value) {

				if (!running) {

					running = true;
					binding.updateElement(model, element, value);
					running = false;
				}
			}

			new Registry().assignUpdater(new Dependant(callback, binding, element));
		}

		this.removeBinding = function() {

			for (var i = 0; i < boundElements.length; i++) {

				binding.resetElement(boundElements[i]);
			}

			boundElements = [];
			parentModel = null;
		};

		this.test = {

			call: function(element) {

				binding.call(parentModel, element);
			}
		};
	}

	return Binder;
});
