define([], function() {

	function Pop(model, elementChildren, properties) {

		var originalPop = model.pop;

		model.pop = function() {

			var property = properties.pop();

			property.removeBinding();

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;

				element.removeChild(element.firstElementChild);

				originalPop.apply(this, arguments);
			}
		};
	}

	return Pop;
});
