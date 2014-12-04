function BindingRoot(model) {

	this.assertUniqueness();

	// This loop is responsible for binding the data structure
	// both initially when the binding root is created and
	// after a new binding is added.
	// It only applies bindings that have not previously been bound.
	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		if (newBinding) {

			model._scope = scope;
		}

		var injectProperty = function(key, property) {

			var datum = new Datum(property);

			Object.defineProperty(model, key, {

				get: function() { return datum(); },
				set: function(value) { datum(value); }
			});
		};

		for(var key in model)
		{
			var property = model[key];
	
			if (property && property.isBinding) {
	
				property.bind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				var element = 
					model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					bindObject(element, property);
				}
			}
			else if ((typeof(property) != "function") && newBinding) {

				injectProperty(key, property);
			}
		}
	};

	var scope = document.querySelector("body");

	bindObject(scope, model);

	this.rebind(function() {

		bindObject(scope, model);
	});

	// This loop is responsible for rebinding the data structure
	// after dom mutations.
	// It reapplies every binding.
	var forceRebind = function(model) {

		for(var key in model)
		{
			var property = model[key];

			if (property && property.isBinding) {
	
				property.rebind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				var element = model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					property._scope = element;

					forceRebind(property);
				}
			}
		}
	};

	var observer = new MutationObserver(function(mutations) {

		var notTextMutation = 
			mutations.some(function(mutation) { 

				return mutation.target.children.length; 
			});

		if (notTextMutation) {

			forceRebind(model);
		}
	});

	observer.observe(scope, { childList: true, subtree: true });
}

BindingRoot.prototype = new UniqueRoot();
