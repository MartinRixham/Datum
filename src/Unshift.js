define(["TransientProperty"], function(TransientProperty) {

	function Unshift(model, elementChildren, properties, propertyType) {

		var originalUnshift = model.unshift;

		model.unshift = function() {

			for (var i = arguments.length - 1; i >= 0; i--) {

				var model = arguments[i];
				var property = new TransientProperty(model, propertyType);

				properties.unshift(property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.insertBefore(child.clone(), element.firstChild);
					property.applyBinding(element, 0, model);
				}
			}

			originalUnshift.apply(this, arguments);
		};
	}

	return Unshift;
});
