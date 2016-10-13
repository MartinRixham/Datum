define(["TransientProperty"], function(TransientProperty) {

	function Unshift(model, elementChildren, properties, propertyType) {

		var originalUnshift = model.unshift;

		model.unshift = function() {

			for (var j = 0; j < arguments.length; j++) {

				var model = arguments[j];
				var property = new TransientProperty(model, propertyType);

				properties.unshift(property);

				for (var i = 0; i < elementChildren.length; i++) {

					var element = elementChildren[i].element;
					var child = elementChildren[i].child;

					element.insertBefore(child.clone(), element.firstChild);
					property.applyBinding(element, properties.length - 1, model);
				}
			}

			originalUnshift.apply(this, arguments);
		};
	}

	return Unshift;
});
