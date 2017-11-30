define([
	"element/Elements",
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
	Elements,
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

		this.properties = new Array(model.length);

		this.model = model;

		this.boundElements = new Elements();

		var self = this;

		(function createProperties() {

			for (var i = 0; i < model.length; i++) {

				self.properties[i] = new TransientProperty(model[i], propertyType);
			}
		})();

		(function createArrayMethods() {

			var elements = self.boundElements.get();

			new Push(model, elements, self.properties, propertyType);
			new Pop(model, elements, self.properties);
			new Shift(model, elements, self.properties);
			new Unshift(model, elements, self.properties, propertyType);
			new Reverse(model, elements, self.properties);
			new Sort(model, elements, self.properties);
			new Splice(model, elements, self.properties, propertyType);
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

		(function createIndexOf() {

			var flag = new Datum();
			var original = model.indexOf;

			model.indexOf = function() {

				if (arguments.length) {

					flag();
				}
				else {

					flag(true);
				}

				return original.apply(model, arguments);
			};
		})();
	}

	ArrayBinding.prototype.applyBinding = function(element, parentModel, name) {

		var removed = this.boundElements.removeOld();
		this.resetElements(removed);

		if (element.get()) {

			this.bindElements(element, parentModel, name);
		}
	};

	ArrayBinding.prototype.bindElements = function(element, parentModel, name) {

		if (!this.boundElements.contains(element)) {

			this.boundElements.add(element.toArrayElement(this.model.length));
		}

		var arrayElement = this.boundElements.getElementEqualTo(element);
		var value = parentModel[name];

		for (var i = 0; i < this.properties.length; i++) {

			this.properties[i].applyBinding(arrayElement.getChildAtIndex(i), value);
		}
	};

	ArrayBinding.prototype.removeBinding = function() {

		var elements = this.boundElements.get();

		this.resetElements(elements);
	};

	ArrayBinding.prototype.resetElements = function(elements) {

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (element.get()) {

				element.reset();
				this.boundElements.remove(element);
			}
		}
	};

	return ArrayBinding;
});
