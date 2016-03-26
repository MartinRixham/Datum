function Visible(visible) {

	this.applyBinding = function(scope, name, model) {

		var self = this;

		this.applyCallback = function(element) {

			self.assignUpdater(function() {

				if (!visible._running) {

					visible._running = true;

					if(visible.call(model, element)) {

						element.style.display = null;
					}
					else {

						element.style.display = "none";
					}

					visible._running = false;
				}
			},
			visible,
			element);
		};

		var elements = this.matchingElements(scope, name);

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				this.requestRegistrations();

				if(!visible.call(model, element)) {

					element.style.display = "none";
				}

				this.applyCallback(element);
			}
		}
	};
}

Visible.prototype = new Subscriber();
