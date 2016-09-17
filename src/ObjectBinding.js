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
					}
				}

				for (var j = 0; j < children.length; j++) {

					element.appendChild(children[j]);
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

			for (var i = 0; i < elementChildren.length; i++) {

				var children = elementChildren[i];

				if (element == children.element) {

					elementChildren.splice(i, 1);
				}
			}
		};
	}

	return ObjectBinding;
});
