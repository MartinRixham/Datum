define([
	"property/TransientProperty",
	"element/DOMElement"
], function(
	TransientProperty,
	DOMElement) {

	function Push(model, elements, properties, propertyType) {

		var originalPush = model.push;

		model.push = function() {

			originalPush.apply(this, arguments);

			for (var i = 0; i < arguments.length; i++) {

				var property = new TransientProperty(arguments[i], propertyType);

				properties.push(property);

				for (var j = 0; j < elements.length; j++) {

					var element = elements[j];
					var finalIndex = properties.length - 1;

					element.append();
					property.applyBinding(
						new DOMElement(element.get()), finalIndex, model);
				}
			}

			model.subscribableLength = model.length;
		};
	}

	return Push;
});
