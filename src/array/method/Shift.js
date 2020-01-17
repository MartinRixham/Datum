define([], function() {

	function Shift(model, elements, properties) {

		this.model = model;

		this.originalShift = model.shift;

		var self = this;

		model.shift = function() {

			var shifted = self.originalShift.apply(this, arguments);

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

	Shift.prototype.unbind = function() {

		this.model.shift = this.originalShift;
	};

	return Shift;
});
