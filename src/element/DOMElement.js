define([
	"object/ObjectElement",
	"array/ArrayElement"
], function(
	ObjectElement,
	ArrayElement) {

	function DOMElement(element) {

		this.hasInScope = function(other) {

			return other.isInScope(element);
		};

		this.isInScope = function(scope) {

			return isInScope(element, scope);
		};

		function isInScope(element, scope) {

			var currentElement = element.parentElement;

			if (!currentElement) {

				return true;
			}
			else if (currentElement.__DATUM__REBIND) {

				return currentElement == scope;
			}
			else {

				return isInScope(currentElement, scope);
			}
		}

		this.removedFromDocument = function() {

			return !document.contains(element);
		};

		this.getMatchingElements = function(key) {

			if (isNaN(key)) {

				var elements = element.querySelectorAll("[data-bind=" + key + "]");
				var elementsArray = [].slice.call(elements);

				return elementsArray.map(function(item) { return new DOMElement(item); });
			}
			else {

				return [new DOMElement(element.children[key])];
			}
		};

		this.hasDataBindAttribute = function(name) {

			return element.dataset.bind == name;
		};

		this.createRebinder = function(rebinder) {

			if (element) {

				element.__DATUM__REBIND = rebinder;
			}
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
	}

	return DOMElement;
});
