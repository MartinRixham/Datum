function Text(text) {

	this.bind = function(scope, name) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(text) == "function") {

			this.requestRegistrations();
		
			var evaluated = text();

			this.assignUpdater(function() {
		
				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				var evaluated = text();

				for (var i = 0; i < elements.length; i++) {

					elements[i].textContent = evaluated;
				}
			});

			for (var i = 0; i < elements.length; i++) {

				elements[i].textContent = evaluated;
			}
		}
		else {

			for (i = 0; i < elements.length; i++) {

				elements[i].textContent = text;
			}
		}
	};
}

Text.prototype = new Subscriber();
