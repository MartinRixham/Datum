define([
	"Serialisable",
	"TransientProperty",
	"PermanentProperty",
	"PropertyType"
], function(
	Serialisable,
	TransientProperty,
	PermanentProperty,
	PropertyType) {

	function ViewModel(model) {

		var transientProperties = {};

		var permanentProperties = {};

		new Serialisable(model);

		this.applyBinding = applyBinding;

		function applyBinding(scope, name) {

			var elements = getElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (!element || isInScope(element, scope)) {

					createRebinder(element, scope, name);
					callBindingCallback(element);
					unbindOldProperties();
					createPermanentProperties();
					createTransientProperties();
					bindProperties(element);
				}
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

		function isInScope(element, scope) {

			element = element.parentElement;

			if (!element) {

				return true;
			}
			else if (element._rebind) {

				return element == scope;
			}
			else {

				return isInScope(element, scope);
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

			for (var key in transientProperties) {

				if (!model[key]) {

					transientProperties[key].removeBinding();
					delete transientProperties[key];
				}
			}
		}

		function createPermanentProperties() {

			for (var key in model) {

				if (!permanentProperties[key]) {

					permanentProperties[key] =
						new PermanentProperty(model[key], createPropertyType());
				}
			}
		}

		function createTransientProperties() {

			for (var key in model) {

				if (isNew(key)) {

					if (transientProperties[key]) {

						transientProperties[key].removeBinding();
					}

					transientProperties[key] =
						new TransientProperty(model[key], createPropertyType());
				}
			}
		}

		function isNew(key) {

			var property = transientProperties[key];

			return !property ||
				property.isOlderThan &&
				property.isOlderThan(model[key]);
		}

		function createPropertyType() {

			return new PropertyType(function(model) { return new ViewModel(model); });
		}

		function bindProperties(element) {

			var key;

			for (key in permanentProperties) {

				permanentProperties[key].applyBinding(element, key, model);
			}

			for (key in transientProperties) {

				transientProperties[key].applyBinding(element, key, model);
			}
		}

		this.removeBinding = function() {

			var key;

			for (key in permanentProperties) {

				permanentProperties[key].removeBinding();
			}

			for (key in transientProperties) {

				transientProperties[key].removeBinding();
			}
		};
	}

	return ViewModel;
});
