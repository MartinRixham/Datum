define(["Subscriber"], function(Subscriber) {

	function Binder(binding) {

		var parentModel;

		var boundElements = [];

		this.requestRebind();

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			var elements = this.getMatchingElements(scope, name);

			removeOldBindings(elements);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (this.isInScope(element, scope)) {

					this.requestRegistrations();
					binding.updateElement(model, element);
					createCallback(model, element);
				}
			}

			boundElements = elements;
		};

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

		var self = this;

		function createCallback(model, element) {

			self.assignUpdater(function() {

				if (!self.running) {

					self.running = true;
					binding.updateElement(model, element);
					self.running = false;
				}
			},
			binding,
			element);
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

	Binder.prototype = new Subscriber();

	return Binder;
});
