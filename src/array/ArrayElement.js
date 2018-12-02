define(["array/ArrayItemElement"], function(ArrayItemElement) {

	function ArrayElement(domElement, initialLength) {

		this.domElement = domElement;

		this.element = domElement.get();

		// There is a performance advantage
		// to keeping the children in an array
		// instead of retrieving children from
		// the element's children property
		// which is not an array
		this.children = new Array(initialLength);

		var self = this;

		(function checkElementHasOnlyOneChild() {

			if (self.element.children.length !== 1) {

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

				var child = self.child.clone();

				self.children[i] = child;

				self.element.appendChild(child);
			}
		})();
	}

	ArrayElement.prototype.append = function() {

		var child = this.child.clone();

		this.children.push(child);

		this.element.appendChild(child);
	};

	ArrayElement.prototype.prepend = function() {

		var child = this.child.clone();

		this.children.unshift(child);

		this.element.insertBefore(child, this.element.firstChild);
	};

	ArrayElement.prototype.insertAtIndex = function(index) {

		var child = this.child.clone();

		this.element.insertBefore(child, this.children[index]);

		this.children.splice(index, 0, child);
	};

	ArrayElement.prototype.removeFirst = function() {

		if (this.element.firstElementChild) {

			this.children.shift();

			this.element.removeChild(this.element.firstElementChild);
		}
	};

	ArrayElement.prototype.removeLast = function() {

		if (this.element.lastElementChild) {

			this.children.pop();

			this.element.removeChild(this.element.lastElementChild);
		}
	};

	ArrayElement.prototype.removeAtIndex = function(index) {

		var removed = this.children.splice(index, 1);

		this.element.removeChild(removed[0]);
	};

	ArrayElement.prototype.removeChildren = function() {

		var children = this.children;

		this.children = [];

		while (this.element.lastChild) {

			this.element.removeChild(this.element.lastChild);
		}

		return children;
	};

	ArrayElement.prototype.appendChildren = function(children) {

		for (var i = 0; i < children.length; i++) {

			var child = children[i];

			this.children.push(child);

			this.element.appendChild(child);
		}
	};

	ArrayElement.prototype.appendChild = function(child) {

		this.children.push(child);

		this.element.appendChild(child);
	};

	ArrayElement.prototype.reset = function() {

		this.children = [];

		while (this.element.lastChild) {

			this.element.removeChild(this.element.lastChild);
		}

		this.element.appendChild(this.child.get());
	};

	ArrayElement.prototype.getChildAtIndex = function(i) {

		return this.domElement.createElement(this.children[i]);
	};

	ArrayElement.prototype.removedFromDocument = function() {

		return this.domElement.removedFromDocument();
	};

	ArrayElement.prototype.equals = function(other) {

		return other.hasEqual(this.element);
	};

	ArrayElement.prototype.hasEqual = function(otherElement) {

		return this.element === otherElement;
	};

	ArrayElement.prototype.get = function() {

		return this.domElement;
	};

	return ArrayElement;
});
