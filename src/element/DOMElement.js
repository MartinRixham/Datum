define([
	"object/ObjectElement",
	"array/ArrayElement"
], function(
	ObjectElement,
	ArrayElement) {

	function DOMElement(element) {

		this.isInScope = function(scope) {

			return isInScope(element, scope);
		};

		function isInScope(element, scope) {

			var currentElement = element.parentElement;

			if (!currentElement) {

				return false;
			}
			else if (currentElement == scope) {

				return true;
			}
			else if (currentElement.__DATUM__REBIND) {

				return false;
			}
			else {

				return isInScope(currentElement, scope);
			}
		}

		this.removedFromDocument = function() {

			return !document.body.contains(element);
		};

		this.getMatchingElements = function(key) {

			var elements = element.querySelectorAll("[data-bind=" + key + "]");
			var elementsArray = [];

			for (var i = 0; i < elements.length; i++) {

				var newElement = new DOMElement(elements[i]);

				if (newElement.isInScope(element)) {

					elementsArray.push(newElement);
				}
			}

			if (element.dataset.bind == key) {

				elementsArray.push(new DOMElement(element));
			}

			return elementsArray;
		};

		this.createRebinder = function(rebinder) {

			element.__DATUM__REBIND = rebinder;
		};

		this.rebind = function() {

			element.__DATUM__REBIND();
		};

		this.callBindingCallback = function(model) {

			if (model.onBind) {

				model.onBind(element);
			}
		};

		this.equals = function(other) {

			return other.hasEqual(element);
		};

		this.hasEqual = function(otherElement) {

			return element == otherElement;
		};

		this.toObjectElement = function() {

			return new ObjectElement(element);
		};

		this.toArrayElement = function(initialLength) {

			return new ArrayElement(this, initialLength);
		};

		this.get = function() {

			return element;
		};

		this.createElement = function(element) {

			return new DOMElement(element);
		};
	}

	return DOMElement;
});
