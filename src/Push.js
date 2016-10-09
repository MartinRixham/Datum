define(["TransientProperty"], function(TransientProperty) {

	function Push(model, elementChildren, properties, propertyType) {

		var originalPush = model.push;

		model.push = function() {

			for (var j = 0; j < arguments.length; j++) {

				var model = arguments[j];
				var property = new TransientProperty(model, propertyType);

				properties.push(property);

				for (var i = 0; i < elementChildren.length; i++) {

					var element = elementChildren[i].element;
					var child = elementChildren[i].child;

					element.appendChild(child.clone());
					property.applyBinding(element, properties.length - 1, model)
				}
			}

			originalPush.apply(this, arguments);
		};
	}

	return Push;
});
