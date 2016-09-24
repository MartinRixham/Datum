define([], function() {

	function ArrayBinding() {

		this.setUpElement = function(parentModel, element, model) {

			if (element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}

			var child = element.children[0];

			element.removeChild(child);

			for (var i = 0; i < model.length; i++) {

				element.appendChild(child.cloneNode(true));
			}
		};

		this.updateElement = function() {};

		this.resetElement = function() {};
	}

	return ArrayBinding;
});
