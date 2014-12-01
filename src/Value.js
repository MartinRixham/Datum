function Value(value) {

	this.bind = function(scope, name) {

		var accessor = function() {};

		if (typeof(value) == "function") {

			accessor = value;

			if (accessor() && accessor().isDatum) {

				accessor = accessor();
			}
		}
		else {

			accessor = function() { return value; };
		}

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			element.value = accessor();

			if (accessor.isDatum) {

				element.addEventListener("change", function(event) {

					accessor(event.target.value);
				});

				accessor.update(function(updatedValue) {

					element.value = updatedValue;
				});
			}
		}
	};
}
