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

		this.applyBinding = function(element, model) {

			parentModel = model;

			removeOldBindings();

			bindElements(element, model);
			boundElements.add(element);
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

		function bindElements(element, model) {

			if (element.get() && !boundElements.contains(element)) {

				binding.setUpElement(model, element.get());
				new Registry().requestRegistrations();
				binding.updateElement(model, element.get());
				createCallback(model, element);
			}
		}

		function createCallback(model, element) {

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
