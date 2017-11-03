define([
	"element/Elements",
	"tracking/Dependant",
	"tracking/Registry"
], function(
	Elements,
	Dependant,
	Registry) {

	function CallbackBinder(binding) {

		this.binding = binding;

		this.boundElements = new Elements();

		var self = this;

		this.test = {

			call: function() {

				var testArguments = [].slice.call(arguments);
				testArguments.unshift(self.parentModel);

				return self.binding.call.apply(self.binding, testArguments);
			}
		};
	}

	CallbackBinder.prototype.applyBinding = function(element, model) {

		this.parentModel = model;

		this.removeOldBindings();

		this.bindElements(element, model);
		this.boundElements.add(element);
	};

	CallbackBinder.prototype.removeOldBindings = function() {

		var removed = this.boundElements.removeOld();

		for (var i = 0; i < removed.length; i++) {

			var element = removed[i].get();

			if (element) {

				this.binding.resetElement(element);
			}
		}
	};

	CallbackBinder.prototype.bindElements = function(element, model) {

		if (element.get() && !this.boundElements.contains(element)) {

			this.binding.setUpElement(model, element.get());
			new Registry().requestRegistrations();
			this.binding.updateElement(model, element.get());
			this.createCallback(model, element);
		}
	};

	CallbackBinder.prototype.createCallback = function(model, element) {

		var running = false;

		var self = this;

		function callback(value) {

			if (!running) {

				running = true;
				self.binding.updateElement(model, element.get(), value);
				running = false;
			}
		}

		new Registry().assignUpdater(new Dependant(callback, this.binding, element));
	};

	CallbackBinder.prototype.removeBinding = function() {

		var elements = this.boundElements.get();

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i].get();

			if (element) {

				this.binding.resetElement(element);
			}
		}

		this.parentModel = null;
	};

	return CallbackBinder;
});
