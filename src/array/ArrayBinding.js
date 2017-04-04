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

		var elements = [];

		(function createProperties() {

			for (var i = 0; i < model.length; i++) {

				properties.push(new TransientProperty(model[i], propertyType));
			}
		})();

		(function createArrayMethods() {

			new Push(model, elements, properties, propertyType);
			new Pop(model, elements, properties);
			new Shift(model, elements, properties);
			new Unshift(model, elements, properties, propertyType);
			new Reverse(model, elements, properties);
			new Sort(model, elements, properties);
			new Splice(model, elements, properties, propertyType);
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
			elements.push(arrayElement);
		};

		this.updateElement = function(parentModel, element, value) {

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element, i, value);
			}
		};

		this.resetElement = function(element) {

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					elements[i].reset();
					elements.splice(i, 1);
				}
			}
		};

		this.createCallback = function() {};
	}

	return ArrayBinding;
});
