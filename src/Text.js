function Text(text) {

	this.createCallback = function(model, element) {

		this.assignUpdater(function() {

			element.textContent = text.call(model, element);
		});
	};

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");
		
		for (var i = 0; i < elements.length; i++) {

			this.requestRegistrations();

			elements[i].textContent = text.call(model, elements[i]);

			this.createCallback(model, elements[i]);
		}
	};
}

Text.prototype = new Subscriber();
