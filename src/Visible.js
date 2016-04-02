function Visible(visible) {

	var self = this;

	this.applyBinding = function(scope, name, model) {

		var elements = this.getAllMatchingElements(scope, name);

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

	this.removeBinding = function() {};
}

Visible.prototype = new Subscriber();
