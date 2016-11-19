define([
	"array/ArrayElement",
	"property/TransientProperty",
	"tracking/Datum",
	"array/method/Push",
	"array/method/Pop_",
	"array/method/Shift",
	"array/method/Unshift",
	"array/method/Reverse",
	"array/method/Sort",
	"array/method/Splice"
], function(
	ArrayElement,
	TransientProperty,
	Datum,
	Push,
	Pop,
	Shift,
	Unshift,
	Reverse,
	Sort,
	Splice) {

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
			new Splice(model, elementChildren, properties, propertyType);
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

			element.createRebinder(function() {});

			checkElementHasOnlyOneChild(element.get());

			var child = getChildFromDOM(element.get());

			elementChildren.push({ element: element.get(), child: child });

			for (var i = 0; i < model.length; i++) {

				element.get().appendChild(child.clone());
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

		this.resetElement = function(element) {

			var child;

			for (var i = 0; i < elementChildren.length; i++) {

				if (element.get() == elementChildren[i].element) {

					child = elementChildren[i].child;
					elementChildren.splice(i, 1);
				}
			}

			while (element.get().lastChild) {

				element.get().removeChild(element.get().lastChild);
			}

			element.get().appendChild(child.get());
		};
	}

	return ArrayBinding;
});
