function Init(init) {

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(init) + 1;

			if (!alreadyBound && this.isInScope(element, scope)) {

				init.call(model, element);

				element.callbacks.push(init);
			}
		}
	};
}

Init.prototype = new Subscriber();
