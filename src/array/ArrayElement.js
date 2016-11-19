define(["array/ArrayItemElement"], function(ArrayItemElement) {

	function ArrayElement(element, initialLength) {

		var child;

		(function checkElementHasOnlyOneChild() {

			if (element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}
		})();

		(function createRebinder() {

			element._rebind = function() {};
		})();

		(function getChild() {

			var childElement = element.children[0];

			element.removeChild(childElement);

			child = new ArrayItemElement(childElement);
		})();

		(function copyElement() {

			for (var i = 0; i < initialLength; i++) {

				element.appendChild(child.clone());
			}
		})();

		this.append = function() {

			element.appendChild(child.clone());
		};

		this.removeLast = function() {

			if (element.lastElementChild) {

				element.removeChild(element.lastElementChild);
			}
		};

		this.reset = function() {

			while (element.lastChild) {

				element.removeChild(element.lastChild);
			}

			element.appendChild(child.get());
		};

		this.getChild = function() {

			return child;
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

	return ArrayElement;
});
