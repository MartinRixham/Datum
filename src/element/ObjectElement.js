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

			if (isEmpty()) {

				for (var i = 0; i < children.length; i++) {

					element.appendChild(children[i]);
				}
			}
		};

		function isEmpty() {

			return !element.childNodes.length;
		}

		this.equals = function(other) {

			return other.hasEqual(element);
		};

		this.hasEqual = function(otherElement) {

			return element == otherElement;
		};
	}

	return ObjectElement;
});
