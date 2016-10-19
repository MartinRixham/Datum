define([
	"ArrayElement",
	"TransientProperty",
	"Push",
	"Pop_",
	"Shift",
	"Unshift",
	"Reverse"
], function(
	ArrayElement,
	TransientProperty,
	Push,
	Pop,
	Shift,
	Unshift,
	Reverse) {

	function ArrayBinding(model, propertyType) {

		var properties = [];

		var elementChildren = [];

		(function createProperties() {

			for (var i = 0; i < model.length; i++) {

				properties.push(new TransientProperty(model[i], propertyType));
			}
		})();

		(function createArrayMethods() {

			new Push(model, elementChildren, properties, propertyType);
			new Pop(model, elementChildren, properties);
			new Shift(model, elementChildren, properties);
			new Unshift(model, elementChildren, properties, propertyType);
			new Reverse(model, elementChildren, properties);
		})();

		this.setUpElement = function(parentModel, element, model) {

			element._rebind = function() {};

			checkElementHasOnlyOneChild(element);

			var child = getChildFromDOM(element);

			elementChildren.push({ element: element, child: child });

			for (var i = 0; i < model.length; i++) {

				element.appendChild(child.clone());
			}
		};

		function checkElementHasOnlyOneChild(element) {

			if (element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}
		}

		function getChildFromDOM(element) {

			var child = element.children[0];

			element.removeChild(child);

			return new ArrayElement(child);
		}

		this.updateElement = function(parentModel, element, value) {

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element, i, value);
			}
		};

		this.resetElement = function() {};
	}

	return ArrayBinding;
});
