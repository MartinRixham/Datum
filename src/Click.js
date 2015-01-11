function Click(click) {

	this.addListener = function(element, model) {

		if (!element.callbacks) {

			element.callbacks = [];
		}

		var alreadyBound = element.callbacks.indexOf(click) + 1;

		if (!alreadyBound) {

			element.addEventListener("click", function(event) {

				click.call(model, element);
			});

			element.callbacks.push(click);
		}
	};

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			this.addListener(element, model);
		}
	};
}

Click.prototype = new Subscriber();
