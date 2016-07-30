define(["Subscriber"], function Text(Subscriber) {

	function Text(text) {

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
					element.textContent = text.call(model, element);
					createCallback(model, element);
				}
			}

			boundElements = elements;
		};

		function removeOldBindings(elements) {

			for (var i = 0; i < boundElements.length; i++) {

				var boundElement = boundElements[i];

				if (doesNotContain(elements, boundElement)) {

					resetElement(boundElement);
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

				if (!text._running) {

					text._running = true;
					element.textContent = text.call(model, element);
					text._running = false;
				}
			},
			text,
			element);
		}

		this.removeBinding = function() {

			for (var i = 0; i < boundElements.length; i++) {

				resetElement(boundElements[i]);
			}

			boundElements = [];
			parentModel = null;
		};

		function resetElement(element) {

			element.textContent = "";
		}

		this.test = {

			call: function(element) {

				text.call(parentModel, element);
			}
		};
	}

	Text.prototype = new Subscriber();

	return Text;
});
