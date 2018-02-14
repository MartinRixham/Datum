define([
	"element/Elements",
	"tracking/Dependant",
	"tracking/Registry"
], function(
	Elements,
	Dependant,
	Registry) {

	function CallbackBinder(binding) {

		var boundElements = new Elements();

		function provider() {

			return binding.test(this);
		}

		provider.applyBinding = function(element, model) {

			removeOldBindings(binding, boundElements);
			bindElements(element, model, binding, boundElements);
		};

		provider.removeBinding = function() {

			remove(binding, boundElements);
		};

		return provider;
	}

	function removeOldBindings(binding, boundElements) {

		var removed = boundElements.removeOld();

		for (var i = 0; i < removed.length; i++) {

			var element = removed[i].get();

			if (element) {

				binding.resetElement(element);
			}
		}
	}

	function bindElements(element, model, binding, boundElements) {

		if (element.get() && !boundElements.contains(element)) {

			binding.setUpElement(model, element.get());
			new Registry().requestRegistrations();
			binding.updateElement(model, element.get());
			createCallback(model, element, binding);
			boundElements.add(element);
		}
	}

	function createCallback(model, element, binding) {

		var running = false;

		function callback(value) {

			if (!running) {

				running = true;
				binding.updateElement(model, element.get(), value);
				running = false;
			}
		}

		new Registry().assignUpdater(new Dependant(callback, binding, element));
	}

	function remove(binding, boundElements) {

		var elements = boundElements.empty();

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i].get();

			if (element) {

				binding.resetElement(element);
			}
		}
	}

	return CallbackBinder;
});
