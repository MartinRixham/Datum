function Click(click) {

	this.addListener = function(element, model) {

		element.addEventListener("click", function(event) {

			click.call(model, event.target);
		});
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
