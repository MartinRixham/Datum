define([
	"property/TransientProperty",
	"element/DOMElement"
], function(
	TransientProperty,
	DOMElement) {

	function Push(model, elementChildren, properties, propertyType) {

		var originalPush = model.push;

		model.push = function() {

			originalPush.apply(this, arguments);

			for (var i = 0; i < arguments.length; i++) {

				var property = new TransientProperty(arguments[i], propertyType);

				properties.push(property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;
					var finalIndex = properties.length - 1;

					element.appendChild(child.clone());
					property.applyBinding(new DOMElement(element), finalIndex, model);
				}
			}

			model.subscribableLength = model.length;
		};
	}

	return Push;
});
