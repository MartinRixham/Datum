// The array binding is applied when an array is bound to an element.
// It copies the contents of the element to which it is bound
// once for each element of the array.
BindingRoot.ViewModel.ArrayBinding = function(model) {

	var currentElement = null;

	var properties = [];

	var bindings = [];

	model.subscribableLength = model.length;

	var lengthBinding = new BindingRoot.ViewModel.Property(model.subscribableLength);

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

				properties[k] = new BindingRoot.ViewModel(model[k]);
			}
		}
	}

	function bind(element) {

		element._rebind = function() {};

		currentElement = element;

		if (element.children.length != 1) {

			throw new Error(
				"An array must be bound to an element with exactly one child.");
		}

		var child = element.children[0];

		element.removeChild(child);

		arrayElement = new BindingRoot.ViewModel.ArrayBinding.ArrayElement(child);

		append(model, element);

		bindings.push(
			new BindingRoot.ViewModel.ArrayBinding.Push(model, arrayElement),
			new BindingRoot.ViewModel.ArrayBinding.Pop(model),
			new BindingRoot.ViewModel.ArrayBinding.Shift(model),
			new BindingRoot.ViewModel.ArrayBinding.Unshift(model, arrayElement, properties),
			new BindingRoot.ViewModel.ArrayBinding.Splice(model, arrayElement, properties),
			new BindingRoot.ViewModel.ArrayBinding.Sort(model),
			new BindingRoot.ViewModel.ArrayBinding.Reverse(model));
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

					properties.push(new BindingRoot.ViewModel.ArrayBinding(property));
				}
				else {

					properties.push(new BindingRoot.ViewModel(property));
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
};

BindingRoot.ViewModel.ArrayBinding.prototype = new Subscriber();
