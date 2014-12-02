function Text(text) {

	this.bind = function(scope, name) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(text) == "function") {

			for (var i = 0; i < elements.length; i++) {

				elements[i].textContent = text();
			}

			this.requestRegistrations();
		
			text();

			this.applyUpdaters(function() {
		
				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				for (var i = 0; i < elements.length; i++) {

					elements[i].textContent = text();
				}
			});
		}
		else {

			for (i = 0; i < elements.length; i++) {

				elements[i].textContent = text;
			}
		}
	};
}

Text.prototype = new Subscriber();
