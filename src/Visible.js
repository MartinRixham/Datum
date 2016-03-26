function Visible(visible) {

	var self = this;

	function applyCallback(element, model) {

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
	}

	this.applyBinding = function(scope, name, model) {

		var elements = this.matchingElements(scope, name);

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (this.isInScope(element, scope)) {

				this.requestRegistrations();

				if(!visible.call(model, element)) {

					element.style.display = "none";
				}

				applyCallback(element, model);
			}
		}
	};
}

Visible.prototype = new Subscriber();
