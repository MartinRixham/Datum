function BindingRoot(model) {

	this.assertUniqueness();

	var injectProperty = function(key, model, property) {

		var datum = new Datum(property);

		Object.defineProperty(model, key, {

			get: function() { return datum(); },
			set: function(value) { datum(value); }
		});
	};

	var self = this;

	// This method binds an object to a DOM element.
	// It is called recursively to bind the entire data structure.
	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		model._scope = scope;

		if (model instanceof Array) {

			var foreach = new BindingRoot.ForEach(scope, model);

			return;
		}

		if (!model.toJSON) {

			new ViewModel(model);
		}

		scope._rebind = function() {
	
			bindObject(scope, model);
		};

		for(var key in model) {

			if (key == "_scope") {

				continue;
			}

			var property = model[key];
	
			var element = 
				scope.querySelector("[data-bind=" + key + "]");

			if (property && property.applyBinding) {
	
				property.applyBinding(model._scope, key, model);
			}
			else if (typeof(property) != "function") {

				if (newBinding) {

					injectProperty(key, model, property);
				}

				if (element && typeof(property) == "object") {

					new BindingRoot.With(model, key, element);

					if (property) {

						bindObject(element, property);
					}
				}
			}
		}
	};

	this.importWith(bindObject);
	this.importForeach(bindObject, BindingRoot.With);

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

BindingRoot.importWith = function(constructor) {

	BindingRoot.prototype.importWith = function(bindObject) {

		BindingRoot.With = constructor(bindObject);
	};	
};

BindingRoot.importForeach = function(constructor) {

	BindingRoot.prototype.importForeach = function(bindObject, With) {

		BindingRoot.ForEach = constructor(bindObject, With);
	};	
};

BindingRoot.prototype = new UniqueRoot();
