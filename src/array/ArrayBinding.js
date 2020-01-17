define([
	"element/Elements",
	"property/TransientProperty",
	"tracking/Datum",
	"array/method/Push",
	"array/method/Pop",
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

		this.propertyType = propertyType;

		this.boundElements = new Elements();

		this.methods = [];

		(function createProperties(self) {

			for (var i = 0; i < model.length; i++) {

				self.properties[i] = new TransientProperty(model[i], propertyType);
			}
		})(this);

		(function createSubscribableLength() {

			if (typeof model.subscribableLength !== "undefined") {

				return;
			}

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

		if (!this.methods.length) {

			this.methods = this.createArrayMethods();
		}

		if (element.get()) {

			this.bindElements(element, parentModel, name);
		}
	};

	ArrayBinding.prototype.createArrayMethods = function() {

		var elements = this.boundElements.get();

		return [
			new Push(this.model, elements, this.properties, this.propertyType),
			new Pop(this.model, elements, this.properties),
			new Shift(this.model, elements, this.properties),
			new Unshift(this.model, elements, this.properties, this.propertyType),
			new Reverse(this.model, elements, this.properties),
			new Sort(this.model, elements, this.properties),
			new Splice(this.model, elements, this.properties, this.propertyType)
		];
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

		for (var i = 0; i < this.methods.length; i++) {

			this.methods[i].unbind();
		}

		this.methods = [];

		var elements = this.boundElements.empty();

		this.resetElements(elements);
	};

	ArrayBinding.prototype.resetElements = function(elements) {

		for (var i = 0; i < elements.length; i++) {

			elements[i].reset();
		}
	};

	return ArrayBinding;
});
