define([
	"ArrayElement",
	"TransientProperty",
	"Datum",
	"Push",
	"Pop_",
	"Shift",
	"Unshift",
	"Reverse",
	"Sort"
], function(
	ArrayElement,
	TransientProperty,
	Datum,
	Push,
	Pop,
	Shift,
	Unshift,
	Reverse,
	Sort) {

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
			new Sort(model, elementChildren, properties);
		})();

		(function createSubscribableLength() {

			var length = new Datum(model.length);

			Object.defineProperty(model, "subscribableLength", {

				get: function() {

					return length();
				},
				set: function(value) {

					length(value);
				}
			});
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
