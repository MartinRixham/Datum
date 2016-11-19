define([], function() {

	function Reverse(model, elements, properties) {

		var originalReverse = model.reverse;

		model.reverse = function() {

			originalReverse.apply(this, arguments);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];
				var children = element.removeChildren();

				element.appendChildren(children.reverse());
			}

			properties.reverse();
		};
	}

	return Reverse;
});
