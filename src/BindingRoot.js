function BindingRoot(model) {

	this.assertUniqueness();

	var injectProperty = function(key, model, property) {

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
	var rebind = function(scope, model) {

		if (model) {

			model._scope = scope;
		}

		for(var key in model) {

			var property = model[key];

			if (property && property.isBinding) {
	
				property.rebind(model._scope, key, model);
			}
			else if (typeof(property) == "object") {

				var element =
					model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					if (!element._rebind) {

						element._rebind = function() {};
					}

					applyWithBinding(model, key, element);

					if (property) {

						property._scope = element;
					}

					if (property instanceof Array) {

						var foreach = new ForEach(property);

						foreach.bind(element, key);
					}
					else {

						rebind(element, property);
					}
				}
			}
		}
	};

	var self = this;

	var applyWithBinding = function(model, key, element) {

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

	function ForEach(model) {

		model.isBinding = true;

		var bound = false;

		model.bind = function(scope, name) {

			if (!bound) {

				model.rebind(scope, name);
			}
		};

		this.number = function(element, index) {

			if (element.id) {

				element.id = element.id + "_" + index;
			}

			if (element.hasAttribute && element.hasAttribute("name")) {

				element.setAttribute("name", element.getAttribute("name") + "_" + index);
			}

			if (element.children) {

				for (var i = 0; i < element.children.length; i++) {

					var subelement = element.children[i];

					this.number(subelement, index);
				}
			}
		};

		var self = this;

		model.rebind = function(scope, name) {

			bound = true;

			scope._rebind = function() {};

			if (name) {

				scope = scope.querySelector("[data-bind=" + name + "]") || scope; 
			}

			var children = [];

			for (var i = scope.childNodes.length - 1; i >= 0; i--) {

				children[i] = scope.childNodes[i];

				scope.removeChild(scope.childNodes[i]);
			}

			var index = 0;

			model.append = function(array) {

				for (var i = 0; i < array.length; i++) {

					var property = array[i];

					var element = document.createElement("DIV");

					children.forEach(function(child) {

						var clone = child.cloneNode(true);

						self.number(clone, index);

						element.appendChild(clone);
					});

					index += 1;

					scope.appendChild(element);

					rebind(element, property);
				}
			};

			model.append(model);

			var originalPush = model.push;

			model.push = function() {

				originalPush.apply(model, arguments);

				model.append(arguments);
			};
		};

		return model;
	}

	// This loop is responsible for binding the data structure
	// both initially when the binding root is created and
	// after a new binding is added.
	// It only applies bindings that have not previously been bound.
	var bindObject = function(scope, model) {

		if (model instanceof Array) {

			var foreach = new ForEach(model);

			foreach.bind(scope);	

			return;
		}

		var newBinding = !model._scope;

		if (newBinding) {

			model._scope = scope;

			scope._rebind = function() {
	
				rebind(scope, model);
			};
		}

		for(var key in model) {

			if (key == "_scope") {

				continue;
			}

			var property = model[key];
	
			var element = 
				scope.querySelector("[data-bind=" + key + "]");

			if (property && property.isBinding) {
	
				property.bind(model._scope, key, model);
			}
			else if (typeof(property) != "function") {

				if (newBinding) {

					injectProperty(key, model, property);
				}

				if (element && typeof(property) == "object") {

					if (newBinding) {

						applyWithBinding(model, key, element);
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
