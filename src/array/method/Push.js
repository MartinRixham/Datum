define(["property/TransientProperty"], function(TransientProperty) {

	function Push(model, elements, properties, propertyType) {

		var originalPush = model.push;

		model.push = function() {

			originalPush.apply(this, arguments);

			for (var i = 0; i < arguments.length; i++) {

				var property = new TransientProperty(arguments[i], propertyType);

				push(model, properties, elements, property);
			}

			model.subscribableLength = model.length;
			model.indexOf();
		};
	}

	function push(model, properties, elements, property) {

		properties.push(property);

		for (var j = 0; j < elements.length; j++) {

			var element = elements[j];
			var child = element.append();

			property.applyBinding(child, model);
		}
	}

	return Push;
});
