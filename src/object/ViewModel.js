define([
	"element/ElementSet",
	"object/Serialisable",
	"property/TransientProperty",
	"property/PermanentProperty",
	"property/PropertyType",
	"element/NullDOMElement"
], function(
	ElementSet,
	Serialisable,
	TransientProperty,
	PermanentProperty,
	PropertyType,
	NullDOMElement) {

	function ViewModel(model) {

		var boundElements = new ElementSet();
		var transientProperties = {};
		var permanentProperties = {};

		new Serialisable(model);

		this.applyBinding = applyBinding;

		function applyBinding(element) {

			boundElements.removeOld();

			if (!boundElements.contains(element)) {

				createRebinder(element);
				element.callBindingCallback(model);
			}

			unbindOldProperties();
			createPermanentProperties(element);
			createTransientProperties();
			bindProperties(element, permanentProperties);
			bindProperties(element, transientProperties);
			boundElements.add(element);
		}

		function createRebinder(element) {

			element.createRebinder(function() {

				applyBinding(element);
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

		function createPermanentProperties(element) {

			for (var key in model) {

				if (!permanentProperties[key]) {

					permanentProperties[key] =
						new PermanentProperty(model[key], createPropertyType(), element);
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

		function bindProperties(scope, properties) {

			for (var key in properties) {

				var elements = getElements(scope, key);

				for (var i = 0; i < elements.length; i++) {

					var element = elements[i];

					properties[key].applyBinding(element, model, key);
				}
			}
		}

		function getElements(scope, name) {

			var elements = scope.getMatchingElements(name);

			return elements.length ? elements : [new NullDOMElement()];
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
