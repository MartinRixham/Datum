function Visible(visible) {

	this.applyBinding = function(scope, name, model) {

		var self = this;

		this.applyCallback = function(element, display) {

			self.assignUpdater(function() {

				if(visible.call(model, element)) {

					element.style.display = display;
				}
				else {

					element.style.display = "none";
				}
			},
			this,
			element);
		};

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				var display = getComputedStyle(element).getPropertyValue("display");

				this.requestRegistrations();
		
				if(!visible.call(model, element)) {

					element.style.display = "none";	
				}

				this.applyCallback(element, display);
			}
		}
	};
}

Visible.prototype = new Subscriber();
