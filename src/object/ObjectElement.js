define([], function() {

	function ObjectElement(element) {

		var children = [].slice.call(element.childNodes);

		this.removeChildren = function() {

			var children = element.childNodes;

			for (var i = children.length - 1; i >= 0; i--) {

				element.removeChild(children[i]);
			}
		};

		this.replaceChildren = function() {

			for (var i = 0; i < children.length; i++) {

				element.appendChild(children[i]);
			}
		};

		this.equals = function(other) {

			return other.hasEqual(element);
		};

		this.hasEqual = function(otherElement) {

			return element == otherElement;
		};
	}

	return ObjectElement;
});
