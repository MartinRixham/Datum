function Text(text) {

	this.createCallback = function(model, element) {

		this.assignUpdater(function() {

			element.textContent = text.call(model, element);
		},
		this,
		element);
	};

	this.applyBinding = function(scope, name, model) {

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
}

Text.prototype = new Subscriber();
