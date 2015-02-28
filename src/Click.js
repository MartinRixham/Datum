function Click(click) {

	this.addListener = function(element, model) {

		element.addEventListener("click", function(event) {

			click.call(model, element);
		});
	};

	this.applyBinding = function(scope, name, model) {

		var elements = this.matchingElements(scope, name);

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(click) + 1;

			if (!alreadyBound && this.isInScope(element, scope)) {

				this.addListener(element, model);

				element.callbacks.push(click);
			}
		}
	};
}

Click.prototype = new Subscriber();
