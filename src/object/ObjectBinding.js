define([], function() {

	function ObjectBinding() {

		var elementChildren = [];

		this.setUpElement = function(parentModel, element) {

			var children = [].slice.call(element.childNodes);

			elementChildren.push({ "element": element, "children": children });
		};

		this.updateElement = function(parentModel, element, model) {

			if (model) {

				replaceChildren(element);
			}
			else {

				removeChildren(element);
			}
		};

		function replaceChildren(element) {

			var children = getChildren(element);

			if (!element.childNodes.length) {

				for (var i = 0; i < children.length; i++) {

					element.appendChild(children[i]);
				}
			}
		}

		function getChildren(element) {

			for (var i = 0; i < elementChildren.length; i++) {

				if (elementChildren[i].element == element) {

					return elementChildren[i].children;
				}
			}
		}

		function removeChildren(element) {

			var children = element.childNodes;

			for (var i = children.length - 1; i >= 0; i--) {

				element.removeChild(children[i]);
			}
		}

		this.resetElement = function(element) {

			var children;

			for (var i = 0; i < elementChildren.length; i++) {

				if (elementChildren[i].element == element) {

					children = elementChildren[i].children;
					elementChildren.splice(i, 1);
					break;
				}
			}

			if (!element.childNodes.length) {

				for (var j = 0; j < children.length; j++) {

					element.appendChild(children[j]);
				}
			}
		};
	}

	return ObjectBinding;
});
