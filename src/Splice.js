define(["TransientProperty", "DOMElement"], function(TransientProperty, DOMElement) {

	function Splice(model, elementChildren, properties, propertyType) {

		var originalSplice = model.splice;

		model.splice = function(start, deleteCount) {

			start = normaliseStart(start);
			var newObjects = [].slice.call(arguments, 2);

			removeObjects(start, deleteCount);
			insertObjects(start, newObjects);

			originalSplice.apply(this, arguments);
			model.subscribableLength = model.length;
		};

		function normaliseStart(start) {

			if (start < 0) {

				start = model.length + start;
			}

			start = Math.min(model.length, start);
			start = Math.max(0, start);

			return start;
		}

		function removeObjects(start, deleteCount) {

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var end = Math.min(start + deleteCount, model.length) - 1;

				for (var j = end; j >= start; j--) {

					element.removeChild(element.children[j]);
				}

				properties.splice(start, deleteCount);
			}
		}

		function insertObjects(start, newObjects) {

			for (var i = newObjects.length - 1; i >= 0; i--) {

				var property = new TransientProperty(newObjects[i], propertyType);

				properties.splice(start, 0, property);

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;
					var child = elementChildren[j].child;

					element.insertBefore(child.clone(), element.children[start]);
					property.applyBinding(new DOMElement(element), start, model);
				}
			}
		}
	}

	return Splice;
});
