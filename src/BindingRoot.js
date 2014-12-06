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
			else if (property && typeof(property) == "object") {

				if (element) {

					bindObject(element, property);
				}
			}
			else if ((typeof(property) != "function") && newBinding) {

				injectProperty(key, property);

				if (element && !property) {

					scope.removeChild(element);
				}
			}
		}
	};

	var scope = document.querySelector("body");

	bindObject(scope, model);

	this.rebind(function() {

		bindObject(scope, model);
	});

	var forceRebind = function(model) {

		for(var key in model) {

			var property = model[key];

			if (property && property.isBinding) {
	
				property.rebind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				var element =
					model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					property._scope = element;

					forceRebind(property);
				}
			}
		}
	};

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
