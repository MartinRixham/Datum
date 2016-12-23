define(["array/ArrayItemElement"], function(ArrayItemElement) {

	function ArrayElement(domElement, initialLength) {

		var element = domElement.get();

		var child;

		(function checkElementHasOnlyOneChild() {

			if (element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}
		})();

		(function createRebinder() {

			domElement.createRebinder(function() {});
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

		this.prepend = function() {

			element.insertBefore(child.clone(), element.firstChild);
		};

		this.insertAtIndex = function(index) {

			element.insertBefore(child.clone(), element.children[index]);
		};

		this.removeFirst = function() {

			if (element.firstElementChild) {

				element.removeChild(element.firstElementChild);
			}
		};

		this.removeLast = function() {

			if (element.lastElementChild) {

				element.removeChild(element.lastElementChild);
			}
		};

		this.removeAtIndex = function(index) {

			element.removeChild(element.children[index]);
		};

		this.removeChildren = function() {

			var children = [].slice.call(element.children);

			while (element.lastChild) {

				element.removeChild(element.lastChild);
			}

			return children;
		};

		this.appendChildren = function(children) {

			for (var i = 0; i < children.length; i++) {

				element.appendChild(children[i]);
			}
		};

		this.appendChild = function(child) {

			element.appendChild(child);
		};

		this.reset = function() {

			while (element.lastChild) {

				element.removeChild(element.lastChild);
			}

			element.appendChild(child.get());
		};

		this.equals = function(other) {

			return other.hasEqual(element);
		};

		this.hasEqual = function(otherElement) {

			return element == otherElement;
		};

		this.get = function() {

			return domElement;
		};
	}

	return ArrayElement;
});
