function Text(text) {

	var parentModel = null;

	var self = this;

	this.requestRebind();

	this.applyBinding = function(scope, name, model) {

		parentModel = model;

		var elements = this.getAllMatchingElements(scope, name);

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				this.requestRegistrations();

				element.textContent = text.call(model, element);

				createCallback(model, element);
			}
		}
	};

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

	this.removeBinding = function() {};

	this.test = {

		call: function(element) {

			text.call(parentModel, element);
		}
	};
}

Text.prototype = new Subscriber();
