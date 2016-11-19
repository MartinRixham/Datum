define([], function() {

	function Shift(model, elements, properties) {

		var originalShift = model.shift;

		model.shift = function() {

			originalShift.apply(this, arguments);

			var property = properties.shift();

			if (property) {

				property.removeBinding();
			}

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i].get();

				if (element.firstElementChild) {

					element.removeChild(element.firstElementChild);
				}
			}

			model.subscribableLength = model.length;
		};
	}

	return Shift;
});
