define(["TransientProperty", "DOMElement"], function(TransientProperty, DOMElement) {

	function Unshift(model, elementChildren, properties, propertyType) {

		var originalUnshift = model.unshift;

		model.unshift = function() {

			for (var i = arguments.length - 1; i >= 0; i--) {

				var object = arguments[i];
				var property = new TransientProperty(object, propertyType);

				properties.unshift(property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.insertBefore(child.clone(), element.firstChild);
					property.applyBinding(new DOMElement(element), 0, object);
				}
			}

			originalUnshift.apply(this, arguments);
			model.subscribableLength = model.length;
		};
	}

	return Unshift;
});
