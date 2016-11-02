define([
	"ElementSet",
	"Serialisable",
	"TransientProperty",
	"PermanentProperty",
	"PropertyType",
	"DOMElement"
], function(
	ElementSet,
	Serialisable,
	TransientProperty,
	PermanentProperty,
	PropertyType,
	DOMElement) {

	function ViewModel(model) {

		var boundElements = new ElementSet();

		var transientProperties = {};

		var permanentProperties = {};

		new Serialisable(model);

		this.applyBinding = applyBinding;

		function applyBinding(scope, name) {

			boundElements.removeOld();

			var elements = getElements(scope, name);

			for (var i = 0; i < elements.length; i++) {

				bindElement(elements[i], scope, name);
			}
		}

		function bindElement(element, scope, name) {

			if (!element.get() || element.isInScope(scope && scope.get())) {

				if (!boundElements.contains(element)) {

					createRebinder(element, scope, name);
					element.callBindingCallback(model);
				}

				unbindOldProperties();
				createPermanentProperties();
				createTransientProperties();
				bindProperties(element);
				boundElements.add(element);
			}
		}

		function getElements(scope, name) {

			if (scope && scope.get()) {

				var elements = scope.getMatchingElements(name);

				return elements.length ? elements : [new DOMElement(null)];
			}
			else {

				return [new DOMElement(document.body)];
			}
		}

		function createRebinder(element, scope, name) {

			element.createRebinder(function() {

				applyBinding(scope, name);
			});
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

			return !property || property.isOlderThan(model[key]);
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
