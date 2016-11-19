define([], function() {

	function ObjectBinding() {

		var elementChildren = [];

		this.setUpElement = function(parentModel, element) {

			var children = [].slice.call(element.get().childNodes);

			elementChildren.push({ "element": element, "children": children });
		};

		this.updateElement = function(parentModel, element, model) {

			if (model) {

				replaceChildren(element);
			}
			else {

				element.removeChildren();
			}
		};

		function replaceChildren(element) {

			var children = getChildren(element);

			if (element.isEmpty()) {

				for (var i = 0; i < children.length; i++) {

					element.get().appendChild(children[i]);
				}
			}
		}

		function getChildren(element) {

			for (var i = 0; i < elementChildren.length; i++) {

				if (elementChildren[i].element.equals(element)) {

					return elementChildren[i].children;
				}
			}
		}

		this.resetElement = function(element) {

			var children;

			for (var i = 0; i < elementChildren.length; i++) {

				if (elementChildren[i].element.equals(element)) {

					children = elementChildren[i].children;
					elementChildren.splice(i, 1);
					break;
				}
			}

			if (element.isEmpty()) {

				for (var j = 0; j < children.length; j++) {

					element.get().appendChild(children[j]);
				}
			}
		};
	}

	return ObjectBinding;
});
