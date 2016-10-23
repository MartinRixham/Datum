define([], function() {

	function Pop(model, elementChildren, properties) {

		var originalPop = model.pop;

		model.pop = function() {

			var property = properties.pop();

			if (property) {

				property.removeBinding();
			}

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;

				if (element.lastElementChild) {

					element.removeChild(element.lastElementChild);
				}
			}

			originalPop.apply(this, arguments);
			model.subscribableLength = model.length;
		};
	}

	return Pop;
});
