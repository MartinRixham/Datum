function Text(text) {

	this.createCallback = function(model, element) {

		this.assignUpdater(function() {

			element.textContent = text.call(model, element);
		},
		this);
	};

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");
		
		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			this.requestRegistrations();

			element.textContent = text.call(model, element);

			this.createCallback(model, element);
		}
	};
}

Text.prototype = new Subscriber();
