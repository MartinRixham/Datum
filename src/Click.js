define(["Subscriber"], function Click(Subscriber) {

	function Click(click) {

		function addListener(element, model) {

			element.addEventListener("click", function() {

				click.call(model, element);
			});
		}

		this.applyBinding = function(scope, name, model) {

			var elements = this.getMatchingElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (!element.callbacks) {

					element.callbacks = [];
				}

				var alreadyBound = element.callbacks.indexOf(click) + 1;

				if (!alreadyBound && this.isInScope(element, scope)) {

					addListener(element, model);

					element.callbacks.push(click);
				}
			}
		};

		this.removeBinding = function() {
		};
	}

	Click.prototype = new Subscriber();

	return Click;
});
