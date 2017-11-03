define([], function() {

	function ObjectElement(element) {

		this.element = element;

		this.children = [].slice.call(element.childNodes);
	}

	ObjectElement.prototype.removeChildren = function() {

		var children = this.element.childNodes;

		for (var i = children.length - 1; i >= 0; i--) {

			this.element.removeChild(children[i]);
		}
	};

	ObjectElement.prototype.replaceChildren = function() {

		for (var i = 0; i < this.children.length; i++) {

			this.element.appendChild(this.children[i]);
		}
	};

	ObjectElement.prototype.removedFromDocument = function() {

		return !document.contains(this.element);
	};

	ObjectElement.prototype.equals = function(other) {

		return other.hasEqual(this.element);
	};

	ObjectElement.prototype.hasEqual = function(otherElement) {

		return this.element == otherElement;
	};

	return ObjectElement;
});
