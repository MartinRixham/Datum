function BindingRoot(model) {

	this.assertUniqueness();

	var injectProperty = function(key, property) {

		var datum = new Datum(property);

		Object.defineProperty(model, key, {

			get: function() { return datum(); },
			set: function(value) { datum(value); }
		});
	};

	// This loop is responsible for rebinding the data structure
	// after dom mutations.
	// It reapplies every binding though need not be applied to the 
	// root object.
	var rebind = function(model) {

		for(var key in model) {

			var property = model[key];

			if (property && property.isBinding) {
	
				property.rebind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				var element =
					model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					if (!element._rebind) {

						element._rebind = function() {};
					}

					property._scope = element;

					if (property instanceof Array) {

						applyForeachBinding(element, property);
					}
					else {

						rebind(property);
					}
				}
			}
		}
	};

	var self = this;

	var applyWithBinding = function(scope, model, key, element) {

		var children = [];

		for (var i = 0; i < element.children.length; i++) {

			children[i] = element.children[i];
		}

		self.requestRegistrations();

		var object = model[key];

		if (!object) {

			children.forEach(function(child) {

				element.removeChild(child);
			});
		}

		self.assignUpdater(function() {

			var object = model[key];

			for (var i = element.children.length - 1; i >= 0; i--) {

				element.removeChild(element.children[i]);
			}

			if (object) {

				children.forEach(function(child) {

					element.appendChild(child);
				});

				bindObject(element, object);
			}
		});
	};

	var applyForeachBinding = function(scope, model) {

		var child = scope.children[0];

		scope.removeChild(child);

		model.forEach(function() {

			scope.appendChild(child.cloneNode(true));
		});
	};

	// This loop is responsible for binding the data structure
	// both initially when the binding root is created and
	// after a new binding is added.
	// It only applies bindings that have not previously been bound.
	var bindObject = function(scope, model) {

		if (model instanceof Array) {

			applyForeachBinding(scope, model);

			return;
		}

		var newBinding = !model._scope;

		if (newBinding) {

			model._scope = scope;

			scope._rebind = function() {
	
				rebind(model);
			};
		}

		for(var key in model) {

			var property = model[key];
	
			var element = 
				scope.querySelector("[data-bind=" + key + "]");

			if (property && property.isBinding) {
	
				property.bind(model._scope, key);
			}
			else if (typeof(property) != "function") {

				if (newBinding) {

					injectProperty(key, property);
				}

				if (element && typeof(property) == "object") {

					if (newBinding) {

						applyWithBinding(scope, model, key, element);
					}

					if (property) {

						bindObject(element, property);
					}
				}
			}
		}
	};

	var scope = document.querySelector("body");

	bindObject(scope, model);

	this.rebindDataStructure(function() {

		bindObject(scope, model);
	});

	var observer = new MutationObserver(function(mutations) {

		var mutation = mutations[0];

		var notTextMutation = mutation.target.children.length; 

		if (notTextMutation) {

			var element = mutation.target;

			while (element) {

				if (element._rebind) {

					element._rebind();
					break;
				}
				else {

					element = element.parentElement;
				}
			}
		}
	});

	observer.observe(scope, { childList: true, subtree: true });

	this.disconnect = function() {

		observer.disconnect();
	};
}

BindingRoot.prototype = new UniqueRoot();
