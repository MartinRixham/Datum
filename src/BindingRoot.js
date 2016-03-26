function BindingRoot(model) {

	this.assertUniqueness();

	function injectProperty(key, model, property) {

		var datum = new Datum(property);

		Object.defineProperty(model, key, {

			get: function() { return datum(); },
			set: function(value) { datum(value); }
		});
	}

	var self = this;

	// This method binds an object to a DOM element.
	// It is called recursively to bind the entire data structure.
	BindingRoot.bindObject = function (model, scope) {

		var newBinding = !model._scope;

		if (scope) {

			if (scope != model._scope && model.onBind) {

				model.onBind(scope);
			}

			model._scope = scope;

			if (model instanceof Array) {

				var foreach = new BindingRoot.ForEach(scope, model);
			}
			else {

				scope._rebind = function () {

					BindingRoot.bindObject(model, scope);
				};
			}
		}

		new BindingRoot.ViewModel(model);

		for (var key in model) {

			if (key == "_scope") {

				continue;
			}

			var property = model[key];

			var element;

			if (scope) {

				if (isNaN(key)) {

					element =
						scope.querySelector("[data-bind=" + key + "]");
				}
				else {

					element = scope.children[key];
				}
			}

			if (model._scope && property && property.applyBinding) {

				property.applyBinding(model._scope, key, model);
			}
			else if (typeof(property) != "function") {

				if (newBinding) {

					injectProperty(key, model, property);
				}

				if (typeof(property) == "object") {

					if (element && self.isInScope(element, scope)) {

						if (!(model instanceof Array)) {

							new BindingRoot.With(model, key, element, scope);
						}

						if (property) {

							BindingRoot.bindObject(property, element);
						}
					}
					else if (property && !element) {

						BindingRoot.bindObject(property);
					}
				}
			}
		}
	};

	var scope = document.querySelector("body");

	BindingRoot.bindObject(model, scope);

	this.rebindDataStructure(function() {

		BindingRoot.bindObject(model, scope);
	});

	var domWatcher = new BindingRoot.DomWatcher(scope);

	this.disconnect = function() {

		domWatcher.disconnect();
	};
}

BindingRoot.prototype = new UniqueRoot();
