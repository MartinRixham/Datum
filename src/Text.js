function Text(text) {

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(text) == "function") {

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
		}
		else {

			for (var j = 0; j < elements.length; j++) {

				elements[j].textContent = text;
			}
		}
	};
}

Text.prototype = new Subscriber();
