define([], function() {

	function DOMElement(element) {

		this.isInScope = function(scope) {

			return isInScope(element, scope);
		};

		function isInScope(element, scope) {

			var currentElement = element.parentElement;

			if (!currentElement) {

				return true;
			}
			else if (currentElement._rebind) {

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

		this.createRebinder = function(rebinder) {

			if (element) {

				element._rebind = rebinder;
			}
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

		this.get = function() {

			return element;
		};
	}

	return DOMElement;
});
