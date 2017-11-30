define([], function() {

	function Shift(model, elements, properties) {

		var originalShift = model.shift;

		model.shift = function() {

			var shifted = originalShift.apply(this, arguments);

			shift(model, elements, properties);

			return shifted;
		};
	}

	function shift(model, elements, properties) {

		var property = properties.shift();

		if (property) {

			property.removeBinding();
		}

		for (var i = 0; i < elements.length; i++) {

			elements[i].removeFirst();
		}

		model.subscribableLength = model.length;
		model.indexOf();
	}

	return Shift;
});
