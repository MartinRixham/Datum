define(["TransientProperty"], function(TransientProperty) {

	function Splice(model, elementChildren, properties, propertyType) {

		var originalSplice = model.splice;

		model.splice = function(/*start, deleteCount*/) {

			var newObjects = [].slice.call(arguments, 2);

			insertObjects(newObjects);

			originalSplice.apply(this, arguments);
			model.subscribableLength = model.length;
		};

		function insertObjects(newObjects) {

			for (var i = newObjects.length - 1; i >= 0; i--) {

				var object = newObjects[i];
				var property = new TransientProperty(object, propertyType);

				properties.unshift(property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.insertBefore(child.clone(), element.firstChild);
					property.applyBinding(element, 0, object);
				}
			}
		}
	}

	return Splice;
});
