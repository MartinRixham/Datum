define([
	"object/ObjectElement",
	"array/ArrayElement"
], function(
	ObjectElement,
	ArrayElement) {

	function DOMElement(element) {

		this.element = element;
	}

	DOMElement.prototype.isInScope = function(scope) {

		return isInScope(this.element, scope);
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

	DOMElement.prototype.removedFromDocument = function() {

		return !document.body.contains(this.element);
	};

	DOMElement.prototype.getMatchingElements = function(key) {

		var elements = this.element.querySelectorAll("[data-bind=" + key + "]");
		var elementsArray = [];

		for (var i = 0; i < elements.length; i++) {

			var newElement = new DOMElement(elements[i]);

			if (newElement.isInScope(this.element)) {

				elementsArray.push(newElement);
			}
		}

		if (this.element.dataset.bind == key) {

			elementsArray.push(new DOMElement(this.element));
		}

		return elementsArray;
	};

	DOMElement.prototype.createRebinder = function(rebinder) {

		this.element.__DATUM__REBIND = rebinder;
	};

	DOMElement.prototype.rebind = function() {

		this.element.__DATUM__REBIND();
	};

	DOMElement.prototype.callBindingCallback = function(model) {

		if (model.onBind) {

			model.onBind(this.element);
		}
	};

	DOMElement.prototype.equals = function(other) {

		return other.hasEqual(this.element);
	};

	DOMElement.prototype.hasEqual = function(otherElement) {

		return this.element == otherElement;
	};

	DOMElement.prototype.toObjectElement = function() {

		return new ObjectElement(this.element);
	};

	DOMElement.prototype.toArrayElement = function(initialLength) {

		return new ArrayElement(this, initialLength);
	};

	DOMElement.prototype.get = function() {

		return this.element;
	};

	DOMElement.prototype.createElement = function(element) {

		return new DOMElement(element);
	};

	return DOMElement;
});
