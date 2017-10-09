define([
	"element/ElementSet",
	"tracking/Registry",
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
	ElementSet,
	Registry,
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
		var boundElements = new ElementSet();

		(function createProperties() {

			for (var i = 0; i < model.length; i++) {

				properties.push(new TransientProperty(model[i], propertyType));
			}
		})();

		(function createArrayMethods() {

			var elements = boundElements.get();

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

		this.applyBinding = function(element, parentModel, name) {

			var removed = boundElements.removeOld();
			resetElements(removed);

			if (element.get()) {

				bindElements(element.toArrayElement(model.length), parentModel, name);
			}
		};

		function bindElements(element, parentModel, name) {

			if (boundElements.contains(element)) {

				updateElement(element, parentModel && parentModel[name]);
			}
			else {

				boundElements.add(element);
				new Registry().requestRegistrations();
				updateElement(element, parentModel && parentModel[name]);
			}
		}

		function updateElement(element, value) {

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element.getChildAtIndex(i), value);
			}
		}

		this.removeBinding = function() {

			var elements = boundElements.get();

			resetElements(elements);
		};

		function resetElements(elements) {

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (element.get()) {

					element.reset();
					boundElements.remove(element);
				}
			}
		}
	}

	return ArrayBinding;
});
