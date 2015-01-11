function Click(click) {

	this.addListener = function(element, model) {

		element.addEventListener("click", function(event) {

			click.call(model, element);
		});
	};

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(click) + 1;

			if (!alreadyBound) {

				this.addListener(element, model);

				element.callbacks.push(click);
			}
		}
	};
}

Click.prototype = new Subscriber();
