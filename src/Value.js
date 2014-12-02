function Value(value) {

	this.bind = function(scope, name) {

		var accessor = function() {};

		if (typeof(value) == "function") {

			accessor = value;
		}
		else {

			accessor = function() { return value; };
		}

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			this.requestRegistrations();

			element.value = accessor();

			this.applyUpdaters(function() {

				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				for (var i = 0; i < elements.length; i++) {

					elements[i].value = accessor();
				}
			});

			if (accessor.isDatum) {

				element.addEventListener("change", function(event) {

					accessor(event.target.value);
				});
			}
		}
	};
}

Value.prototype = new Subscriber();
