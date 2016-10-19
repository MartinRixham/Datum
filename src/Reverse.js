define([], function() {

	function Reverse(model, elementChildren, properties) {

		var originalReverse = model.reverse;

		model.reverse = function() {

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var children = [].slice.call(element.children);

				removeChildren(element);
				replaceChildrenReversed(element, children);
			}

			properties.reverse();
			originalReverse.apply(this, arguments);
		};

		function removeChildren(element) {

			while (element.lastChild) {

				element.removeChild(element.lastChild);
			}
		}

		function replaceChildrenReversed(element, children) {

			for (var j = children.length - 1; j >= 0; j--) {

				element.appendChild(children[j]);
			}
		}
	}

	return Reverse;
});
