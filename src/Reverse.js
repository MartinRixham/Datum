define([], function() {

	function Reverse(model, elementChildren, properties) {

		var originalReverse = model.reverse;

		model.reverse = function() {

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var children = [].slice.call(element.children);

				while (element.lastChild) {

					element.removeChild(element.lastChild);
				}

				for (var j = children.length - 1; j >= 0; j--) {

					element.appendChild(children[j]);
				}
			}

			properties.reverse();
			originalReverse.apply(this, arguments);
		};
	}

	return Reverse;
});
