function Visible(visible) {

	this.bind = function(scope, name, model) {

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

			var display = getComputedStyle(element).getPropertyValue("display");

			this.requestRegistrations();
		
			if(!visible.call(model, element)) {

				element.style.display = "none";	
			}

			applyCallback(element, display);
		}
	};
}

Visible.prototype = new Subscriber();
