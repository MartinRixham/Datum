define(["Subscriber"], function Init(Subscriber) {

	function Init(init) {

		this.applyBinding = function(scope, name, model) {

			var elements = this.getMatchingElements(scope, name);

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

		this.removeBinding = function() {};
	}

	Init.prototype = new Subscriber();

	return Init;
});
