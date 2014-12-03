function Value(value) {

	this.bind = function(scope, name) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(value) == "function") {

			this.requestRegistrations();

			var evaluated = value();

			this.assignUpdater(function() {

				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				var evaluated = value();

				for (var i = 0; i < elements.length; i++) {

					elements[i].value = evaluated;
				}
			});

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				element.value = evaluated;

				element.addEventListener("change", function(event) {
					
					value(event.target.value);
				});
			}
		}
		else {

			for (i = 0; i < elements.length; i++) {

				elements[i].value = value;
			}
		}	
	};
}

Value.prototype = new Subscriber();
