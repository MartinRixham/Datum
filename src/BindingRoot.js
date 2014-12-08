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
					scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					property._scope = element;

					rebind(property);
				}
			}
		}
	};

	var attachRebinder = function(element, model) {

		element._rebind = function() {
	
			rebind(model);
		};
	};

	var self = this;

	var applyWithBinding = function(scope, model, key, element) {

		var child = element.children[0];
	
		var children = [];

		for (var i = element.children.length - 1; i >= 0; i--) {

			children[i] = element.children[i];
		}

		var clone = element.cloneNode(true);

		self.requestRegistrations();

		var object = model[key];

		if (!object) {

			for (i = 0; i < children.length; i++) {

				element.removeChild(children[i]);
			}
		}

		self.assignUpdater(function() {

			var object = model[key];

			if (!object && child) {

				element.removeChild(child);
			}
			else if(!element.contains(child)) {

				element.appendChild(clone);

				bindObject(scope, object);
			}
		});
	};

	// This loop is responsible for binding the data structure
	// both initially when the binding root is created and
	// after a new binding is added.
	// It only applies bindings that have not previously been bound.
	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		if (newBinding) {

			model._scope = scope;

			attachRebinder(scope, model);
		}

		for(var key in model)
		{
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

					if (property) {

						bindObject(element, property);
					}

					applyWithBinding(scope, model, key, element);
				}
			}
		}
	};

	var scope = document.querySelector("body");

	bindObject(scope, model);

	this.rebind(function() {

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
