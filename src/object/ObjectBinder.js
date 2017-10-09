define([
	"element/ElementSet",
	"tracking/Registry",
	"tracking/Dependant"
], function(
	ElementSet,
	Registry,
	Dependant) {

	function ObjectBinder(scope) {

		var self = this;

		var removed = false;

		var boundElements = new ElementSet();

		this.applyBinding = function(element, model, name) {

			var removed = boundElements.removeOld();
			resetElements(removed);

			if (element.get()) {

				bindElements(element, model, name);
			}
		};

		function bindElements(element, model, name) {

			if (boundElements.contains(element)) {

				updateElement(element, model && model[name]);
			}
			else {

				boundElements.add(element.toObjectElement());
				new Registry().requestRegistrations();
				updateElement(element, model && model[name]);
				createCallback(scope, element);
			}
		}

		function updateElement(element, model) {

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
