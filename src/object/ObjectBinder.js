define([
	"element/ElementSet",
	"tracking/Dependant",
	"tracking/Registry"
], function(
	ElementSet,
	Dependant,
	Registry) {

	function ObjectBinder(binding) {

		var boundElements = new ElementSet();

		this.applyBinding = function(scope, name, model) {

			removeOldBindings();

			var elements = scope.getMatchingElements(name);

			bindElements(elements, scope, model, name);
			addElements(elements);
		};

		function removeOldBindings() {

			var removed = boundElements.removeOld();

			for (var i = 0; i < removed.length; i++) {

				var element = removed[i];

				if (element.get()) {

					binding.resetElement(element);
				}
			}
		}

		function addElements(elements) {

			for (var i = 0; i < elements.length; i++) {

				boundElements.add(elements[i]);
			}
		}

		function bindElements(elements, scope, model, name) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (scope.hasInScope(element)) {

					if (boundElements.contains(element)) {

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

		function createCallback(model, element) {

			function callback(value) {

				binding.updateElement(model, element, value);
			}

			new Registry().assignUpdater(new Dependant(callback, binding, element));
		}

		this.removeBinding = function() {

			var elements = boundElements.get();

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (element.get()) {

					binding.resetElement(element);
				}
			}
		};
	}

	return ObjectBinder;
});
