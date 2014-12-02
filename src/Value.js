function Value(value) {

	this.bind = function(scope, name) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(value) == "function") {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				element.value = value();

				if (value.isDatum) {

					element.addEventListener("change", function(event) {

						value(event.target.value);
					});
				}
			}

			this.requestRegistrations();

			value();

			this.applyUpdaters(function() {

				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				for (var i = 0; i < elements.length; i++) {

					elements[i].value = value();
				}
			});
		}
		else {

			for (i = 0; i < elements.length; i++) {

				elements[i].value = value;
			}
		}	
	};
}

Value.prototype = new Subscriber();
