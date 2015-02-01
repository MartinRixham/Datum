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

	// The "with" binding is the binding that is applied automatically
	// and by convention whenever a plain object is bound to an element.
	// Its effect is to remove all child elements from the DOM
	// when the object is null.
	var applyWithBinding = function(model, key, element) {

		if (!element.boundObjects) {

			element.boundObjects = [];
		}

		var alreadyBound = element.boundObjects.indexOf(model) + 1;

		if (alreadyBound) {

			return;
		}

		element.boundObjects.push(model);

		var children = [];

		for (var i = 0; i < element.childNodes.length; i++) {

			children[i] = element.childNodes[i];
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

			for (var i = element.childNodes.length - 1; i >= 0; i--) {

				element.removeChild(element.childNodes[i]);
			}

			if (object) {

				children.forEach(function(child) {

					element.appendChild(child);
				});

				bindObject(element, object);
			}
		});
	};

	// This method binds an object to a DOM element.
	// It is called recursively to bind the entire data structure.
	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		model._scope = scope;

		if (model instanceof Array) {

			var foreach = new self.ForEach(scope, model);

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

					applyWithBinding(model, key, element);

					if (property) {

						bindObject(element, property);
					}
				}
			}
		}
	};

	this.importForeach(bindObject);

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

BindingRoot.importForeach = function(constructor) {

	BindingRoot.prototype.importForeach = function(bindObject) {

		BindingRoot.prototype.ForEach = constructor(bindObject);
	};	
};

BindingRoot.prototype = new UniqueRoot();
