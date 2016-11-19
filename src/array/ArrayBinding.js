define([
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

		var arrayElements = [];

		(function createProperties() {

			for (var i = 0; i < model.length; i++) {

				properties.push(new TransientProperty(model[i], propertyType));
			}
		})();

		(function createArrayMethods() {

			new Push(model, arrayElements, properties, propertyType);
			new Pop(model, arrayElements, properties);
			new Shift(model, arrayElements, properties);
			new Unshift(model, arrayElements, properties, propertyType);
			new Reverse(model, arrayElements, properties);
			new Sort(model, arrayElements, properties);
			new Splice(model, arrayElements, properties, propertyType);
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

			var arrayElement = element.toArrayElement(model.length);
			arrayElements.push(arrayElement);
		};

		this.updateElement = function(parentModel, element, value) {

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element, i, value);
			}
		};

		this.resetElement = function(element) {

			var child;

			for (var i = 0; i < arrayElements.length; i++) {

				if (arrayElements[i].equals(element)) {

					child = arrayElements[i].getChild();
					arrayElements.splice(i, 1);
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
