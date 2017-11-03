define(["array/ArrayItemElement"], function(ArrayItemElement) {

	function ArrayElement(domElement, initialLength) {

		this.domElement = domElement;

		this.element = domElement.get();

		var self = this;

		(function checkElementHasOnlyOneChild() {

			if (self.element.children.length != 1) {

				var message =
					"An array must be bound to an element with exactly one child.";
				throw new Error(message);
			}
		})();

		(function createRebinder() {

			domElement.createRebinder(function() {});
		})();

		(function getChild() {

			var childElement = self.element.children[0];

			self.element.removeChild(childElement);

			self.child = new ArrayItemElement(childElement);
		})();

		(function copyElement() {

			for (var i = 0; i < initialLength; i++) {

				self.element.appendChild(self.child.clone());
			}
		})();
	}

	ArrayElement.prototype.append = function() {

		this.element.appendChild(this.child.clone());
	};

	ArrayElement.prototype.prepend = function() {

		this.element.insertBefore(this.child.clone(), this.element.firstChild);
	};

	ArrayElement.prototype.insertAtIndex = function(index) {

		this.element.insertBefore(this.child.clone(), this.element.children[index]);
	};

	ArrayElement.prototype.removeFirst = function() {

		if (this.element.firstElementChild) {

			this.element.removeChild(this.element.firstElementChild);
		}
	};

	ArrayElement.prototype.removeLast = function() {

		if (this.element.lastElementChild) {

			this.element.removeChild(this.element.lastElementChild);
		}
	};

	ArrayElement.prototype.removeAtIndex = function(index) {

		this.element.removeChild(this.element.children[index]);
	};

	ArrayElement.prototype.removeChildren = function() {

		var children = [].slice.call(this.element.children);

		while (this.element.lastChild) {

			this.element.removeChild(this.element.lastChild);
		}

		return children;
	};

	ArrayElement.prototype.appendChildren = function(children) {

		for (var i = 0; i < children.length; i++) {

			this.element.appendChild(children[i]);
		}
	};

	ArrayElement.prototype.appendChild = function(child) {

		this.element.appendChild(child);
	};

	ArrayElement.prototype.reset = function() {

		while (this.element.lastChild) {

			this.element.removeChild(this.element.lastChild);
		}

		this.element.appendChild(this.child.get());
	};

	ArrayElement.prototype.getChildAtIndex = function(i) {

		return this.domElement.createElement(this.element.children[i]);
	};

	ArrayElement.prototype.removedFromDocument = function() {

		return this.domElement.removedFromDocument();
	};

	ArrayElement.prototype.equals = function(other) {

		return other.hasEqual(this.element);
	};

	ArrayElement.prototype.hasEqual = function(otherElement) {

		return this.element == otherElement;
	};

	ArrayElement.prototype.get = function() {

		return this.domElement;
	};

	return ArrayElement;
});
