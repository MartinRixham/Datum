function Visible(visible) {

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		var self = this;

		var applyCallback = function(element, display) {

			self.assignUpdater(function() {

				if(visible.call(model, element)) {

					element.style.display = display;
				}
				else {

					element.style.display = "none";
				}
			});
		};

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(visible) + 1;

			if (!alreadyBound) {

				var display = getComputedStyle(element).getPropertyValue("display");

				this.requestRegistrations();
		
				if(!visible.call(model, element)) {

					element.style.display = "none";	
				}

				applyCallback(element, display);

				element.callbacks.push(visible);
			}
		}
	};
}

Visible.prototype = new Subscriber();
