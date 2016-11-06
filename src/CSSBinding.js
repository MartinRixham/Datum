define([], function() {

	function CSSBinding(callbacks) {

		this.setUpElement = function() {};

		this.updateElement = function(parentModel, element) {

			var classes = splitClasses(element);

			for (var key in callbacks) {

				var index = classes.indexOf(key);

				if (callbacks[key].call(parentModel, element)) {

					if (index < 0) {

						classes.push(key);
					}
				}
				else {

					if (index + 1) {

						classes.splice(index, 1);
					}
				}
			}

			element.className = classes.join(" ");
		};

		function splitClasses(element) {

			var classes;

			if (element.className) {

				classes = element.className.split(" ");
			}
			else {

				classes = [];
			}

			return classes;
		}

		this.resetElement = function() {};

		this.call = function(parentModel, element) {

			for (var key in callbacks) {

				callbacks[key].call(parentModel, element);
			}
		};
	}

	return CSSBinding;
});
