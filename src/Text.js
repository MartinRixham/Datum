function Text(text) {

	this.createCallback = function(model, element) {

		this.assignUpdater(function() {

			element.textContent = text.call(model, element);
		});
	};

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");
		
		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(text) + 1;

			if (!alreadyBound) {

				this.requestRegistrations();

				element.textContent = text.call(model, element);

				this.createCallback(model, element);

				element.callbacks.push(text);
			}
		}
	};
}

Text.prototype = new Subscriber();
