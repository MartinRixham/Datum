define([
	"element/ElementSet",
	"tracking/Dependant",
	"tracking/Registry"
], function(
	ElementSet,
	Dependant,
	Registry) {

	function CallbackBinder(binding) {

		var parentModel;

		var boundElements = new ElementSet();

		var running = false;

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			removeOldBindings();

			var elements = getMatchingElements(scope, name);

			bindElements(elements, model);
			addElements(elements);
		};

		function removeOldBindings() {

			var removed = boundElements.removeOld();

			for (var i = 0; i < removed.length; i++) {

				var element = removed[i].get();

				if (element) {

					binding.resetElement(element);
				}
			}
		}

		function getMatchingElements(scope, name){

			var elements = scope.getMatchingElements(name);

			if (scope.hasDataBindAttribute(name)) {

				elements.push(scope);
			}

			return elements;
		}

		function addElements(elements) {

			for (var i = 0; i < elements.length; i++) {

				boundElements.add(elements[i]);
			}
		}

		function bindElements(elements, model) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (!boundElements.contains(element)) {

					binding.setUpElement(model, element.get());
					new Registry().requestRegistrations();
					binding.updateElement(model, element.get());
					createCallback(model, element);
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

			new Registry().assignUpdater(new Dependant(callback, binding, element));
		}

		this.removeBinding = function() {

			var elements = boundElements.get();

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i].get();

				if (element) {

					binding.resetElement(element);
				}
			}

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

	return CallbackBinder;
});
