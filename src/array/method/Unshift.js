define(["property/TransientProperty"], function(TransientProperty) {

	function Unshift(model, elements, properties, propertyType) {

		var originalUnshift = model.unshift;

		model.unshift = function() {

			originalUnshift.apply(this, arguments);

			for (var i = arguments.length - 1; i >= 0; i--) {

				var property = new TransientProperty(arguments[i], propertyType);

				unshift(model, elements, properties, property);
			}

			model.subscribableLength = model.length;
			model.indexOf();
		};
	}

	function unshift(model, elements, properties, property) {

		properties.unshift(property);

		for (var j = 0; j < elements.length; j++) {

			var element = elements[j];

			element.prepend();
			property.applyBinding(element.getChildAtIndex(0), model);
		}
	}

	return Unshift;
});
