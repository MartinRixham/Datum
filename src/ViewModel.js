define([
	"Serialisable",
	"Property",
	"PropertyType",
	"Subscriber"
], function(
	Serialisable,
	Property,
	PropertyType,
	Subscriber) {

	function ViewModel(model) {

		new Serialisable(model);

		var properties = {};

		var self = this;

		this.applyBinding = function(scope, name) {

			var elements = getElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				createRebinder(element, scope, name);
				callBindingCallback(element);
				unbindOldProperties();
				createNewProperties();
				bindProperties(element);
			}
		};

		function getElements(scope, name) {

			if (scope) {

				var elements = self.getMatchingElements(scope, name);

				return elements.length ? elements : [null];
			}
			else {

				return [document.body];
			}
		}

		function createRebinder(element, scope, name) {

			if (element) {

				element._rebind = function() {

					self.applyBinding(scope, name);
				};
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

					if (typeof(property) != "function") {

						properties[key] = new Property(property, createPropertyType());
					}
				}
			}
		}

		function isNew(key) {

			var property = properties[key];

			return !property ||
				property.isOlderThan &&
				property.isOlderThan(model[key]);
		}

		function createPropertyType() {

			return new PropertyType(function(model) { return new ViewModel(model); });
		}

		function bindProperties(element) {

			for (var key in properties) {

				properties[key].applyBinding(element, key, model);
			}
		}

		this.removeBinding = function() {

			for (var key in properties) {

				properties[key].removeBinding();
			}
		};
	}

	ViewModel.prototype = new Subscriber();

	return ViewModel;
});
