define([
	"ElementSet",
	"Rebinder",
	"Dependant",
	"Registry"
], function(
	ElementSet,
	Rebinder,
	Dependant,
	Registry) {

	function Binder(binding) {

		var parentModel;

		var boundElements = new ElementSet();

		var running = false;

		new Rebinder().requestRebind();

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			removeOldBindings();

			var elements = scope.getMatchingElements(name);

			bindElements(elements, scope, model, name);
			addElements(elements);
		};

		function removeOldBindings() {

			var removed = boundElements.removeOld();

			for (var i = 0; i < removed.length; i++) {

				binding.resetElement(removed[i].get());
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

			new Registry().assignUpdater(new Dependant(callback, binding, element));
		}

		this.removeBinding = function() {

			var elements = boundElements.get();

			for (var i = 0; i < elements.length; i++) {

				binding.resetElement(elements[i].get());
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

	return Binder;
});
