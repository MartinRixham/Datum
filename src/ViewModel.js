define(["Subscriber"], function(Subscriber) {

	function ViewModel(model) {

		new BindingRoot.ViewModel.Serialisable(model);

		var properties = {};

		var bindings = {};

		this.applyBinding = function(scope, name) {

			var element;

			if (scope) {

				var elements = this.getAllMatchingElements(scope, name);

				if (elements.length > 1) {

					throw new Error("Objects can only be bound to one element.");
				}
				else if (elements.length) {

					element = elements[0];
				}
			}
			else {

				element = document.body;
			}

			if (element) {

				var self = this;

				element._rebind = function() {

					self.applyBinding(scope, name);
				};
			}

			if (model.onBind) {

				model.onBind(element);
			}

			var key;

			for (key in properties) {

				if (!model[key]) {

					properties[key].removeBinding();

					delete properties[key];
				}
			}

			for (key in model) {

				if (isNew(key) && key != "_scope") {

					if (properties[key]) {

						properties[key].removeBinding();
					}

					var property = model[key];

					if (property && property.applyBinding && property.removeBinding) {

						bindings[key] = property;
					}
					else if (typeof(property) != "function") {

						properties[key] = new BindingRoot.ViewModel.Property(model[key]);
					}
				}
			}

			for (key in properties) {

				properties[key].applyBinding(element, key, model);
			}

			for (key in bindings) {

				bindings[key].applyBinding(element, key, model);
			}
		};

		function isNew(key) {

			var property = properties[key];

			return !property || property.isOlderThan(model[key]);
		}

		this.removeBinding = function() {

			for (var key in properties) {

				properties[key].removeBinding();
			}
		};

		var self = this;

		model.setProperty = function(name, property) {

			model[name] = property;

			self.rebindDataStructure();
		};
	}

	ViewModel.prototype = new Subscriber();

	return ViewModel;
});
