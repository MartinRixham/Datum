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

			element.value = accessor();

			if (value.isDatum) {

				element.addEventListener("change", function(event) {

					accessor(event.target.value);
				});

				value.update(function(updatedValue) {

					element.value = updatedValue;
				});
			}
		}
	};
}
