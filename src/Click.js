function Click(click) {

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			element.addEventListener("click", function(event) {

				click.call(model, event.target);
			});
		}
	};
}

Click.prototype = new Subscriber();
