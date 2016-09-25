define(["TransientProperty"], function(TransientProperty) {

	function ArrayBinding(propertyType) {

		var properties = [];

		this.setUpElement = function(parentModel, element, model) {

			element._rebind = function() {};

			if (element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}

			var child = element.children[0];

			element.removeChild(child);

			for (var i = 0; i < model.length; i++) {

				element.appendChild(child.cloneNode(true));
				properties[i] = new TransientProperty(model[i], propertyType);
			}
		};

		this.updateElement = function(parentModel, element, value) {

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element, i, value);
			}
		};

		this.resetElement = function() {};
	}

	return ArrayBinding;
});
