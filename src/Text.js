function Text(text) {

	var model = null;

	this.createCallback = function(model, element) {

		this.assignUpdater(function() {

			element.textContent = text.call(model, element);
		},
		text,
		element);
	};

	this.applyBinding = function(scope, name, model) {

		model = model;

		var elements = this.matchingElements(scope, name);
		
		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				this.requestRegistrations();

				element.textContent = text.call(model, element);

				this.createCallback(model, element);
			}
		}
	};

	this.test = {

		call: function(element) {

			text.call(model, element);
		}
	};
}

Text.prototype = new Subscriber();
