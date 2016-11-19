define([], function() {

	function ObjectBinding() {

		var elements = [];

		this.setUpElement = function(parentModel, element) {

			elements.push(element.toObjectElement());
		};

		this.updateElement = function(parentModel, element, model) {

			var objectElement = getObjectElement(element);

			if (model) {

				objectElement.replaceChildren();
			}
			else {

				objectElement.removeChildren();
			}
		};

		function getObjectElement(element) {

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					return elements[i];
				}
			}
		}

		this.resetElement = function(element) {

			var objectElement;

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					objectElement = elements[i];
					elements.splice(i, 1);
					break;
				}
			}

			objectElement.replaceChildren();
		};
	}

	return ObjectBinding;
});
