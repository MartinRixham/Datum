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

	// The "foreach" binding is applied when an array is bound to an element.
	// It copies the contents of the element to which it is bound once
	// foreach element of the array.
	function ForEach(scope, model) {

		var currentScope = null;

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

		this.bind = function(scope) {

			if (scope == currentScope) {

				for (var k = 0; k < model.length; k++) {

					bindObject(scope.children[k], model[k]);
				}

				return;
			}

			scope._rebind = function() {};

			currentScope = scope;

			var children = [];

			for (var i = scope.childNodes.length - 1; i >= 0; i--) {

				children[i] = scope.childNodes[i];

				scope.removeChild(scope.childNodes[i]);
			}

			var index = 0;

			var append = function(array) {

				for (var i = 0; i < array.length; i++) {

					var property = array[i];

					var element = document.createElement(scope.nodeName);

					element.dataset.bind = scope.dataset.bind + "_" + index;

					for (var j = 0; j < children.length; j++) {

						var child = children[j];

						var clone = child.cloneNode(true);

						self.number(clone, index);

						element.appendChild(clone);
					}

					index += 1;

					scope.appendChild(element);

					bindObject(element, property);
				}
			};

			append(model);

			var originalPush = model.push;

			model.push = function() {

				originalPush.apply(model, arguments);

				append(arguments);
			};
		};

		model.applyBinding = function(scope, name, model) {

			scope = scope.querySelector("[data-bind=" + name + "]"); 

			applyWithBinding(model, name, scope);

			self.bind(scope);
		};

		this.bind(scope);

		return model;
	}

	// This method binds an object to a DOM element.
	// It is called recursively to bind the entire data structure.
	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		model._scope = scope;

		if (model instanceof Array) {

			var foreach = new ForEach(scope, model);

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
