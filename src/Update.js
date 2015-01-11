function Update(update) {

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		var self = this;

		var applyCallback = function(element) {

			self.assignUpdater(function() {

				update.call(model, element);
			});
		};

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(update) + 1;

			if (!alreadyBound) {
	
				this.requestRegistrations();
		
				update.call(model, element);

				applyCallback(element);

				element.callbacks.push(update);
			}
		}
	};
}

Update.prototype = new Subscriber();
