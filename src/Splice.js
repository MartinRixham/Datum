define(["TransientProperty"], function(TransientProperty) {

	function Splice(model, elementChildren, properties, propertyType) {

		var originalSplice = model.splice;

		model.splice = function(start/*, deleteCount*/) {

			var newObjects = [].slice.call(arguments, 2);
			start = normaliseStart(start);

			insertObjects(start, newObjects);

			originalSplice.apply(this, arguments);
			model.subscribableLength = model.length;
		};

		function normaliseStart(start) {

			if (start < 0) {

				start = model.length + start;
			}

			start = Math.min(model.length, start);

			return start;
		}

		function insertObjects(start, newObjects) {

			for (var i = newObjects.length - 1; i >= 0; i--) {

				var object = newObjects[i];
				var property = new TransientProperty(object, propertyType);

				properties.splice(start, 0, property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.insertBefore(child.clone(), element.children[start]);
					property.applyBinding(element, start, object);
				}
			}
		}
	}

	return Splice;
});
