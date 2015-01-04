function Text(text) {

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		this.requestRegistrations();
		
		var evaluated = text.call(model);

		this.assignUpdater(function() {
		
			var elements = scope.querySelectorAll("[data-bind=" + name + "]");

			var evaluated = text.call(model);

			for (var i = 0; i < elements.length; i++) {

				elements[i].textContent = evaluated;
			}
		});

		for (var i = 0; i < elements.length; i++) {

			elements[i].textContent = evaluated;
		}
	};
}

Text.prototype = new Subscriber();
