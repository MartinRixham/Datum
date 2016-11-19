define([], function() {

	function Reverse(model, elements, properties) {

		var originalReverse = model.reverse;

		model.reverse = function() {

			originalReverse.apply(this, arguments);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i].get();
				var children = [].slice.call(element.children);

				removeChildren(element);
				replaceChildrenReversed(element, children);
			}

			properties.reverse();
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
