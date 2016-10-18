define([], function() {

	function Reverse(model, elementChildren, properties) {

		var originalReverse = model.reverse;

		model.reverse = function() {

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var firstChild = element.firstElementChild;

				element.remove(firstChild);
				element.appendChild(firstChild);
			}

			properties.reverse();
			originalReverse.apply(this, arguments);
		};
	}

	return Reverse;
});
