define([
	"element/ElementSet",
	"tracking/Registry",
	"tracking/Dependant"
], function(
	ElementSet,
	Registry,
	Dependant) {

	function ObjectBinder() {

		var self = this;

		var removed = false;

		var boundElements = new ElementSet();

		this.applyBinding = function(scope, name, model) {

			var removed = boundElements.removeOld();
			resetElements(removed);

			var elements = scope.getMatchingElements(name);

			bindElements(elements, scope, model, name);
		};

		function bindElements(elements, scope, model, name) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (boundElements.contains(element)) {

					updateElement(model, element, model && model[name]);
				}
				else {

					boundElements.add(element.toObjectElement());
					new Registry().requestRegistrations();
					updateElement(model, element, model && model[name]);
					createCallback(scope, element);
				}
			}
		}

		function updateElement(parentModel, element, model) {

			var objectElement = boundElements.getElementEqualTo(element);

			if (model) {

				if (removed) {

					removed = false;
					objectElement.replaceChildren();
				}
			}
			else {

				removed = true;
				objectElement.removeChildren();
			}
		}

		function createCallback(scope, element) {

			var running = false;

			function callback() {

				if (!running) {

					running = true;
					scope.rebind();
					running = false;
				}
			}

			new Registry().assignUpdater(new Dependant(callback, self, element));
		}

		this.removeBinding = function() {

			var elements = boundElements.get();

			resetElements(elements);
		};

		function resetElements(elements) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				element.replaceChildren();
				boundElements.remove(element);
			}
		}
	}

	return ObjectBinder;
});
