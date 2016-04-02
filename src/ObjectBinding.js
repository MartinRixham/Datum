// The object binding is the binding that is applied automatically
// and by convention whenever a plain object is bound to an element.
// Its effect is to remove all child elements from the DOM
// when the object is null.
BindingRoot.With = function(property) {

	if (property instanceof Array) {

		this.binding = new BindingRoot.ViewModel.ArrayBinding(property);
	}
	else if (property) {

		this.binding = new BindingRoot.ViewModel(property);
	}

	this.applyBinding = function(scope, key, model) {

		var element;

		var elements = this.getAllMatchingElements(scope, key);

		if (elements.length > 1) {

			throw new Error("Objects can only be bound to one element.");
		}
		else if (elements.length) {

			element = elements[0];
		}

		if (element) {

			var children = [];

			for (var i = 0; i < element.childNodes.length; i++) {

				children[i] = element.childNodes[i];
			}

			this.requestRegistrations();

			property = model[key];

			if (!property) {

				for (var j = element.childNodes.length - 1; j >= 0; j--) {

					element.removeChild(element.childNodes[j]);
				}
			}

			var self = this;

			this.assignUpdater(function (property) {

				for (var i = element.childNodes.length - 1; i >= 0; i--) {

					element.removeChild(element.childNodes[i]);
				}

				if (property) {

					children.forEach(function(child) {

						element.appendChild(child);
					});

					if (property instanceof Array) {

						self.binding = new BindingRoot.ViewModel.ArrayBinding(property);
					}
					else {

						self.binding = new BindingRoot.ViewModel(property);
					}

					self.binding.applyBinding(scope, key, model);
				}
			},
			this,
			element);
		}

		if (!element || this.isInScope(element, scope)) {

			if (this.binding) {

				this.binding.applyBinding(scope, key, model);
			}
		}
	};

	this.removeBinding = function() {};
};

BindingRoot.With.prototype = new Subscriber();
