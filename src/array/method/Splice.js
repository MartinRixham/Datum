define(["property/TransientProperty"], function(TransientProperty) {

	function Splice(model, elements, properties, propertyType) {

		this.model = model;

		this.originalSplice = model.splice;

		var self = this;

		model.splice = function(start, deleteCount) {

			start = normaliseStart(model.length, start);
			var newObjects = [].slice.call(arguments, 2);

			removeObjects(model, elements, properties, start, deleteCount);
			insertObjects(model, elements, properties, propertyType, start, newObjects);

			var spliced = self.originalSplice.apply(this, arguments);
			model.subscribableLength = model.length;
			model.indexOf();

			return spliced;
		};
	}

	function normaliseStart(length, start) {

		if (start < 0) {

			start = length + start;
		}

		start = Math.min(length, start);
		start = Math.max(0, start);

		return start;
	}

	function removeObjects(model, elements, properties, start, deleteCount) {

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];
			var end = Math.min(start + deleteCount, model.length) - 1;

			for (var j = end; j >= start; j--) {

				element.removeAtIndex(j);
			}

			properties.splice(start, deleteCount);
		}
	}

	function insertObjects(model, elements, properties, propertyType, start, newObjects) {

		for (var i = newObjects.length - 1; i >= 0; i--) {

			var property = new TransientProperty(newObjects[i], propertyType);

			properties.splice(start, 0, property);

			for (var j = 0; j < elements.length; j++) {

				var element = elements[j];
				var child = element.insertAtIndex(start);

				property.applyBinding(child, model);
			}
		}
	}

	Splice.prototype.unbind = function() {

		this.model.splice = this.originalSplice;
	};

	return Splice;
});
