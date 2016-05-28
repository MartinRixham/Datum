define([
	"Property",
	"ViewModel",
	"ObjectBinding",
	"ArrayElement",
	"Push",
	"Pop_",
	"Shift",
	"Unshift",
	"Splice",
	"Sort",
	"Reverse",
	"Subscriber"
], function(
	Property,
	ViewModel,
	ObjectBinding,
	ArrayElement,
	Push,
	Pop,
	Shift,
	Unshift,
	Splice,
	Sort,
	Reverse,
	Subscriber) {

	// The array binding is applied when an array is bound to an element.
	// It copies the contents of the element to which it is bound
	// once for each element of the array.
	function ArrayBinding(model) {

		var currentElement = null;

		var properties = [];

		var bindings = [];

		model.subscribableLength = model.length;

		var lengthBinding = new Property(model.subscribableLength);

		var arrayElement = null;

		this.applyBinding = function(scope, name) {

			var element = this.getMatchingElement(scope, name);

			if (element) {

				if (element == currentElement) {

					refreshBindings(element);
				}
				else {

					bind(element);
				}
			}

			lengthBinding.applyBinding(element, "subscribableLength", model);

			for (var i = 0; i < properties.length; i++) {

				properties[i].applyBinding(element, i);
			}

			for (var j = 0; j < bindings.length; j++) {

				bindings[j].applyBinding(scope, name);
			}
		};

		function refreshBindings(element) {

			for (var k = 0; k < model.length; k++) {

				if (model[k].applyBinding) {

					model[k].applyBinding(
						element,
						k,
						model);
				}
				else if (element.children[k]) {

					properties[k] = new ViewModel(model[k]);
				}
			}
		}

		function bind(element) {

			element._rebind = function() {
			};

			currentElement = element;

			if (element.children.length != 1) {

				throw new Error(
					"An array must be bound to an element with exactly one child.");
			}

			var child = element.children[0];

			element.removeChild(child);

			arrayElement = new ArrayElement(child);

			append(model, element);

			bindings.push(
				new Push(model, arrayElement),
				new Pop(model),
				new Shift(model),
				new Unshift(model, arrayElement, properties),
				new Splice(model, arrayElement, properties),
				new Sort(model),
				new Reverse(model));
		}

		function append(array, element) {

			for (var i = 0; i < array.length; i++) {

				var property = array[i];

				var newElement = arrayElement.clone();

				element.appendChild(newElement);

				if (property && property.applyBinding && property.removeBinding) {

					properties.push(property);
				}
				else if (property && typeof(property) == "object") {

					if (property instanceof Array) {

						properties.push(new ArrayBinding(property));
					}
					else {

						properties.push(new ViewModel(property));
					}
				}
			}
		}

		this.removeBinding = function() {

			var element = currentElement;

			var children = element.children;

			for (var i = children.length - 1; i >= 0; i--) {

				element.removeChild(children[i]);
			}

			var newElement = arrayElement.clone();

			element.appendChild(newElement);
		};
	}

	ArrayBinding.prototype = new Subscriber();

	// Break circular dependency.
	ObjectBinding.ArrayBinding = ArrayBinding;

	return ArrayBinding;
});
