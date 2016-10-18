define(["TransientProperty"], function(TransientProperty) {

	function Push(model, elementChildren, properties, propertyType) {

		var originalPush = model.push;

		model.push = function() {

			for (var i = 0; i < arguments.length; i++) {

				var model = arguments[i];
				var property = new TransientProperty(model, propertyType);

				properties.push(property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.appendChild(child.clone());
					property.applyBinding(element, properties.length - 1, model);
				}
			}

			originalPush.apply(this, arguments);
		};
	}

	return Push;
});
