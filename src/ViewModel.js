define([
	"Serialisable",
	"Property",
	"Subscriber"
], function(
	Serialisable,
	Property,
	Subscriber) {

	function ViewModel(model) {

		new Serialisable(model);

		var properties = {};

		var bindings = {};

		var self = this;

		this.applyBinding = function(scope, name) {

			var element = getElement(scope, name);

			if (element) {

				element._rebind = function() {

					self.applyBinding(scope, name);
				};
			}

			callBindingCallback(element);
			unbindOldProperties();
			createNewProperties();
			bindProperties(element);
		};

		function getElement(scope, name) {

			if (scope) {

				var elements = self.getAllMatchingElements(scope, name);

				if (elements.length > 1) {

					throw new Error("Objects can only be bound to one element.");
				}
				else if (elements.length) {

					return elements[0];
				}
			}
			else {

				return document.body;
			}
		}

		function callBindingCallback(element) {

			if (model.onBind) {

				model.onBind(element);
			}
		}

		function unbindOldProperties() {

			for (var key in properties) {

				if (!model[key]) {

					properties[key].removeBinding();

					delete properties[key];
				}
			}
		}

		function createNewProperties() {

			for (var key in model) {

				if (isNew(key) && key != "_scope") {

					if (properties[key]) {

						properties[key].removeBinding();
					}

					var property = model[key];

					if (property && property.applyBinding && property.removeBinding) {

						bindings[key] = property;
					}
					else if (typeof(property) != "function") {

						properties[key] = new Property(model[key]);
					}
				}
			}
		}

		function isNew(key) {

			var property = properties[key];

			return !property || property.isOlderThan(model[key]);
		}

		function bindProperties(element) {

			var key;

			for (key in properties) {

				properties[key].applyBinding(element, key, model);
			}

			for (key in bindings) {

				bindings[key].applyBinding(element, key, model);
			}
		}

		this.removeBinding = function() {

			for (var key in properties) {

				properties[key].removeBinding();
			}
		};
	}

	ViewModel.prototype = new Subscriber();

	Property.ViewModel = ViewModel;

	return ViewModel;
});
