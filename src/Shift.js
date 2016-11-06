define([], function() {

	function Shift(model, elementChildren, properties) {

		var originalShift = model.shift;

		model.shift = function() {

			originalShift.apply(this, arguments);

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

			model.subscribableLength = model.length;
		};
	}

	return Shift;
});
