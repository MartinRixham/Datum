function Value(value) {

	this.addListener = function(element, model) {

		element.addEventListener("change", function(event) {
					
			value.call(model, event.target.value);
		});
	};

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		if (typeof(value) == "function") {

			this.requestRegistrations();

			var evaluated = value.call(model);

			this.assignUpdater(function() {

				var elements = scope.querySelectorAll("[data-bind=" + name + "]");

				var evaluated = value.call(model);

				for (var i = 0; i < elements.length; i++) {

					elements[i].value = evaluated;
				}
			});

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (typeof(evaluated) != "undefined") {

					element.value = evaluated;
				}

				this.addListener(element, model);
			}
		}
		else {

			for (var j = 0; j < elements.length; j++) {

				elements[j].value = value;
			}
		}	
	};
}

Value.prototype = new Subscriber();
