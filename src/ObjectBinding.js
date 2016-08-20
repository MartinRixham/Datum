define(["Subscriber"], function(Subscriber) {

	function ObjectBinding() {

		var elementChildren = [];

		this.setUpElement = function(parentModel, element) {

			var children = [].slice.call(element.childNodes);

			elementChildren.push({ "element": element, "children": children });
		};

		this.updateElement = function(parentModel, element, key) {

			var model = parentModel[key];

			if (!model) {

				var children = element.childNodes;

				for (var i = children.length - 1; i >= 0; i--) {

					element.removeChild(children[i]);
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

	ObjectBinding.prototype = new Subscriber();

	return ObjectBinding;
});
