define([], function() {

	function ObjectBinding() {

		var elementChildren = [];

		this.setUpElement = function(parentModel, element) {

			var children = [].slice.call(element.childNodes);

			elementChildren.push({ "element": element, "children": children });
		};

		this.updateElement = function(parentModel, element, model) {

			var children;

			if (model) {

				for (var i = 0; i < elementChildren.length; i++) {

					if (elementChildren[i].element == element) {

						children = elementChildren[i].children;
						break;
					}
				}

				if (!element.childNodes.length) {

					for (var j = 0; j < children.length; j++) {

						element.appendChild(children[j]);
					}
				}
			}
			else {

				children = element.childNodes;

				for (var k = children.length - 1; k >= 0; k--) {

					element.removeChild(children[k]);
				}
			}
		};

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
