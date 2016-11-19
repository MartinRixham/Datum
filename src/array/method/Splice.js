define(["property/TransientProperty"], function(TransientProperty) {

	function Splice(model, elements, properties, propertyType) {

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

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];
				var end = Math.min(start + deleteCount, model.length) - 1;

				for (var j = end; j >= start; j--) {

					element.removeAtIndex(j);
				}

				properties.splice(start, deleteCount);
			}
		}

		function insertObjects(start, newObjects) {

			for (var i = newObjects.length - 1; i >= 0; i--) {

				var property = new TransientProperty(newObjects[i], propertyType);

				properties.splice(start, 0, property);

				for (var j = 0; j < elements.length; j++) {

					var element = elements[j];

					element.insertAtIndex(start);
					property.applyBinding(element.get(), start, model);
				}
			}
		}
	}

	return Splice;
});
