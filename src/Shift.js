define([], function() {

	function Shift(model, elementChildren, properties) {

		var originalShift = model.shift;

		model.shift = function() {

			var property = properties.shift();

			if (property) {

				property.removeBinding();
			}

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;

				if (element.firstElementChild) {

					element.removeChild(element.firstElementChild);
				}
			}

			originalShift.apply(this, arguments);
		};
	}

	return Shift;
});
