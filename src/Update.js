function Update(update) {

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		var self = this;

		var applyCallback = function(element) {

			self.assignUpdater(function() {

				update.call(model, element);
			});
		};

		for (var i = 0; i < elements.length; i++) {

			this.requestRegistrations();
		
			update.call(model, elements[i]);

			applyCallback(elements[i]);
		}
	};
}

Update.prototype = new Subscriber();
