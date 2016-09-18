define([
	"Serialisable",
	"Property",
	"PropertyType"
], function(
	Serialisable,
	Property,
	PropertyType) {

	function ViewModel(model) {

		new Serialisable(model);

		var properties = {};

		var propertyType =
			new PropertyType(function(model) { return new ViewModel(model); });

		this.applyBinding = applyBinding;

		function applyBinding(scope, name, parentModel) {

			if (parentModel) {

				model = parentModel[name];
			}

			var elements = getElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				createRebinder(element, scope, name);
				callBindingCallback(element);
				unbindOldProperties();
				createNewProperties();
				bindProperties(element);
			}
		}

		function getElements(scope, name) {

			if (scope) {

				var elements = getMatchingElements(scope, name);

				return elements.length ? elements : [null];
			}
			else {

				return [document.body];
			}
		}

		function getMatchingElements(scope, key) {

			if (isNaN(key)) {

				return [].slice.call(scope.querySelectorAll("[data-bind=" + key + "]"));
			}
			else {

				return [scope.children[key]];
			}
		}

		function createRebinder(element, scope, name) {

			if (element) {

				element._rebind = function() {

					applyBinding(scope, name);
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

				if (model[key] === undefined) {

					properties[key].removeBinding();
					delete properties[key];
				}
			}
		}

		function createNewProperties() {

			for (var key in model) {

				if (!properties[key]) {

					properties[key] = new Property(model[key], propertyType);
				}
			}
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

	return ViewModel;
});
